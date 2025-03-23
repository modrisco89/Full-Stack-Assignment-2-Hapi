import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testvenues, testVenue } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("venue Model tests (mem)", () => {
  setup(async () => {
    db.init("mem");
    await db.venueStore.deleteAllvenues();
    for (let i = 0; i < testvenues.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testvenues[i] = await db.venueStore.addvenue(testvenues[i]);
    }
  });

  test("create a venue", async () => {
    const venue = await db.venueStore.addvenue(testVenue);
    assertSubset(testVenue, venue);
    assert.isDefined(venue._id);
  });

  test("delete all venues", async () => {
    let returnedvenues = await db.venueStore.getAllvenues();
    assert.equal(returnedvenues.length, 3);
    await db.venueStore.deleteAllvenues();
    returnedvenues = await db.venueStore.getAllvenues();
    assert.equal(returnedvenues.length, 0);
  });

  test("get a venue - success", async () => {
    const venue = await db.venueStore.addvenue(testVenue);
    const returnedvenue = await db.venueStore.getvenueById(venue._id);
    assertSubset(returnedvenue, venue);
  });

  test("delete One Playist - success", async () => {
    const id = testvenues[0]._id;
    await db.venueStore.deletevenueById(id);
    const returnedvenues = await db.venueStore.getAllvenues();
    assert.equal(returnedvenues.length, testvenues.length - 1);
    const deletedvenue = await db.venueStore.getvenueById(id);
    assert.isNull(deletedvenue);
  });

  test("get a venue - bad params", async () => {
    assert.isNull(await db.venueStore.getvenueById(""));
    assert.isNull(await db.venueStore.getvenueById());
  });

  test("delete One venue - fail", async () => {
    await db.venueStore.deletevenueById("bad-id");
    const allvenues = await db.venueStore.getAllvenues();
    assert.equal(testvenues.length, allvenues.length);
  });
});
