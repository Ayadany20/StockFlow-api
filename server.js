import app from './src/app.js';
import db from './src/models/index.js'; // Tu index.js de modelos
import serverConfig from './src/config/server.config.js';

const PORT = serverConfig.app.port || 3000;

(async () => {
  try {
    // 1️⃣ Verificar la conexión a la base de datos
    await db.sequelize.authenticate();
    console.log('✅ Conexión a SQL Server exitosa');

    // 2️⃣ Sincronizar modelos con la base de datos
    // alter: true -> actualiza la estructura sin borrar datos
    await db.sequelize.sync();
    console.log('✅ Tablas sincronizadas correctamente');

    // 3️⃣ Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error de conexión o sincronización de base de datos:', error.message);
    process.exit(1);
  }
})();
