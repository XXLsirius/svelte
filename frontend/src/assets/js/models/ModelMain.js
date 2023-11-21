import { v4 as uuidv4 } from 'uuid';
import apm from '../../../rum';

let ModelFuncs = {
  filter: (data, filter, includeFilter) => {
    return new Promise((resolve, reject) => {
      let filtered = [];

      data.forEach((item) => {
        let matched = true;

        if (filter && Object.keys(filter).length) {
          Object.keys(filter).forEach((key) => {
            if (filter[key]) {
              if (Array.isArray(filter[key])) {
                filter[key] = filter[key].map(item => item.toString());

                if (!eval(`item.${key}`) || filter[key].indexOf(eval(`item.${key}`).toString()) === -1) {  // eslint-disable-line no-eval
                  matched = false;
                }
              } else {
                if ((eval(`item.${key}`) !== filter[key])) { // eslint-disable-line no-eval
                  matched = false;
                }
              }
            }
          });
        }

        if (includeFilter && Object.keys(includeFilter).length) {
          Object.keys(includeFilter).forEach((key) => {
            if (includeFilter[key] && (!eval(`item.${key}`) || (eval(`item.${key}`).toLowerCase().indexOf(includeFilter[key].toLowerCase()) === -1))) {  // eslint-disable-line no-eval
              matched = false;
            }
          });
        }

        if (matched) {
          filtered.push(item);
        }
      });

      resolve(filtered);
    });
  },
  getServerUrl: () => {
    return "http://192.168.140.254:8080";
  },
  getGoServerUrl: () => {
    return ModelFuncs.getServerUrl() + '/som';
  },
  formatDate: (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  },
  period_total_days: (from, to) => {
    // Convert the date strings to Date objects
    let startDate = new Date(from);
    let endDate = new Date(to);

    // Calculate the difference in milliseconds
    let timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    // Calculate the number of days
    let dayMilliSeconds = 1000 * 60 * 60 * 24;
    let totalDays = Math.floor(timeDifference / dayMilliSeconds);

    return isNaN(totalDays) ? 0 : totalDays;
  },
  put: (table, data) => {
    let title = {
      waterarea: {
        create: 'createWaterAreas',
        update: 'updateWaterAreas',
        normal: 'waterAreas',
      },
      charterer: {
        create: 'createCharterers',
        update: 'updateCharterers',
        normal: 'charterers',
      },
      certificatetype: {
        create: 'createCertificateTypes',
        update: 'updateCertificateTypes',
        normal: 'certificateTypes',
      },
    }[table];

    let query = '';
    if (data.id) {
      let id = data.id;
      delete data.id;
      query = `
            mutation {
              ${title.update}(
                where: { id: "${id}" },
                update: {
                  ${Object.keys(data).map((key) => { return `${key}: "${data[key]}" `; }).join(',')}
              }) {
                ${Object.keys(data).join(',')}
              }
            }
          `;
    } else {
      delete data.id;
      query = `
            mutation {
              ${title.create}(
                input: { id: "${uuidv4()}",
                ${Object.keys(data).map((key) => { return `${key}: "${data[key]}" `; }).join(',')}
              }) {
                ${Object.keys(data).join(',')}
              }
            }
          `;
    }

    return new Promise((resolve, reject) => {
      let transaction = apm.startTransaction("ModelMainput", "Requests", {
        managed: true,
      });

      var getLabel = {
        table: table,
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
  delete: (table, id) => {
    let title = {
      waterarea: {
        delete: 'deleteWaterAreas',
      },
      charterer: {
        delete: 'deleteCharterers',
      },
      certificatetype: {
        delete: 'deleteCertificateTypes',
      },
    }[table];

    return new Promise((resolve, reject) => {
      let transaction = apm.startTransaction("ModelMaindelete", "Requests", {
        managed: true,
      });
      var getLabel = {
        table: table,
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
                ${title.delete}(
                  where: { id: "${id}" }
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

export default ModelFuncs; 