// GET ALL
{
  ships(options: {
    offset: 0
		limit: 10
  }) {
    id
    beam
    callsign
    deadWeight
		certificates {
      id
      type
			certificateType {
        id
        name
        issuingAgency
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
    depth
    draught
    flag
    grossTonnage
    homePort
    images
    imoNumber
    length
    netTonnage
    note
    regNumber
    registered
    removed
    shipType
    vesselName
    yearOfBuild
  }
	shipsAggregate {
    count
  }
}


// CREATE
mutation {
  createShips(
    input: {
    id: "181fe0bc-5cdc-4727-a51e-0dcd9ef45c3f"
    beam: 1,
    callsign: "5",
    deadWeight: 9,
    depth: 2,
    draught: 3,
    flag: "2",
    grossTonnage: 7,
    homePort: "3",
    images: ["a231a778736aae3dc00c0e6287cd51b7", "00aca34f1f1ffb3da3626e93cfb00a8b"],
    imoNumber: "6",
    length: 0,
    netTonnage: 8,
    note: "4",
    regNumber: "4",
    registered: "2023-11-15",
    removed: null,
    shipType: "b",
    vesselName: "a",
    yearOfBuild: 1
  }
  ) {
    ships {
      id
    }
  }
}

// UPDATE
mutation {
  updateShips(
    where: { id: "181fe0bc-5cdc-4727-a51e-0dcd9ef45c3f" },
    update: {
    beam: 1,
    callsign: "5",
    deadWeight: 9,
    depth: 2,
    draught: 3,
    flag: "2",
    grossTonnage: 7,
    homePort: "3",
    images: ["a231a778736aae3dc00c0e6287cd51b7", "00aca34f1f1ffb3da3626e93cfb00a8b"],
    imoNumber: "6",
    length: 0,
    netTonnage: 8,
    note: "4",
    regNumber: "4",
    registered: "2023-11-15",
    removed: null,
    shipType: "ddd",
    vesselName: "b",
    yearOfBuild: 1
  }
  ) {
    ships {
      id
    }
  }
}