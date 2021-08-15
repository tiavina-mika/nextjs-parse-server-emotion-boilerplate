import { xlsxToJson } from 'json-and-xlsx';
import nextConnect from 'next-connect';

import withSession from '../../../api/withSession';
import middleware from '../../../middleware/middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect()
  .use(middleware)
  .post(withSession(async ({ req, res, sessionToken }) => {
    console.log('req: ', req.files);
    const rows = [];
    try {
      for (const file of req.files['xls[]']) {
        const output = xlsxToJson.readFromFileAndGet(file.path);
        console.log('output: ', output);
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
}));

export default handler;
