import "@testing-library/jest-dom";
import WaterAreaModel from "./WaterAreaModel";
import ModelFuncs from "./ModelMain";
import { forRefreshStore } from "../../../routes/stores";

describe("WaterAreaModel unit test", () => {
  let waterareas = [{ id: 0, name: "", note: "" }];
  let currentItem = {
    id: null,
    name: "Test Area",
    note: "This is a test area.",
  };
  let updateItem = { id: 0, name: "Test Area1", note: "This is a test area1." };

  it("should CRUD a waterarea item", async () => {
    // create water area item
    await ModelFuncs.put("waterarea", currentItem).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // read water area item
    await WaterAreaModel.getAll({ filter: { name: "Test Area" } }).then(
      (res) => {
        waterareas = res;
      }
    );
    expect(waterareas[0].name).toBe(currentItem.name);
    expect(waterareas[0].note).toBe(currentItem.note);

    updateItem.id = waterareas[0].id;

    // update water area item
    await ModelFuncs.put("waterarea", updateItem).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });

    // delete water area item
    await ModelFuncs.delete("waterarea", waterareas[0].id).then((result) => {
      forRefreshStore.update((n) => n + 1);
    });
  });
});
