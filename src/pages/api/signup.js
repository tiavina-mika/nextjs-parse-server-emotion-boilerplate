import { signup } from '../../controllers/auth';
import { sendRequestError } from '../../utils/utils';

const signupHandler = async (req, res) => {
  const signuApi = async () => {
    try {
      const user = await signup(req);

      if (!user) {
        throw new Error('No account found');
      }
      res.json({ message: 'Welcome back to the app!', success: true });
    } catch (error) {
      res.status(400).json({ message: error.message || 'internal server error !' });
    }
  };

  switch (req.method) {
    case 'POST':
      return signuApi();
    default:
      return sendRequestError(req, res);
  }
};

export default signupHandler;
