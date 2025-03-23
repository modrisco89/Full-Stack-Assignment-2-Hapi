import { EventEmitter } from "events";
import { assert } from "chai";
import { venuelyService } from "./venuely-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, testVenue, testvenues } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("venue API tests", () => {
  let user = null;

  setup(async () => {
    await venuelyService.deleteAllvenues();
    await venuelyService.deleteAllUsers();
    user = await venuelyService.createUser(maggie);
    testVenue.userid = user._id;
  });

  teardown(async () => {});

  test("create venue", async () => {
    const returnedvenue = await venuelyService.createvenue(testVenue);
    assert.isNotNull(returnedvenue);
    assertSubset(testVenue, returnedvenue);
  });

  test("delete a venue", async () => {
    const venue = await venuelyService.createvenue(testVenue);
    const response = await venuelyService.deletevenue(venue._id);
    assert.equal(response.status, 204);
    try {
      const returnedvenue = await venuelyService.getvenue(venue.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No venue with this id", "Incorrect Response Message");
    }
  });

  test("create multiple venues", async () => {
    for (let i = 0; i < testvenues.length; i += 1) {
      testvenues[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await venuelyService.createvenue(testvenues[i]);
    }
    let returnedLists = await venuelyService.getAllvenues();
    assert.equal(returnedLists.length, testvenues.length);
    await venuelyService.deleteAllvenues();
    returnedLists = await venuelyService.getAllvenues();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant venue", async () => {
    try {
      const response = await venuelyService.deletevenue("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No venue with this id", "Incorrect Response Message");
    }
  });
});
