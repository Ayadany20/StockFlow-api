import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  dialectModule: require('tedious'),
  logging: false,
  define: { timestamps: true }
});
