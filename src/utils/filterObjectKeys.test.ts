import filterObjectKeys from "./filterObjectKeys";

describe("filterObjectKeys", () => {
  it("should filter correctly", () => {
    const keys = ["a", "c"];
    const object = {
      a: 1,
      b: 2,
      c: 3,
      A: 4,
    };

    const result = filterObjectKeys(object, keys);

    expect(result).toEqual({
      a: 1,
      c: 3,
    });
  });
});
