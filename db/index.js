const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const db = {};

if (!(process.env.MYSQL_HOST && process.env.MYSQL_USER && process.env.MYSQL_PASSWORD && process.env.MYSQL_DATABASE)) {
  throw Error(`Failed connecting to database, missing connection details`);
}

const sequelizeSettings = {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: process.env.SEQUELIZE_DEBUG === 'true' ? console.debug : false,
};

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, sequelizeSettings);

fs.readdirSync(path.join(__dirname, 'models'))
    .filter(file => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, 'models', file));
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
    .authenticate()
    .then(() => {
      console.log(
          `connected to MySQL server - ${process.env.MYSQL_HOST}`
      );
    })
    .catch(error => {
      console.error(`failed connecting to MySQL server`, {error});
    });

module.exports = db;
