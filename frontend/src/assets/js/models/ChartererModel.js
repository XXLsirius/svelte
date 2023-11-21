import ModelFuncs from "./ModelMain";
import apm from "../../../rum";

let ChartererModel = {
  getAll: ({ pagination, filter = {}, includeFilter = {} }) => {
    let transaction = apm.startTransaction("CharterergetAll", "Requests", {
      managed: true,
    });

    transaction?.addLabels({
      table: "charterer",
    });

    return new Promise((resolve, reject) => {
      let where = `
        ${includeFilter.company ?
          `company_CONTAINS: "${includeFilter.company ?? ""}"`
          : ""}
        ${includeFilter.nation ?
          `nation_CONTAINS: "${includeFilter.nation ?? ""}"`
          : ""}
      `;

      fetch(`${ModelFuncs.getGoServerUrl()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
            charterers (options: {
              offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
              limit: ${pagination ? pagination.perPage : 9999}
            }, where: {
              ${where}
            }) {
              id,
              company,
              nation,
              phone,
              email,
              note,
            }
            charterersAggregate(where: {
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
              data: result.data.charterers,
              count: result.data.charterersAggregate.count,
            })
          } else {
            ModelFuncs.filter(result.data.charterers, filter, includeFilter).then((res) => {
              resolve(res);
            });
          }
        })
        .catch((error) => {
          console.error("🚀 ~ error:", error);
        });
    })
  }
};


export default ChartererModel;