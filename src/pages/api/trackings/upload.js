import fs from 'fs';

import csv from 'csv-parse';
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
     for (const file of req.files['csv[]']) {
      fs.createReadStream(file.path)
        .pipe(csv({
          delimiter: ';',
columns: false,
trim: true,
bom: false,
cast_date: true,
          caste: true,
auto_parse: true,
          skip_empty_lines: true,
relax_column_count: true,
relax: true,
        }))
        // .on('headers', (data) => {
        //   console.log('headers: ', data);
        // })
        .on('data', (data) => {
          console.log('data: ', data);
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
     }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
}));

export default handler;
