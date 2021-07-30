const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const next = require('next');
const cors = require('cors');
const Parse = require('parse/node');

const SERVER_PORT = process.env.PORT || 3000;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'yourz';
const MASTER_KEY = process.env.MASTER_KEY || 'F23xUQdRmQLQwxV5N6a74kqF8aPqIM9F';
// const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/rumsquareTest';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev: IS_DEVELOPMENT });
const handle = nextApp.getRequestHandler();

const getParseServerAPI = () => new ParseServer({
  databaseURI: process.env.DATABASE_URI,
  cloud: path.resolve(__dirname, './cloud/main.js'),
  appId: APP_ID,
  masterKey: MASTER_KEY,
  serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
});

global.USE_MASTER_KEY = { useMasterKey: true };
global.LOCAL = true;

nextApp
  .prepare()
  .then(() => {
    Parse.initialize('yourz');
    Parse.serverURL = `http://${SERVER_HOST}:${SERVER_PORT}/api/parse`;
    Parse.masterKey = MASTER_KEY;

    const app = express();

    app.use(cors());
    // Add headers
    app.use((req, res, next) => {
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });

    app.use('/parse', getParseServerAPI());

    app.all('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(SERVER_PORT, (err) => {
      if (err) throw err;
      console.log(
        `Notre serveur tourne en mode ${process.env.NODE_ENV ||
          'development'} sur http://localhost:${SERVER_PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
