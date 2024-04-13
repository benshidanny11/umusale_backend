import express from 'express';
import db from './db/models/index';
import api from './routers';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
  .use('/', api);

const { sequelize: dbCon } = db;

app.listen(PORT, () => {
  dbCon
    .sync()
    .then(() => {
      console.log(
        `Database succesfully connected ✅\nPID: ${process.pid} Server listening on port: ${PORT} in ${process.env.NODE_ENV} mode 😊`,
      );
    })
    .catch((err) => {
      // console.error('Unable to connect to the database:', err);
      throw (err);
    });
});