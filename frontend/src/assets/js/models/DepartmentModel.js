import ModelFuncs from "./ModelMain";

let DepartmentModel = {
	getAll: ({ filter = {}, includeFilter = {} }) => {
		return new Promise((resolve, reject) => {
			fetch(`${ModelFuncs.getGoServerUrl()}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: `{
						departments {
							id
							name
						}
					}`
				}),
			})
				.then((response) => response.json())
				.then((result) => {
					ModelFuncs.filter(result.data.departments, filter, includeFilter).then((res) => {
						resolve(res);
					});
				})
				.catch((error) => {
					console.error("🚀 ~ error:", error);
				});
		});
	},
}

export default DepartmentModel;