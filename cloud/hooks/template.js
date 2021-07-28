"use strict";
const { parseFunction } = require("../utils/utils");
const roleUtils = require("../utils/roleUtils");

Parse.Cloud.define(
  "createRoles",
  parseFunction(async (request) => {
    console.log("request for user", request);
    //-------------------------------------------------------//
    //------------------ checking security ------------------//
    //-------------------------------------------------------//
    // only admin can create roles
    const admin = request.user;
    await roleUtils.checkAdministrator(admin);

    //-------------------------------------------------------//
    //----------------- creation of roles -------------------//
    //-------------------------------------------------------//
    const roles = [];
    //---- Manager ----//
    const marketingRole = await createRole("Manager");
    roles.push(marketingRole);

    //---- Dealer ----//
    const operationsRole = await createRole("Dealer");
    roles.push(operationsRole);

    //---- Client ----//
    const customerRole = await createRole("Client");
    roles.push(customerRole);

    return roles;
  }),
);

Parse.Cloud.define(
  "getTemplates",
  parseFunction(async (request) => {
    const templates = await new Parse.Query('Template')
      // .equalTo("users", request.user)
      .find();
    return templates;
    // return { message: "hello" };
  }),
);

/**
 * create new role
 * @param {string} name
 * @returns {Promise<Parse.Role>}
 */
async function createRole(name) {
  // actually we have only one Administrator
  const administrators = await new Parse.Query(Parse.Role)
    .equalTo("name", "Administrator")
    .find(USE_MASTER_KEY);

  //---- checking saved role ----//
  const savedRole = await new Parse.Query(Parse.Role)
    .equalTo("name", name)
    .first(USE_MASTER_KEY);
  if (savedRole) {
    return savedRole;
  }

  //---------------------------//
  //--------- creation --------//
  //---------------------------//
  //---- ACL ----//
  const userRoleACL = new Parse.ACL();
  userRoleACL.setPublicReadAccess(true);
  userRoleACL.setRoleWriteAccess("Administrator", true);
  //---- actual creation ----//
  const newRole = new Parse.Role(name, userRoleACL);
  newRole.getRoles().add(administrators);
  await newRole.save(null, USE_MASTER_KEY);

  //---- inheritance ----//
  const rumsquareRole = await new Parse.Query(Parse.Role)
    .equalTo("name", "Rumsquare")
    .first(USE_MASTER_KEY);
  rumsquareRole.getRoles().add(newRole);
  await rumsquareRole.save(null, USE_MASTER_KEY);

  return newRole;
}
