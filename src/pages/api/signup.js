// import Parse from '../../api/parse';
const signup = async (req, res) => {
  if (req.method === 'POST') {
    const user = new Parse.User();
    user.set('username', req.body.email);
    user.set('password', req.body.password);

    user.set('email', req.body.email);
    user.set('name', req.body.email);
    await user.signUp();
    res.status(201).json({ message: 'you are signed Up' });
  } else {
    res.status(405).json({ message: 'We only support POST' });
  }
};

export default signup;
