import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlaylists, testinfos, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("info Model tests", () => {
  let beethovenList = null;

  setup(async () => {
    await db.init("mongo");
    await db.playlistStore.deleteAllPlaylists();
    await db.infoStore.deleteAllinfos();
    beethovenList = await db.playlistStore.addPlaylist(beethoven);
    for (let i = 0; i < testinfos.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testinfos[i] = await db.infoStore.addinfo(beethovenList._id, testinfos[i]);
    }
  });

  test("create single info", async () => {
    const mozartList = await db.playlistStore.addPlaylist(mozart);
    const info = await db.infoStore.addinfo(mozartList._id, concerto);
    assert.isNotNull(info._id);
    assertSubset(concerto, info);
  });

  test("create multiple infoApi", async () => {
    const infos = await db.playlistStore.getPlaylistById(beethovenList._id);
    assert.equal(testinfos.length, testinfos.length);
  });

  test("delete all infoApi", async () => {
    const infos = await db.infoStore.getAllinfos();
    assert.equal(testinfos.length, infos.length);
    await db.infoStore.deleteAllinfos();
    const newinfos = await db.infoStore.getAllinfos();
    assert.equal(0, newinfos.length);
  });

  test("get a info - success", async () => {
    const mozartList = await db.playlistStore.addPlaylist(mozart);
    const info = await db.infoStore.addinfo(mozartList._id, concerto);
    const newinfo = await db.infoStore.getinfoById(info._id);
    assertSubset(concerto, newinfo);
  });

  test("delete One info - success", async () => {
    const id = testinfos[0]._id;
    await db.infoStore.deleteinfo(id);
    const infos = await db.infoStore.getAllinfos();
    assert.equal(infos.length, testPlaylists.length - 1);
    const deletedinfo = await db.infoStore.getinfoById(id);
    assert.isNull(deletedinfo);
  });

  test("get a playlist - bad params", async () => {
    assert.isNull(await db.infoStore.getinfoById(""));
    assert.isNull(await db.infoStore.getinfoById());
  });

  test("delete One User - fail", async () => {
    await db.infoStore.deleteinfo("bad-id");
    const infos = await db.infoStore.getAllinfos();
    assert.equal(infos.length, testPlaylists.length);
  });
});
