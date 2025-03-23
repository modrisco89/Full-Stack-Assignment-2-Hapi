import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { venuelyService } from "./venuely-service.js";
import { maggie, testVenue, testvenues, testinfos, info } from "../fixtures.js";

suite("info API tests", () => {
  let user = null;
  let venues = null;

  setup(async () => {
    await venuelyService.deleteAllvenues();
    await venuelyService.deleteAllUsers();
    await venuelyService.deleteAllinfos();
    user = await venuelyService.createUser(maggie);
    user.userid = user._id;
    venues = await venuelyService.createvenue(maggie);
  });


  teardown(async () => {});

  test("create info", async () => {
    const returnedinfo = await venuelyService.createinfo(venues._id, info);
    assertSubset(info, returnedinfo);
  });

  test("create Multiple infos", async () => {
    for (let i = 0; i < testinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await venuelyService.createinfo(venues._id, testinfos[i]);
    }
    const returnedinfos = await venuelyService.getAllinfos();
    assert.equal(returnedinfos.length, testinfos.length);
    for (let i = 0; i < returnedinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const info2 = await venuelyService.getinfo(returnedinfos[i]._id);
      assertSubset(info2, returnedinfos[i]);
    }
  });

  test("Delete infoApi", async () => {
    for (let i = 0; i < testinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await venuelyService.createinfo(venues._id, testinfos[i]);
    }
    let returnedinfos = await venuelyService.getAllinfos();
    assert.equal(returnedinfos.length, testinfos.length);
    for (let i = 0; i < returnedinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const info2 = await venuelyService.deleteinfo(returnedinfos[i]._id);
    }
    returnedinfos = await venuelyService.getAllinfos();
    assert.equal(returnedinfos.length, 0);
  });

  test("denormalised venue", async () => {
    for (let i = 0; i < testinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await venuelyService.createinfo(venues._id, testinfos[i]);
    }
    const returnedvenue = await venuelyService.getvenue(venues._id);
    assert.equal(returnedvenue.infos.length, testinfos.length);
    for (let i = 0; i < testinfos.length; i += 1) {
      assertSubset(testinfos[i], returnedvenue.infos[i]);
    }
  });
});