import withSession from '../../../api/withSession';
import { deleteTemplate, editTemplate, getTemplate } from '../../../controllers/templates';
import { sendRequestError } from '../../../utils/utils';

const handler = withSession(async ({ req, res, sessionToken }) => {
  const { id } = req.query;

  // edit template
  const editTemplateApi = async () => {
    try {
      const template = await getTemplate(id);
      const newTemplate = await editTemplate(template.id, req.body, sessionToken);

      return res.status(200).json(newTemplate);
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
  };

  // delete template
  const deleteTemplateApi = async () => {
    const template = await getTemplate(id);

    await deleteTemplate(template.id, sessionToken);
    return res.status(200).json({ success: true });
  };

  switch (req.method) {
    case 'PUT':
      return editTemplateApi();
    case 'DELETE':
      return deleteTemplateApi();
    default:
    return sendRequestError(req, res);
  }
});

export default handler;
