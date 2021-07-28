import withSession from '../../../api/withSession';

const handler = withSession(async ({ req, res }) => {
  const { id } = req.query;

  const getTemplate = async () => {
    const template = await new Parse.Query('Template')
      .equalTo('objectId', id)
      .first();

    return template;
  };

  const editTemplate = async () => {
    const template = await getTemplate();
    const { name } = req.body;

    template.set('name', name);
    const newTemplate = await template.save();
    return res.status(200).json(newTemplate);
  };

  switch (req.method) {
      case 'PUT':
          return editTemplate();
      default:
          return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

export default handler;
