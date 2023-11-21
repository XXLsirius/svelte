import apm from "../../../rum";
import ModelFuncs from "./ModelMain";
import { v4 as uuidv4 } from 'uuid';

let MarinerModel = {
	getOneById: (id) => {
		return new Promise((resolve, reject) => {
			let transaction = apm.startTransaction("MarinergetOneById", "Requests", {
				managed: true,
			});
			let getLabel = {
				table: "mariner",
			};
			transaction?.addLabels(getLabel);

			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `{
						mariner(
							id: "${id}"
						) {
							id
							birthday
							boardedYears
							code
							dailyFee
							duty {
								id
								name
							}
							homePhone
							image
							job {
								id
								name
							}
							mobilePhone
							name
							note
							placeOfBorn
							placeOfResidence
							platoon {
								id
								name
							}
							previousAffiliation
							qualificationGrade
							registered
							removed
							retired
							ship {
								id
								vesselName
							}
							graduated {
								date
								note
							}
							certificates {
								id
								type
								certificateType {
									id
									name
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
						}
					}`
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					if (transaction) transaction.end();

					resolve({
						data: [result.data.mariner],
						count: 0,
					})
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		})
	},
	getAll: ({ pagination, filter = {}, includeFilter = {}, onlyNames = false }) => {
		if (pagination && pagination.page == 1 && pagination.perPage == 1 && filter.id) {
			return MarinerModel.getOneById(filter.id);
		} else {
			return new Promise((resolve, reject) => {
				let transaction = apm.startTransaction("MarinergetAll", "Requests", {
					managed: true,
				});
				let getLabel = {
					table: "mariner",
				};
				transaction?.addLabels(getLabel);

				let where = `
					name_CONTAINS: "${includeFilter.name ?? ""}"
					${filter["ship.id"] ?
						`ship_id: "${filter["ship.id"]}"`
						: ""}
				`;

				fetch(`${ModelFuncs.getGoServerUrl()}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						query: `{
							mariners (options: {
								offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
								limit: ${pagination ? pagination.perPage : 9999}
							}, where: {
								${where}
							}) {
								${onlyNames ?
								`
								id
								name
								dailyFee
								job {
									name
								}
								`
								:
								`id
									duty {
										name
									}
									dailyFee
									image
									job {
										name
									}
									name
									ship {
										vesselName
									}
									certificates {
										certificateType {
											name
										}
										issue {
											id
											expire
										}
									}`
							}
							}
							marinersAggregate(where: {
								${where}
							}) {
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
								data: result.data.mariners,
								count: result.data.marinersAggregate.count,
							})
						} else {
							ModelFuncs.filter(result.data.mariners, filter, includeFilter).then((res) => {
								resolve(res);
							});
						}
					})
					.catch((error) => {
						console.error("🚀 ~ error:", error);
					});
			});
		}
	},
	put: (data) => {
		let query = '';
		if (data.id) {
			query = `
				mutation {
					updateMariners(
						where: { id: "${data.id}" },
						update: {
							birthday: ${data.birthday ? '"' + data.birthday + '"' : null}
							boardedYears: ${data.boardedYears ?? 0}
							code: ${data.code ?? 0}
							dailyFee: ${data.dailyFee ?? 0}
							duty: {
								id: "${data.duty?.id ?? ""}"
							}
							homePhone: "${data.homePhone ?? ""}"
							image: "${data.image ?? ""}"
							job: {
								id: "${data.job?.id ?? ""}"
							}
							mobilePhone: "${data.mobilePhone ?? ""}"
							name: "${data.name ?? ""}"
							note: "${data.note ?? ""}"
							placeOfBorn: "${data.placeOfBorn ?? ""}"
							placeOfResidence: "${data.placeOfResidence ?? ""}"
							platoon: {
								id: "${data.platoon?.id ?? ""}"
							}
							previousAffiliation: "${data.previousAffiliation ?? ""}"
							qualificationGrade: "${data.qualificationGrade ?? ""}"
							registered: ${data.registered ? '"' + data.registered + '"' : null}
							removed: "${data.removed ?? ""}"
							retired: "${data.retired ?? ""}"
							ship: {
								id: "${data.ship?.id ?? ""}"
							}
							graduated: {
								date: ${data.graduated?.date ? '"' + data.graduated?.date + '"' : null}
								note: "${data.graduated?.note ?? ""}"
							}
						}
					) {
						id
					}
				}
			`;
		} else {
			query = `
          mutation {
            createMariners(
              input: {
								id: "${uuidv4()}"
								birthday: ${data.birthday ? '"' + data.birthday + '"' : null}
								boardedYears: ${data.boardedYears ?? 0}
								code: ${data.code ?? 0}
								dailyFee: ${data.dailyFee ?? 0}
								duty: {
									id: "${data.duty?.id ?? ""}"
								}
								homePhone: "${data.homePhone ?? ""}"
								image: "${data.image ?? ""}"
								job: {
									id: "${data.job?.id ?? ""}"
								}
								mobilePhone: "${data.mobilePhone ?? ""}"
								name: "${data.name ?? ""}"
								note: "${data.note ?? ""}"
								placeOfBorn: "${data.placeOfBorn ?? ""}"
								placeOfResidence: "${data.placeOfResidence ?? ""}"
								platoon: {
									id: "${data.platoon?.id ?? ""}"
								}
								previousAffiliation: "${data.previousAffiliation ?? ""}"
								qualificationGrade: "${data.qualificationGrade ?? ""}"
								registered: ${data.registered ? '"' + data.registered + '"' : null}
								removed: "${data.removed ?? ""}"
								retired: "${data.retired ?? ""}"
								ship: {
									id: "${data.ship?.id ?? ""}"
								}
								graduated: {
									date: ${data.graduated?.date ? '"' + data.graduated?.date + '"' : null}
									note: "${data.graduated?.note ?? ""}"
								}
							}
            ) {
							id
						}
          }
        `;
		}

		return new Promise((resolve, reject) => {
			let transaction = apm.startTransaction("Marinerput", "Requests", {
				managed: true,
			});
			let getLabel = {
				table: "mariner",
			};
			transaction?.addLabels(getLabel);
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
			let transaction = apm.startTransaction("Marinerdelete", "Requests", {
				managed: true,
			});
			let getLabel = {
				table: "mariner",
			};
			transaction?.addLabels(getLabel);
			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
						mutation {
							deleteMariners(
								where: { id: "${id}" },
							)
							{
								id
							}
						}
					`
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

export default MarinerModel;