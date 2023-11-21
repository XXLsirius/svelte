import apm from "../../../rum";
import ModelFuncs from "./ModelMain";

let WaterAreaModel = {
  getAll: ({ pagination, filter = {}, includeFilter = {} }) => {
    return new Promise((resolve, reject) => {
      let transaction = apm.startTransaction("WaterareagetAll", "Requests", {
        managed: true,
      });
      let getLabel = {
        table: "waterarea",
      };
      transaction?.addLabels(getLabel);

      fetch(`${ModelFuncs.getGoServerUrl()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({

          query: `{
						waterAreas (options : {
							offset: ${pagination ? (pagination.page - 1) * pagination.perPage : 0}
							limit: ${pagination ? pagination.perPage : 9999}
						})
							{
							id,
							name,
							note,
						}
						waterAreasAggregate {
							count
						}
					}`,

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
              data: result.data.waterAreas,
              count: result.data.waterAreasAggregate.count,
            })
          } else {
            ModelFuncs.filter(result.data.waterAreas, filter, includeFilter).then((res) => {
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

export default WaterAreaModel;
