import express from 'express';
import helmet from 'helmet';
import path from 'path';
import guests from './routes/guests.js';
import {
    load,
    register,
    connect
} from './db/index.js';
const app = express();
let dirname = path.resolve();

const main = async () => {

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static(path.join(dirname, 'public')));
    app.use(helmet());

    const connection = await connect();
    const models = load(connection);
    if (process.env.TEST_ENV || process.env.NODE_ENV) {
        // await connection.dropDatabase();
    }

    register(app, connection, models);

    app.use('/api/guests', guests);

    app.use(express.static(path.join(dirname, './build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
      res.sendFile(path.join(dirname, './build', 'index.html'));
    });

    const host = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT_NODE || 8080;
    app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
}

main();