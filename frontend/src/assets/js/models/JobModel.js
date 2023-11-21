import ModelFuncs from "./ModelMain";

let JobModel = {
	getAll: ({ filter = {}, includeFilter = {} }) => {
		return new Promise((resolve, reject) => {
			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `{
						jobs {
							id
							name
						}
					}`
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					ModelFuncs.filter(result.data.jobs, filter, includeFilter).then((res) => {
						resolve(res);
					});
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});
	},
}

export default JobModel;