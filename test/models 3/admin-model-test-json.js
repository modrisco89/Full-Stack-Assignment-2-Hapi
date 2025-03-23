import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { admin, testAdmins } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("admin Model tests (json)", () => {
  setup(async () => {
    db.init("json");
    await db.adminStore.deleteAlladmins();
    for (let i = 0; i < testAdmins.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testAdmins[i] = await db.adminStore.addadmin(testAdmins[i]);
    }
  });

  test("create a admin", async () => {
    const newadmin = await db.adminStore.addadmin(admin);
    assertSubset(admin, newadmin);
  });

  test("delete all adminApi", async () => {
    let returnedadmins = await db.adminStore.getAlladmins();
    assert.equal(returnedadmins.length, 3);
    await db.adminStore.deleteAlladmins();
    returnedadmins = await db.adminStore.getAlladmins();
    assert.equal(returnedadmins.length, 0);
  });

  test("get a admin - success", async () => {
    const admin2 = await db.adminStore.addadmin(admin);
    const returnedadmin1 = await db.adminStore.getadminById(admin2._id);
    assert.deepEqual(admin2, returnedadmin1);
    const returnedadmin2 = await db.adminStore.getAdminByEmail(admin2.email);
    assert.deepEqual(admin2, returnedadmin2);
  });

  test("delete One admin - success", async () => {
    await db.adminStore.deleteadmin(testAdmins[0]._id);
    const returnedadmins = await db.adminStore.getAlladmins();
    assert.equal(returnedadmins.length, testAdmins.length - 1);
    const deletedadmin = await db.adminStore.getadminById(testAdmins[0]._id);
    assert.isNull(deletedadmin);
  });

  test("get a admin - bad params", async () => {
    assert.isNull(await db.adminStore.getAdminByEmail(""));
    assert.isNull(await db.adminStore.getadminById(""));
    assert.isNull(await db.adminStore.getadminById());
  });

  test("delete One admin - fail", async () => {
    await db.adminStore.deleteadmin("bad-id");
    const alladmins = await db.adminStore.getAlladmins();
    assert.equal(testAdmins.length, alladmins.length);
  });
});
