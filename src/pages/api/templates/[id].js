import withSession from '../../../api/withSession';
import { deleteTemplate, editTemplate, getTemplate } from '../../../controllers/templates';

const handler = withSession(async ({ req, res }) => {
  const { id } = req.query;

  // const getTemplate = async () => {
  //   const template = await new Parse.Query('Template')
  //     .equalTo('objectId', id)
  //     .first();

  //   return template;
  // };

  // edit template
  const editTemplateApi = async () => {
    try {
      const template = await getTemplate(id);
      const newTemplate = await editTemplate(template.id, req.body);

      return res.status(200).json(newTemplate);
    } catch (error) {
        return res.status(400).json({ error: true, message: error });
    }
  };

  // delete template
  const deleteTemplateApi = async () => {
    const template = await getTemplate(id);

    await deleteTemplate(template.id);
    return res.status(200).json({ success: true });
  };

  switch (req.method) {
      case 'PUT':
          return editTemplateApi();
      case 'DELETE':
        return deleteTemplateApi();
      default:
          return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

export default handler;
