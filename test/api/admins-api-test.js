import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { venuelyService } from "./venuely-service.js";
import { admin, testAdmins } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("admin API tests", () => {
  setup(async () => {
    await venuelyService.deleteAllAdmins();
    for (let i = 0; i < testAdmins.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testAdmins[0] = await venuelyService.createadmin(testAdmins[i]);
    }
  });
  teardown(async () => {});

  test("create a admin", async () => {
    const newadmin = await venuelyService.createadmin(admin);
    assertSubset(admin, newadmin);
    assert.isDefined(newadmin._id);
  });

  test("delete all adminApi", async () => {
    let returnedadmins = await venuelyService.getadmins();
    assert.equal(returnedadmins.length, 3);
    await venuelyService.deleteAllAdmins();
    returnedadmins = await venuelyService.getadmins();
    assert.equal(returnedadmins.length, 0);
  });

  test("get a admin", async () => {
    const returnedadmin = await venuelyService.getadmin(testAdmins[0]._id);
    assert.deepEqual(testAdmins[0], returnedadmin);
  });

  test("get a admin - bad id", async () => {
    try {
      const returnedadmin = await venuelyService.getadmin("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No admin with this id");
    }
  });

  test("get a admin - deleted admin", async () => {
    await venuelyService.deleteAllAdmins();
    try {
      const returnedadmin = await venuelyService.getadmin(testAdmins[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No admin with this id");
    }
  });
});
