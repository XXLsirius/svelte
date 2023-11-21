// GET ALL
{
	charterers(options: {
		offset: 0
		limit: 10
	}, where: {
		company_CONTAINS: "China"
		nation_CONTAINS: "China"
	}) {
		id,
			company,
			nation,
			phone,
			email,
			note,
	}
	charterersAggregate(where: {
		company_CONTAINS: "China"
		nation_CONTAINS: "China"
	}) {
		count
	}
}

// CREATE
mutation {
	createCharterers(
		input: {
		id: "b30ed4cc-4fff-4abc-8231-3a1d356e7717",
		company: "Amazon",
		nation: "China",
		phone: "+64 3 5426 7534",
		email: "terblk.dragon@gmail.com",
		note: "Amazon Charterer"
	}) {
			charterers { company, nation, phone, email, note }
	}
}

// UPDATE
mutation {
	updateCharterers(
		where: { id: "b30ed4cc-4fff-4abc-8231-3a1d356e7717" },
		update: {
		id: "b30ed4cc-4fff-4abc-8231-3a1d356e7717",
		company: "Amazon",
		nation: "China",
		phone: "+64 3 5426 7534",
		email: "terblk.dragon@gmail.com",
		note: "Amazon Charterer TEST"
	}) {
			charterers { id, company, nation, phone, email, note }
	}
}

// DELETE
mutation {
	deleteCharterers(
		where: { id: "b30ed4cc-4fff-4abc-8231-3a1d356e7717" },
	)
	{
		nodesDeleted
	}
}
