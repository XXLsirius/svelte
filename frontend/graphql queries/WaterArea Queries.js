// GET ALL
{
	waterAreas(options : {
		offset: 0
		limit: 10
	}) {
		id,
			name,
			note,
	}
	waterAreasAggregate {
		count
	}
}


// CREATE
mutation {
	createWaterAreas(
		input: {
		id: "01461212-d67e-4f5a-ad92-b68d3c6bec67",
		name: "a",
		note: "c"
	}) {
		waterAreas { name, note }
	}
}

// UPDATE
mutation {
	updateWaterAreas(
		where: { id: "01461212-d67e-4f5a-ad92-b68d3c6bec67" },
		update: {
		id: "01461212-d67e-4f5a-ad92-b68d3c6bec67",
		name: "aa",
		note: "cc"
	}) {
		waterAreas { id, name, note }
	}
}

// DELETE
mutation {
	deleteWaterAreas(
		where: { id: "01461212-d67e-4f5a-ad92-b68d3c6bec67" },
	)
	{
		nodesDeleted
	}
}
