import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { venuelyService } from "./venuely-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

suite("User API tests", () => {
  setup(async () => {
    await venuelyService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[0] = await venuelyService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {}); 

  test("create a user", async () => {
    const newUser = await venuelyService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await venuelyService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await venuelyService.deleteAllUsers();
    returnedUsers = await venuelyService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user", async () => {
    const returnedUser = await venuelyService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await venuelyService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });

  test("get a user - deleted user", async () => {
    await venuelyService.deleteAllUsers();
    try {
      const returnedUser = await venuelyService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
  });
});
