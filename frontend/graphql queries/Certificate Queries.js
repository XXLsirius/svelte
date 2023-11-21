// GET ALL
{
  certificates(options: {
    offset: 0
    limit: 10
  }, where: {

    type: "ship"
    issue: {
      department: {
        id: "fe6b0256-2e15-43ca-820a-c1a9bd8760da"
      }
    }
    certificateType: {
      id: "edc9f21c-aa17-4f3c-b0d4-09bec6105d5a"
    }
    ship: {
      id: "8deac220-8d10-4d11-bab8-307e39a190b9"
    }

  }) {
    id
    type
    certificateType {
      id
      issuingAgency
      name
      note
      type
    }
    issue {
      account
      expire
      id
      issue
      price
      putIn
      registrationFee
      department {
        id
        name
      }
    }
    person {
      id
      duty {
        id
        name
      }
      name
      platoon {
        id
        name
      }
      ship {
        id
        vesselName
      }
      job {
        id
        name
      }
    }
    ship {
      id
      vesselName
    }
  }
  certificatesAggregate(where: {

    type: "ship"
    issue: {
      department: {
        id: "fe6b0256-2e15-43ca-820a-c1a9bd8760da"
      }
    }
    certificateType: {
      id: "edc9f21c-aa17-4f3c-b0d4-09bec6105d5a"
    }
    ship: {
      id: "8deac220-8d10-4d11-bab8-307e39a190b9"
    }

  }) {
    count
  }
}


// CREATE
mutation {
  createCertificates(
    input: {
    id: "5952c249-feb2-495f-b7f1-5a8b42d6e306"
    type: "ship"
    certificateType: {
      connect: {
        where: {
          node: {
            id: "4e30e677-7059-4d23-a651-88fec08cae95"
          }
        }
      }
    }
    ship: {
      connect: {
        where: {
          node: {
            id: "25ed2ce2-9691-4fbc-8a2c-65cb656bb365"
          }
        }
      }
    }
    person: {
      connect: {
        where: {
          node: {
            id: ""
          }
        }
      }
    }
    issue: {
      create: {
        node: {
          account: ""
          expire: "1970-01-01"
          putIn: "2023-11-09"
          id: ""
          issue: "1970-01-01"
          price: 0
          registrationFee: 0
          department: {
            connect: {
              where: {
                node: {
                  id: "757dfdc6-f040-4741-85f4-ee3dc3c3822f"
                }
              }
            }
          }
        }
      }
    }
  }
  ) {
    certificates {
      id
    }
  }
}

// UPDATE
mutation {
  updateCertificates(
    where: { id: "5952c249-feb2-495f-b7f1-5a8b42d6e306" },
    update: {
    type: "ship"
      certificateType: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: "dc22289a-b2f4-40f5-af36-a853feb8dfb4"
          }
        }
      }
    }
      ship: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: "8deac220-8d10-4d11-bab8-307e39a190b9"
          }
        }
      }
    }
      person: {
      disconnect: {},
      connect: {
        where: {
          node: {
            id: ""
          }
        }
      }
    }
      issue: {
      update: {
        node: {
          account: "bbb"
            expire: "1970-01-01"
            putIn: "2023-10-03"
            id: "aa"
            issue: "1970-01-01"
            price: 111
            registrationFee: 222
            department: {
            disconnect: {}
              connect: {
              where: {
                node: {
                  id: "06859995-8d3f-4df5-9514-5336f3a908d8"
                }
              }
            }
          }
        }
      }
    }
  }
  ) {
    certificates {
      id
    }
  }
}

// DELETE
mutation {
  deleteCertificates(
    where: { id: "5952c249-feb2-495f-b7f1-5a8b42d6e306" },
    delete: {
    issue: {}
  }
  )
  {
    nodesDeleted
  }
}