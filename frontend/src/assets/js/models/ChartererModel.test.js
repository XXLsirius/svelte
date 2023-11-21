import "@testing-library/jest-dom";
import ChartererModel from "./ChartererModel";
import ModelFuncs from "./ModelMain";
import { forRefreshStore } from "../../../routes/stores";

describe("ChartererModel unit test", () => {
  let charterers = [
    { id: 0, company: "", nation: "", phone: "", email: "", note: "" },
  ];
  let currentItem = {
    id: null,
    company: "Test Charterer",
    nation: "Test Nation",
    phone: "000 00 0000 0000",
    email: "test@charterer.com",
    note: "This is a test charterer.",
  };
  let updateItem = {
    id: 0,
    company: "Test Charterer1",
    nation: "Test Nation1",
    phone: "000 00 0000 0001",
    email: "test1@charterer.com",
    note: "This is a test charterer1.",
  };

  it("should CRUD a charterer item", async () => {
    // create item
    await ModelFuncs.put("charterer", currentItem).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // read item
    await ChartererModel.getAll({ filter: { company: "Test Charterer" } }).then(
      (res) => {
        charterers = res;
      }
    );
    expect(charterers[0].company).toBe(currentItem.company);
    expect(charterers[0].nation).toBe(currentItem.nation);
    expect(charterers[0].phone).toBe(currentItem.phone);
    expect(charterers[0].email).toBe(currentItem.email);
    expect(charterers[0].note).toBe(currentItem.note);

    updateItem.id = charterers[0].id;

    // update item
    await ModelFuncs.put("charterer", updateItem).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // delete item
    await ModelFuncs.delete("charterer", charterers[0].id).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });
  });
});
