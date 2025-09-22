import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface UserAttributes {
  id: string;
  phone_number: string;
  pin: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public phone_number!: string;
  public pin!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models: any) {
    User.hasOne(models.Account, { foreignKey: 'user_id', as: 'account' });
    User.hasMany(models.Transaction, { foreignKey: 'sender_id', as: 'sent_transactions' });
    User.hasMany(models.Transaction, { foreignKey: 'receiver_id', as: 'received_transactions' });
  }
}

export default User;
