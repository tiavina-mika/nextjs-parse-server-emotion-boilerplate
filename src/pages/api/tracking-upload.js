import fs from 'fs';

import csv from 'csv-parse';
import nextConnect from 'next-connect';

import withSession from '../../api/withSession';
import middleware from '../../middleware/middleware';
// import { createTemplate } from '../../../controllers/templates';
// import { sendRequestError } from '../../../utils/utils';

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
      fs.createReadStream(req.files.file[0].path)
        .pipe(csv({
          delimiter: ',', columns: false, trim: true, bom: true,
        }))
        .on('data', (data) => {
          rows.push(data);
        })
        .on('end', async () => {
          console.log(' --- rows: ', rows);
          // the logic to save to the db should be here

          // const result = await Promise.all(
          //   rows.map(
          //     async (row) => await saveTracking(row, sessionToken),
          //   ),
          // );
        });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
}));

export default handler;
