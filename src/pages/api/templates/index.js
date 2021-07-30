// import { createTemplate } from '../../../actions/templates';
import withSession from '../../../api/withSession';
import { createTemplate } from '../../../controllers/templates';

const handler = withSession(async ({ req, res }) => {
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
      const template = await createTemplate(req.body);
      return res.status(200).json(template);
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }
  };

  switch (req.method) {
    case 'GET':
        return getTemplates();
    case 'POST':
      return addTemplate();
    default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

export default handler;
