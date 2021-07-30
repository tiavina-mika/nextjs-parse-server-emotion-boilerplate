import cookie from 'cookie';

import { requests } from '../api/api';
import { APP_NAME, SESSION_TOKEN_NAME } from '../utils/constants';

export const login = async (req, res) => {
  const user = await Parse.User.logIn(req.body.email, req.body.password);

  // save the session token into cookies
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SESSION_TOKEN_NAME, user.getSessionToken(), {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 31536000,
      path: '/',
    }),
  );

  return user;
};

export const signup = async (req) => {
  const user = new Parse.User();
  user.set('username', req.body.email);
  user.set('password', req.body.password);

  const newUser = await user.signUp();
  return newUser;
};

export const logout = async (res) => {
  await Parse.User.logOut();
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(SESSION_TOKEN_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    }),
  );
};

export const getCurrentUser = async (sessionToken) => {
  const config = {
    headers: {
      'X-Parse-Application-Id': APP_NAME,
      'X-Parse-Session-Token': sessionToken,
    },
  };

  const response = await requests.get(Parse.serverURL + '/users/me', config);
  return response.data;
};
