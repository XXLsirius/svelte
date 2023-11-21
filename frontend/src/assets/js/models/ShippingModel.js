import ModelFuncs from "./ModelMain";
import WaterAreaModel from "./WaterAreaModel";
import MarinerModel from "./MarinerModel";
import { v4 as uuidv4 } from 'uuid';

let ShippingModel = {
	getAll: ({ pagination, filter = {}, includeFilter = {} }) => {
		return new Promise((resolve, reject) => {
			let where = `
				main_snumber_CONTAINS: "${includeFilter.main_snumber ?? ""}"
				main_bl_CONTAINS: "${includeFilter.main_bl ?? ""}"
				company_CONTAINS: "${includeFilter.company ?? ""}"
				${filter["shipId"] ? `ship_id: "${filter["shipId"]}"` : ""}
			`

			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `{
						shippings (options: {
							offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
							limit: ${pagination ? pagination.perPage : 9999}
						}, where: {
							${where}
						}) {
							arrived_areas
							arrived_date
							arrived_pass_date
							arrived_pass_time
							arrived_time
							cost_additional_fee
							cost_crew_note
							cost_daily_wages
							cost_crews
							cost_deposit
							cost_other_note
							cost_shipping_fee
							cost_others
							departure_areas
							departure_date
							depature_pass_date
							depature_pass_time
							depature_time
							fuel_af
							fuel_cbd
							fuel_ibd
							fuel_iwa
							fuel_note
							id
							main_attachments
							main_bl
							main_cargo
							main_charterer {
								company
								id
							}
							main_load_unload_port
							main_note
							main_ship {
								vesselName
								id
							}
							main_snumber
							navigation_areas
						}
						shippingsAggregate(where: {
							${where}
						}) {
							count
						}
					}`
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					if (!result.data) {
						return resolve([]);
					}

					WaterAreaModel.getAll({}).then((water_areas) => {
						MarinerModel.getAll({ onlyNames: true }).then((mariners) => {
							result.data.shippings.forEach((shipping) => {
								if (!shipping.main_ship) {
									shipping.main_ship = { id: "" };
								}
								if (!shipping.main_charterer) {
									shipping.main_charterer = { id: "" };
								}
								if (shipping.mariners) {
									shipping.mariners = shipping.main_ship.mariners;
								}
								if (shipping.main_attachments) {
									shipping.main_attachments = JSON.parse(shipping.main_attachments);
								} else {
									shipping.main_attachments = [];
								}

								[
									'departure_areas',
									'navigation_areas',
									'arrived_areas',
								].forEach((item) => {
									if (shipping[item]) {
										shipping[item] = JSON.parse(shipping[item]);
										shipping[item].forEach((area) => {
											area.area = water_areas.find(
												(water_area) => water_area.id == area.area_id
											);
										});
									} else {
										shipping[item] = [];
									}
								});

								if (shipping.cost_others) {
									shipping.cost_others = JSON.parse(shipping.cost_others);
								} else {
									shipping.cost_others = [];
								}

								if (shipping.cost_crews) {
									shipping.cost_crews = JSON.parse(shipping.cost_crews);
								} else {
									shipping.cost_crews = [];
								}

								if (shipping.cost_crews != null) {
									shipping.cost_crews.forEach((cost_crew) => {
										cost_crew.mariner = mariners.find(mariner => mariner.id === cost_crew.mariner_id);
									});
								}
							});

							if (pagination) {
								resolve({
									data: result.data.shippings,
									count: result.data.shippingsAggregate.count,
								})
							} else {
								ModelFuncs.filter(result.data.shippings, filter, includeFilter).then((res) => {
									resolve(res);
								});
							}
						});
					});
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});
	},
	put: (data) => {
		let query = '';
		let tmp = JSON.stringify(data.departure_areas);
		data.departure_areas = tmp.replace(/"/g, '\\"');
		tmp = JSON.stringify(data.arrived_areas);
		data.arrived_areas = tmp.replace(/"/g, '\\"');
		tmp = JSON.stringify(data.navigation_areas);
		data.navigation_areas = tmp.replace(/"/g, '\\"');
		tmp = JSON.stringify(data.cost_crews);
		data.cost_crews = tmp.replace(/"/g, '\\"');
		tmp = JSON.stringify(data.cost_others);
		data.cost_others = tmp.replace(/"/g, '\\"');
		tmp = JSON.stringify(data.main_attachments)
		data.main_attachments = tmp.replace(/"/g, '\\"');
		if (data.id) {
			query = `
				mutation {
					updateShippings(
						where: { id: "${data.id}" }
						update: {
							id: "${data.id}"
							navigation_areas: "${data.navigation_areas}"
							main_snumber: "${data.main_snumber ?? ""}"
							main_ship_id: "${data.main_ship?.id ?? ""}"
							main_note: "${data.main_note ?? ""}"
							main_load_unload_port: "${data.main_load_unload_port ?? ""}"
							main_charterer_id: "${data.main_charterer?.id ?? ""}"
							main_cargo: "${data.main_cargo ?? ""}"
							main_bl: "${data.main_bl ?? ""}"
							main_attachments: "${data.main_attachments}"
							fuel_note: "${data.fuel_note ?? ""}"
							fuel_iwa: "${data.fuel_iwa ?? ""}"
							fuel_ibd: "${data.fuel_ibd ?? ""}"
							fuel_cbd: "${data.fuel_cbd ?? ""}"
							fuel_af: "${data.fuel_af ?? ""}"
							depature_time: "${data.depature_time ?? ""}"
							depature_pass_time: "${data.depature_pass_time ?? ""}"
							depature_pass_date: "${data.depature_pass_date ?? ""}"
							departure_date: "${data.departure_date ?? ""}"
							departure_areas: "${data.departure_areas}"
							cost_shipping_fee: "${data.cost_shipping_fee ?? ""}"
							cost_others: "${data.cost_others}"
							cost_other_note: "${data.cost_other_note ?? ""}"
							cost_deposit: "${data.cost_deposit ?? ""}"
							cost_daily_wages: "${data.cost_daily_wages ?? ""}"
							cost_crews: "${data.cost_crews}"
							cost_crew_note: "${data.cost_crew_note ?? ""}"
							cost_additional_fee: "${data.cost_additional_fee ?? ""}"
							arrived_time: "${data.arrived_time ?? ""}"
							arrived_pass_time: "${data.arrived_pass_time ?? ""}"
							arrived_pass_date: "${data.arrived_pass_date ?? ""}"
							arrived_date: "${data.arrived_date ?? ""}"
							arrived_areas: "${data.arrived_areas}"
						}
					) {
						id
					}
				}
			`;
		} else {
			query = `
          		mutation {
					createShippings(
						input: {
							id: "${uuidv4()}"
							navigation_areas: "${data.navigation_areas}"
							main_snumber: "${data.main_snumber ?? ""}"
							main_ship_id: "${data.main_ship?.id ?? ""}"
							main_note: "${data.main_note ?? ""}"
							main_load_unload_port: "${data.main_load_unload_port ?? ""}"
							main_charterer_id: "${data.main_charterer?.id ?? ""}"
							main_cargo: "${data.main_cargo ?? ""}"
							main_bl: "${data.main_bl ?? ""}"
							main_attachments: "${data.main_attachments}"
							fuel_note: "${data.fuel_note ?? ""}"
							fuel_iwa: "${data.fuel_iwa ?? ""}"
							fuel_ibd: "${data.fuel_ibd ?? ""}"
							fuel_cbd: "${data.fuel_cbd ?? ""}"
							fuel_af: "${data.fuel_af ?? ""}"
							depature_time: "${data.depature_time ?? ""}"
							depature_pass_time: "${data.depature_pass_time ?? ""}"
							depature_pass_date: "${data.depature_pass_date ?? ""}"
							departure_date: "${data.departure_date ?? ""}"
							departure_areas: "${data.departure_areas}"
							cost_shipping_fee: "${data.cost_shipping_fee ?? ""}"
							cost_others: "${data.cost_others}"
							cost_other_note: "${data.cost_other_note ?? ""}"
							cost_deposit: "${data.cost_deposit ?? ""}"
							cost_daily_wages: "${data.cost_daily_wages ?? ""}"
							cost_crews: "${data.cost_crews}"
							cost_crew_note: "${data.cost_crew_note ?? ""}"
							cost_additional_fee: "${data.cost_additional_fee ?? ""}"
							arrived_time: "${data.arrived_time ?? ""}"
							arrived_pass_time: "${data.arrived_pass_time ?? ""}"
							arrived_pass_date: "${data.arrived_pass_date ?? ""}"
							arrived_date: "${data.arrived_date ?? ""}"
							arrived_areas: "${data.arrived_areas}"
						}
					) {
							id
					}
          		}
        	`;
		}

		return new Promise((resolve, reject) => {
			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					resolve({ result });
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});

	},
}

export default ShippingModel;