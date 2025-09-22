import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/config';
import User from './user';
import Account from './account';
import Transaction from './transaction';

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password as string,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: dbConfig.logging,
  }
);

const db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    phone_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    pin: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true,
    timestamps: true,
  }
);

Account.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false, unique: true, references: { model: User, key: 'id' } },
    balance: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'accounts',
    underscored: true,
    timestamps: true,
  }
);

Transaction.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    sender_id: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
    receiver_id: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id' } },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: 'transactions',
    underscored: true,
    timestamps: true,
  }
);

db.User = User;
db.Account = Account;
db.Transaction = Transaction;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
