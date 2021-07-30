const user = async (req, res) => {
  try {
    // const q = new Parse.Query("User");
    console.log('sessionToken', req.cookies.sessionToken);
    const userData = await Parse.Cloud.httpRequest({
      url: Parse.serverURL + '/users/me',
      headers: {
        'X-Parse-Application-Id': 'rumsquare',
        'X-Parse-Session-Token': req.cookies.sessionToken,
      },
    });
    res.json(userData.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'internal server error !' });
  }
};

export default user;
