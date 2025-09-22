"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
const account_1 = __importDefault(require("./account"));
const transaction_1 = __importDefault(require("./transaction"));
const sequelize = new sequelize_1.Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, {
    host: config_1.default.host,
    dialect: config_1.default.dialect,
    port: config_1.default.port,
    logging: config_1.default.logging,
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    User: user_1.default,
    Account: account_1.default,
    Transaction: transaction_1.default,
};
exports.default = db;
