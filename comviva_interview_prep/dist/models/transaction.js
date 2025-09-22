"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const user_1 = __importDefault(require("./user"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    sender_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id',
        },
    },
    receiver_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id',
        },
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: index_1.default.sequelize,
    tableName: 'transactions',
    underscored: true,
    timestamps: true,
});
Transaction.belongsTo(user_1.default, { foreignKey: 'sender_id', as: 'sender' });
Transaction.belongsTo(user_1.default, { foreignKey: 'receiver_id', as: 'receiver' });
user_1.default.hasMany(Transaction, { foreignKey: 'sender_id', as: 'sent_transactions' });
user_1.default.hasMany(Transaction, { foreignKey: 'receiver_id', as: 'received_transactions' });
exports.default = Transaction;
