import withSession from '../../api/withSession';
import { getCurrentUser } from '../../controllers/auth';

const currentUserHandler = withSession(async ({ req, res, sessionToken }) => {
  const getCurrentUserApi = async () => {
    try {
      const user = await getCurrentUser(sessionToken);

      if (!user) {
        throw new Error('No account found');
      }
      res.json({ user, success: true });
    } catch (error) {
      res.status(400).json({ message: error.message || 'No user found' });
    }
  };

  switch (req.method) {
    case 'GET':
      return getCurrentUserApi();
    default:
      return sendRequestError(req, res);
  }
});

export default currentUserHandler;
