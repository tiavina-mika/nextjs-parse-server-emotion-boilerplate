'use strict';

/**
 * @return {Promise<Parse.Role>}
 */
const getRole = async ({ name, sessionToken, useMasterKey }) => {
  return await new Parse.Query(Parse.Role)
    .equalTo('name', name)
    .first({ sessionToken, useMasterKey });
};

/**
 * check if user has role (at least one profile)
 * @param user
 * @param roleName (optional)
 * @returns {Promise.<boolean>}
 */
async function hasRole(user, roleName) {
  if (!user) {
    throw new Error('Missing user');
  }

  //---- query ----//
  const query = new Parse.Query(Parse.Role);
  query.equalTo('users', user);
  if (roleName) {
    query.equalTo('name', roleName);
  }

  const role = await query.first(USE_MASTER_KEY);
  return role != null;
}

/**
 * check if user has any role as manager
 * @param user
 * @returns {Promise.<boolean>}
 */
async function hasRoleAsManager(user) {
  if (!user) {
    throw new Error('Missing user');
  }
  //const managerNames = ['Administrator', 'Marketing Manager', 'Operations Manager', 'Customer Manager', 'Kitchen Manager'];
  const roles = await new Parse.Query(Parse.Role).find(USE_MASTER_KEY);
  const managerNames = roles ? roles.map((role) => role.get('name')) : [];
  const roleManager = await new Parse.Query(Parse.Role)
    .equalTo('users', user)
    .containedIn('name', managerNames)
    .first(USE_MASTER_KEY);
  return !!roleManager;
}

/**
 * get roles of selected user
 * @param user
 * @returns {Promise<Role>}
 */
async function getRolesForUser(user) {
  if (!user) return null;
  const query = new Parse.Query(Parse.Role);
  query.equalTo('users', user);
  return await query.find(USE_MASTER_KEY);
}

/**
 * get list of users to send notification
 * @param {Array<String>} roleNames, it can be ['Administrator', 'Kitchen Manager', 'Marketing Manager', 'Operations Manager', 'Customer Manager']
 * @returns {Promise.<Parse.User>}
 */
async function getUsersFromRoles(roleNames = ['Administrator']) {
  const userIds = new Set();
  await new Parse.Query(Parse.Role)
    .containedIn('name', roleNames)
    .each(async (role) => {
      await role
        .getUsers()
        .query()
        .each((userRelation) => userIds.add(userRelation.id), USE_MASTER_KEY);
    }, USE_MASTER_KEY);

  return await new Parse.Query(Parse.User)
    .containedIn('objectId', Array.from(userIds))
    .find(USE_MASTER_KEY);
}

/**
 * @param user
 * @param roleName
 * @returns {Promise.<void>}
 */
const checkRole = async (user, roleName) => {
  if (!(await hasRole(user, roleName))) {
    throw new Error(
      'The user ' + user.get('username') + ' doesn\'t have the role ' + roleName,
    );
  }
};

const isAdministratorOrBetter = async (request) => {
  if (request.master) {
    return true;
  }
  const user = request.user;
  return await isAdministrator(user);
};

/**
 * @param user
 * @returns {Promise.<boolean>}
 */
const isAdministrator = async (user) => {
  return hasRole(user, 'Administrator');
};

/**
 * @param user
 * @returns {Promise.<void>}
 */
const checkAdministrator = async (user) => {
  return checkRole(user, 'Administrator');
};

const createSecurityError = (message) => {
  // see http://docs.parseplatform.org/js/guide/#error-codes
  return new Parse.Error(Parse.Error.OperationForbidden, message);
};

exports.getRole = getRole;
exports.getRolesForUser = getRolesForUser;
exports.getUsersFromRoles = getUsersFromRoles;
exports.hasRole = hasRole;
exports.checkRole = checkRole;
exports.isAdministrator = isAdministrator;
exports.isAdministratorOrBetter = isAdministratorOrBetter;
exports.checkAdministrator = checkAdministrator;
exports.createSecurityError = createSecurityError;
exports.hasRoleAsManager = hasRoleAsManager;
