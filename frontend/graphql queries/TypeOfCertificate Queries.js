// GET ALL
{
  certificateTypes(options: {
    offset: 0
    limit: 10
  }, where: {
    type: "personal"
  }) {
    id
    issuingAgency
    name
    note
    type
  }
  certificateTypesAggregate(where: {
    type: "personal"
  }) {
    count
  }
}

// CREATE
mutation {
  createCertificateTypes(
    input: {
      id: "68e68911-9e5e-412c-8171-810ce91a1f10",
    type: "ship", name: "a", issuingAgency: "b", note: "c"
  }) {
    certificateTypes { type, name, issuingAgency, note }
  }
}

// UPDATE
mutation {
  updateCertificateTypes(
    where: { id: "68e68911-9e5e-412c-8171-810ce91a1f10" },
    update: {
    type: "ship", id: "68e68911-9e5e-412c-8171-810ce91a1f10", issuingAgency: "bb", name: "aa", note: "cc"
  }) {
    certificateTypes { type, id, issuingAgency, name, note }
  }
}

// DELETE
mutation {
  deleteCertificateTypes(
    where: { id: "68e68911-9e5e-412c-8171-810ce91a1f10" },
  )
  {
    nodesDeleted
  }
}