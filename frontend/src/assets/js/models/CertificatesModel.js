import ModelFuncs from "./ModelMain";
import { v4 as uuidv4 } from 'uuid';
import apm from "../../../rum";

let CertificateModel = {
	getAll: ({ pagination, filter = {}, includeFilter = {} }) => {
		return new Promise((resolve, reject) => {
			let transaction = apm.startTransaction("CertificategetAll", "Requests", {
				managed: true,
			})

			transaction?.addLabels({
				table: 'certificate',
			});

			let where = `
				${filter.id ? `id: "${filter.id}"` : ""}
				type: "${filter.type}"
				${filter["issue.departmentId"] ?
					`department_id: "${filter["issue.departmentId"]}"`
					: ""}
				${filter["certificateTypeId"] ?
					`cert_type_id: "${filter["certificateTypeId"]}"`
					: ""}
				${filter["shipId"] ?
					`ship_id: "${filter["shipId"]}"`
					: ""}
				${filter["person"] ?
					`name_CONTAINS: "${filter["person"]}"`
					: ""}`;

			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `{
						certificates_all(options: {
							offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
							limit: ${pagination ? pagination.perPage : 9999}
						}, where: {
							${where}
						}) {
							id
							type
							certificateType {
								id
								issuingAgency
								name
								note
								type
							}
							issue {
								account
								expire
								id
								issue
								price
								putIn
								registrationFee
								department {
									id
									name
								}
							}
							person {
								id
								duty {
									id
									name
								}
								name
								platoon {
									id
									name
								}
								ship {
									id
									vesselName
								}
								job {
									id
									name
								}
							}
							ship {
								id
								vesselName
							}
						}
						certificatesAggregate(where: {
							${where}
						}) {
							count
						}
					}`
				}),
			}).then((response) => response.json())
				.then((result) => {
					if (transaction) transaction.end();

					result.data.certificates_all.forEach((cert) => {
						cert.personId = cert.person?.id;
						cert.shipId = cert.ship?.id;
						cert.certificateTypeId = cert.certificateType?.id;
						if (cert.issue) {
							cert.issue.departmentId = cert.issue?.department?.id;
						}
					})

					if (pagination) {
						resolve({
							data: result.data.certificates_all,
							count: result.data.certificatesAggregate.count,
						})
					} else {
						ModelFuncs.filter(result.data.certificates_all, filter, includeFilter).then((res) => {
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
		let transaction = apm.startTransaction("Certificateput", "Requests", {
			managed: true,
		});

		transaction?.addLabels({
			table: "certificate",
		});
		let query = '';
		if (data.id) {
			query = `
				mutation {
					updateCertificates(
						where: { id: "${data.id}" },
						update: {
							type: "${data.type ?? ""}"
							certificateType: {
								id: "${data.certificateType?.id ?? ""}"
							}
							ship: {
								id: "${data.ship?.id ?? ""}"
							}
							person: {
								id: "${data.person?.id ?? ""}"
							}
							issue: {
								account: "${data.issue.account ?? ""}"
								expire: "${data.issue.expire ?? "1970-01-01"}"
								putIn: "${data.issue.putIn ?? "1970-01-01"}"
								id: "${data.issue.id ?? ""}"
								issue: "${data.issue.issue ?? "1970-01-01"}"
								price: ${data.issue?.price ?? 0}
								registrationFee: ${data.issue.registrationFee ?? 0}
								department: {
									id: "${data.issue ? data.issue.departmentId : ""}"
								}
							}
						}
					) {
						id
					}
				}
			`;
		} else {
			query = `mutation {
				createCertificates(
					input: {
						id: "${uuidv4()}"
						type: "${data.type ?? ""}"
						certificateType: {
							id: "${data.certificateTypeId ?? ""}"
						}
						ship: {
							id: "${data.shipId ?? ""}"
						}
						person: {
							id: "${data.personId ?? ""}"
						}
						issue: {
							account: "${data.issue.account ?? ""}"
							expire: "${data.issue.expire ?? "1970-01-01"}"
							putIn: "${data.issue.putIn ?? "1970-01-01"}"
							id: "${data.issue.id ?? ""}"
							issue: "${data.issue.issue ?? "1970-01-01"}"
							price: ${data.issue.price ?? 0}
							registrationFee: ${data.issue.registrationFee ?? 0}
							department: {
								id: "${data.issue ? data.issue.departmentId : ""}"
							}
						}
					}
				) {
					id
				}
			}`;
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
			let transaction = apm.startTransaction("Certificatedelete", "Requests", {
				managed: true,
			});

			transaction?.addLabels({
				table: "certificate",
			});

			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `
						mutation {
							deleteCertificates(
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

export default CertificateModel;