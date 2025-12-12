// src/models/provider.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Tu conexión a SQL Server

const Provider = sequelize.define('Provider', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'providers',
    timestamps: true
});

export default Provider;
