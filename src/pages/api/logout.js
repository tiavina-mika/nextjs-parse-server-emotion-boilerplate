import cookie from 'cookie';

export default async function logout(req, res) {
  console.log('req: ', req);
  Parse.User.logOut().then(() => {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
      }),
    );
    res.json({ message: 'good bye sir !' });
  });
}
