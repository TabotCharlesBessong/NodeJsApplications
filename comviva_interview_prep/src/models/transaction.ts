import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import User from './user';

interface TransactionAttributes {
  id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  type: string; // e.g., 'transfer'
  status: string; // e.g., 'completed', 'failed', 'pending'
  created_at?: Date;
  updated_at?: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: string;
  public sender_id!: string;
  public receiver_id!: string;
  public amount!: number;
  public type!: string;
  public status!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Associations
  public readonly sender?: User;
  public readonly receiver?: User;

  static associate(models: any) {
    Transaction.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
    Transaction.belongsTo(models.User, { foreignKey: 'receiver_id', as: 'receiver' });
  }
}

export default Transaction;
