import ModelFuncs from "./ModelMain";
import apm from "../../../rum";


let CertificateTypeModel = {
  getAll: ({ pagination, filter = {}, includeFilter = {} }) => {
    return new Promise((resolve, reject) => {
      let transaction = apm.startTransaction("TypeofcertificategetAll", "Requests", {
        managed: true,
      });
      let getLabel = {
        table: "typeofcertificate",
      };
      transaction?.addLabels(getLabel);

      fetch(`${ModelFuncs.getGoServerUrl()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
						certificateTypes(options: {
							offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
							limit: ${pagination ? pagination.perPage : 9999}
						}, where: {
							cert_type: "${filter.type}"
						}) {
							id
							issuingAgency
							name
							note
							type
						}
						certificateTypesAggregate(where: {
							cert_type: "${filter.type}"
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
              data: result.data.certificateTypes,
              count: result.data.certificateTypesAggregate.count,
            })
          } else {
            ModelFuncs.filter(result.data.certificateTypes, filter, includeFilter).then((res) => {
              resolve(res);
            });
          }
        })
        .catch((error) => {
          console.error("🚀 ~ error:", error);
        });
    });
  },
}

export default CertificateTypeModel;