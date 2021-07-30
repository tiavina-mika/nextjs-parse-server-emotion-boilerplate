import cookie from 'cookie';

const login = async (req, res) => {
  console.log(req.body);
  if (req.method === 'POST') {
    // let body = JSON.parse(req.body);
    const user = await Parse.User.logIn(req.body.email, req.body.password);
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', user.getSessionToken(), {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 31536000,
        path: '/',
      }),
    );
    res.json({ message: 'Welcome back to the app!' });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
};

export default login;
