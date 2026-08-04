const assert = require("assert");

const app = require("../src/server");

describe("server", () => {
  it("exports an express app", () => assert.strictEqual(typeof app.listen, "function"));
});
