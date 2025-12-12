
import { Sequelize } from 'sequelize';
import serverConfig from './server.config.js'; 

const sequelize = new Sequelize({
  database: serverConfig.database.name,      
  username: serverConfig.database.user,      
  password: serverConfig.database.password,  
  server: serverConfig.database.host,        
  port: serverConfig.database.port || 1433,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  logging: console.log
});

export default sequelize;
