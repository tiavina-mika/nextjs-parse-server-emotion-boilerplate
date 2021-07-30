import { login } from '../../controllers/auth';
import { sendRequestError } from '../../utils/utils';

const loginHandler = async (req, res) => {
  const loginApi = async () => {
    try {
      const user = await login(req, res);

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
      return loginApi();
    default:
      return sendRequestError(req, res);
  }
};

export default loginHandler;
