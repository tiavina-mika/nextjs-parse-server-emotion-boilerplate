export const getUserRole = async (sessionToken) => {
  let userRoles = [];
  try {
    userRoles = await Parse.Cloud.run('getUserRole', undefined, {
      sessionToken,
    });
  } catch (error) {
    console.log('error: ', error);
  }

  return userRoles.map((u) => ({ ...u, name: u.getName() }));
};

export const isUserAdmin = async (sessionToken) => {
  const roles = await getUserRole(sessionToken);
  const isAdmin = !!roles.find((u) => u.name === 'Administrator');
  return isAdmin;
};
