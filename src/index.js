const dotenv = require('dotenv');
const app = require('./app');
const db = require('./models');
// import app from "./app";
// import db from "./models";
// import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3004;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Server is listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
