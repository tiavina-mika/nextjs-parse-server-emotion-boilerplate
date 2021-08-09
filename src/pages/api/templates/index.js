import withSession from '../../../api/withSession';
import { createTemplate } from '../../../controllers/templates';
import { sendRequestError } from '../../../utils/utils';

const handler = withSession(async ({ req, res, sessionToken }) => {
  // get templates
  const getTemplates = async () => {
    const templates = await new Parse.Query('Template')
      .notEqualTo('deleted', true)
      .find();
    return res.status(200).json(templates);
  };

  // add new template
  const addTemplate = async () => {
    try {
      const template = await createTemplate(req.body, sessionToken);
      return res.status(200).json(template);
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  switch (req.method) {
    case 'GET':
        return getTemplates();
    case 'POST':
      return addTemplate();
    default:
      return sendRequestError(req, res);
  }
});

export default handler;
