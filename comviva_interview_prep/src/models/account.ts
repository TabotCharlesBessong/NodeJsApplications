import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import User from './user';

interface AccountAttributes {
  id: string;
  user_id: string;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
  public id!: string;
  public user_id!: string;
  public balance!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Associations
  public readonly user?: User;

  static associate(models: any) {
    Account.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Account;
