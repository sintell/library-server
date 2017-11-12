import Sequelize from 'sequelize';
import bookModel from './book';
import userModel from './user';

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../../config/database.json`)[env]; // eslint-disable-line import/no-dynamic-require
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

[
  bookModel,
  userModel,
].forEach((createModel) => {
  const model = createModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
