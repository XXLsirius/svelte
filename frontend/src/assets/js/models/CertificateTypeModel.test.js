import "@testing-library/jest-dom";
import CertificateTypeModel from "./CertificateTypeModel";
import ModelFuncs from "./ModelMain";
import { forRefreshStore } from "../../../routes/stores";

describe("CertificateTypeModel unit test", () => {
  let certificatetypes = [{ id: 0, issuingAgency: "", name: "", note: "" }];
  let currentItem = {
    id: null,
    issuingAgency: "Test Agency",
    name: "Test Cert Type",
    note: "This is a test cert type.",
  };

  let updateItem = {
    id: 0,
    issuingAgency: "Test Agency1",
    name: "Test Cert Type1",
    note: "This is a test cert type1.",
  };

  test("should CRUD a ship certificatetype item", async () => {
    // create item
    await ModelFuncs.put("certificatetype", {
      type: "ship",
      ...currentItem,
    }).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // read item
    await CertificateTypeModel.getAll({
      filter: { name: "Test Cert Type", type: "ship" },
    }).then((res) => {
      certificatetypes = res;
    });
    expect(certificatetypes[0].name).toBe(currentItem.name);
    expect(certificatetypes[0].note).toBe(currentItem.note);
    expect(certificatetypes[0].issuingAgency).toBe(currentItem.issuingAgency);

    updateItem.id = certificatetypes[0].id;

    // update item
    await ModelFuncs.put("certificatetype", {
      type: "ship",
      ...updateItem,
    }).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // delete item
    await ModelFuncs.delete("certificatetype", updateItem.id).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });
  });

  test("should CRUD a personal certificatetype item", async () => {
    // create item
    await ModelFuncs.put("certificatetype", {
      type: "personal",
      ...currentItem,
    }).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // read item
    await CertificateTypeModel.getAll({
      filter: { name: "Test Cert Type", type: "personal" },
    }).then((res) => {
      certificatetypes = res;
    });
    expect(certificatetypes[0].name).toBe(currentItem.name);
    expect(certificatetypes[0].note).toBe(currentItem.note);
    expect(certificatetypes[0].issuingAgency).toBe(currentItem.issuingAgency);

    updateItem.id = certificatetypes[0].id;

    // update item
    await ModelFuncs.put("certificatetype", {
      type: "personal",
      ...updateItem,
    }).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // delete item
    await ModelFuncs.delete("certificatetype", updateItem.id).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });
  });
});
