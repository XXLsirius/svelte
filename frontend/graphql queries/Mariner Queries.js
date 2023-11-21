// GET ALL
{
  mariners(options: {
    offset: 0
		limit: 10
  }, where: {

    name_CONTAINS: "Sa"
				ship: {
      id: "8deac220-8d10-4d11-bab8-307e39a190b9"
    }

  }) {
    id
    birthday
    boardedYears
    code
    dailyFee
		duty {
      id
      name
    }
    homePhone
    image
		job {
      id
      name
    }
    mobilePhone
    name
    note
    placeOfBorn
    placeOfResidence
		platoon {
      id
      name
    }
    previousAffiliation
    qualificationGrade
    registered
    removed
    retired
		ship {
      id
      vesselName
    }
		graduated {
      date
      note
    }
		certificates {
      id
      type
			certificateType {
        id
        name
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
  }
  marinersAggregate(where: {

    name_CONTAINS: "Sa"
				ship: {
      id: "8deac220-8d10-4d11-bab8-307e39a190b9"
    }

  }) {
    count
  }
}

// CREATE
mutation {
  createMariners(
    input: {
    id: "4afff8e2-56a1-4ccc-936f-6e14c38ecf33"
			birthday: "1992-09-24"
			boardedYears: 2018
			code: 45
			dailyFee: 1500
			duty: {
      connect: {
        where: {
          node: {
            id: "6b3fdf19-8afa-4376-b56d-80194fba47d7"
          }
        }
      }
    }
			homePhone: "02-678-2620"
			image: ""
			job: {
      connect: {
        where: {
          node: {
            id: "8c2d67e3-ab20-4afa-9447-eb841b047f85"
          }
        }
      }
    }
			mobilePhone: "191-257-8183"
			name: "Terry Black Dragon"
			note: "Thank you"
			placeOfBorn: "ShangHai"
			placeOfResidence: "Hit"
			platoon: {
      connect: {
        where: {
          node: {
            id: "7c7d9154-6858-46aa-a237-5658410a5a2c"
          }
        }
      }
    }
			previousAffiliation: "Alibaba"
			qualificationGrade: "Top"
			registered: "2014-11-07"
			removed: ""
			retired: ""
			ship: {
      connect: {
        where: {
          node: {
            id: "43edc2c4-4a23-427f-8e77-63ee1e55fa11"
          }
        }
      }
    }
			graduated: {
      create: {
        node: {
          date: "2014-11-12"
						note: "BeiJing University"
        }
      }
    }
  }
  ) {
			mariners {
      id
    }
  }
}

// UPDATE BY ID
mutation {
  updateMariners(
    where: { id: "f8fed456-8619-4c69-8239-46f7fbc70302" },
    update: {
    birthday: null
      boardedYears: 0
      code: 0
      dailyFee: 0
      duty: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: ""
          }
        }
      }
    }
      homePhone: ""
      image: ""
      job: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: ""
          }
        }
      }
    }
      mobilePhone: ""
      name: "aaaaaa"
      note: ""
      placeOfBorn: ""
      placeOfResidence: ""
      platoon: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: ""
          }
        }
      }
    }
      previousAffiliation: ""
      qualificationGrade: ""
      registered: "2023-11-02"
      removed: ""
      retired: ""
      ship: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: ""
          }
        }
      }
    }
      graduated: {
      update: {
        node: {
          date: null
            note: ""
        }
      }
    }
  }
  ) {
    mariners {
      id
    }
  }
}

// DELETE BY ID
mutation {
  deleteMariners(
    where: { id: "test-id" },
    delete: {
    graduated: {}
  }
  )
  {
    nodesDeleted
  }
}