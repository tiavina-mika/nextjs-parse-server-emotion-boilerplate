import withSession from '../../../api/withSession';

const Template = Parse.Object.extend('Template');

const handler = withSession(async ({ req, res }) => {
  // get templates
  const getTemplates = async () => {
    const templates = await new Parse.Query('Template').find();
    return res.status(200).json(templates);
  };

  // add new template
  const addTemplate = async () => {
    const template = new Template();
    const { name } = req.body;

    template.set('name', name);
    const newTemplate = await template.save();
    return res.status(200).json(newTemplate);
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