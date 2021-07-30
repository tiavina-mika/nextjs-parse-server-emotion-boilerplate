import { logout } from '../../controllers/auth';
import { sendRequestError } from '../../utils/utils';

const logoutHandler = async (req, res) => {
  const logoutApi = async () => {
    try {
      await logout(res);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error.message || 'internal server error !' });
    }
  };

  switch (req.method) {
    case 'POST':
      return logoutApi();
    default:
      return sendRequestError(req, res);
  }
};

export default logoutHandler;
