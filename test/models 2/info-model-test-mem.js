import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testvenues, testinfos, testVenue2, testVenue, info, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("info Model tests (mem)", () => {
  let testVenue2List = null;

  setup(async () => {
    await db.init("mem");
    await db.venueStore.deleteAllvenues();
    await db.infoStore.deleteAllinfos();
    testVenue2List = await db.venueStore.addvenue(testVenue2);
    for (let i = 0; i < testinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testinfos[i] = await db.infoStore.addinfo(testVenue2List._id, testinfos[i]);
    }
  });

  test("create single info", async () => {
    const testVenueList = await db.venueStore.addvenue(testVenue);
    const info2 = await db.infoStore.addinfo(testVenueList._id, info);
    assert.isNotNull(info._id);
    assertSubset(info2, info);
  });

  test("create multiple infoApi", async () => {
    const testinfos2 = await db.venueStore.getvenueById(testVenue2List._id);
    assert.equal(testinfos2.length, testVenue2List.length);
  });

  test("delete all infoApi", async () => {
    const infos = await db.infoStore.getAllinfos();
    assert.equal(testinfos.length, infos.length);
    await db.infoStore.deleteAllinfos();
    const newinfos = await db.infoStore.getAllinfos();
    assert.equal(0, newinfos.length);
  });

  test("get a info - success", async () => {
    const testVenueList = await db.venueStore.addvenue(testVenue);
    const info2 = await db.infoStore.addinfo(testVenueList._id, info);
    const newinfo = await db.infoStore.getinfoById(info._id);
    assertSubset(info2, newinfo);
  });

  test("delete One info - success", async () => {
    const id = testinfos[0]._id;
    await db.infoStore.deleteinfo(id);
    const infos = await db.infoStore.getAllinfos();
    assert.equal(infos.length, testvenues.length - 1);
    const deletedinfo = await db.infoStore.getinfoById(id);
    assert.isNull(deletedinfo);
  });

  test("get a venue - bad params", async () => {
    assert.isNull(await db.infoStore.getinfoById(""));
    assert.isNull(await db.infoStore.getinfoById());
  });

  test("delete One User - fail", async () => {
    await db.infoStore.deleteinfo("bad-id");
    const infos = await db.infoStore.getAllinfos();
    assert.equal(infos.length, testvenues.length);
  });
});
