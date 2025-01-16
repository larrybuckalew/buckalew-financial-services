import { Sequelize } from 'sequelize';
import User from './user';
import Transaction from './transaction';
import Portfolio from './portfolio';

const sequelize = new Sequelize(process.env.DB_CONNECTION);

const models = {
  User: User(sequelize),
  Transaction: Transaction(sequelize),
  Portfolio: Portfolio(sequelize)
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;