import ModelFuncs from "./ModelMain";
import { v4 as uuidv4 } from 'uuid';
import apm from "../../../rum";

let ShipModel = {
	getAll: ({ pagination, filter = {}, includeFilter = {} }) => {
		return new Promise((resolve, reject) => {
			let transaction = apm.startTransaction("ShipgetAll", "Requests", {
				managed: true,
			});
			let getLabel = {
				table: "ship",
			};
			transaction?.addLabels(getLabel);
			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `{
						ships(options: {
							offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
							limit: ${pagination ? pagination.perPage : 9999}
						}) {
							id
							beam
							callsign
							deadWeight
							certificates {
								id
								type
								certificateType {
									id
									name
									issuingAgency
								}
								issue {
									putIn
									department {
										id
										name
									}
									id
									issue
									expire
									account
									price
									registrationFee
								}
							}
							depth
							draught
							flag
							grossTonnage
							homePort
							images
							imoNumber
							length
							netTonnage
							note
							regNumber
							registered
							removed
							shipType
							vesselName
							yearOfBuild
						}
						shipsAggregate {
							count
						}
					}`
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					if (transaction) transaction.end();
					if (!result.data) {
						return resolve([]);
					}

					if (pagination) {
						resolve({
							data: result.data.ships,
							count: result.data.shipsAggregate.count,
						})
					} else {
						ModelFuncs.filter(result.data.ships, filter, includeFilter).then((res) => {
							resolve(res);
						});
					}
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});
	},
	put: (data) => {

		let query = '';
		if (data.id) {
			query = `mutation {
				updateShips(
					where: {id: "${data.id}"},
					update: {
						beam: ${data.beam ?? 0},
						callsign: "${data.callsign ?? ""}",
						deadWeight: ${data.deadWeight ?? 0},
						depth: ${data.depth ?? 0},
						draught: ${data.draught ?? 0},
						flag: "${data.flag ?? ""}",
						grossTonnage: ${data.grossTonnage ?? 0},
						homePort: "${data.homePort ?? ""}",
						images: ${JSON.stringify(data.images ?? [])},
						imoNumber: "${data.imoNumber ?? ""}",
						length: ${data.length ?? 0},
						netTonnage: ${data.netTonnage ?? 0},
						note: "${data.note ?? ""}",
						regNumber: "${data.regNumber ?? ""}",
						registered: ${data.registered ? '"' + data.registered + '"' : null},
						removed: ${data.removed && data.removed !== '' ? '"' + data.removed + '"' : null},
						shipType: "${data.shipType ?? ""}",
						vesselName: "${data.vesselName ?? ""}",
						yearOfBuild: ${data.yearOfBuild ?? 0}
					}
				) {
					id
				}
			}`
		} else {
			query = `mutation {
				createShips(
					input: {
						id: "${uuidv4()}"
						beam: ${data.beam ?? 0},
						callsign: "${data.callsign ?? ""}",
						deadWeight: ${data.deadWeight ?? 0},
						depth: ${data.depth ?? 0},
						draught: ${data.draught ?? 0},
						flag: "${data.flag ?? ""}",
						grossTonnage: ${data.grossTonnage ?? 0},
						homePort: "${data.homePort ?? ""}",
						images: ${JSON.stringify(data.images ?? [])},
						imoNumber: "${data.imoNumber ?? ""}",
						length: ${data.length ?? 0},
						netTonnage: ${data.netTonnage ?? 0},
						note: "${data.note ?? ""}",
						regNumber: "${data.regNumber ?? ""}",
						registered: ${data.registered ? '"' + data.registered + '"' : null},
						removed: ${data.removed && data.removed !== '' ? '"' + data.removed + '"' : null},
						shipType: "${data.shipType ?? ""}",
						vesselName: "${data.vesselName ?? ""}",
						yearOfBuild: ${data.yearOfBuild ?? 0}
					}
				) {
						id
					}
				}`;
		}

		return new Promise((resolve, reject) => {
			let transaction = apm.startTransaction("Shipput", "Requests", {
				managed: true,
			});
			let getLabel = {
				table: "ship",
			};
			transaction?.addLabels(getLabel);
			fetch(`${ModelFuncs.getGoServerUrl()} `, {
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
					if (transaction) transaction.end();
					resolve({ result });
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});
	},
	delete: (id) => {
		return new Promise((resolve, reject) => {
			let transaction = apm.startTransaction("Shipdelete", "Requests", {
				managed: true,
			});
			let getLabel = {
				table: "ship",
			};
			transaction?.addLabels(getLabel);
			fetch(`${ModelFuncs.getGoServerUrl()} `, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
						mutation {
							deleteShips(
								where: { id: "${id}" },
							)
							{
								id
							}
						}`
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					if (transaction) transaction.end();
					resolve({ result });
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});
	},
}


export default ShipModel;