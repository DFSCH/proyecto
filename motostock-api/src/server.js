import { configFromEnv } from './config.js';
import { createDb } from './db.js';
import { createApp } from './app.js';
const config=configFromEnv(),db=createDb(config.db);
try{await db.execute('SELECT 1');const server=createApp(db,config).listen(config.port,()=>console.log(`MotoStock API: http://localhost:${config.port}/api`));for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(async()=>{await db.end();process.exit(0);}));}catch(e){console.error('No se pudo conectar con MySQL:',e.code||e.message);await db.end();process.exitCode=1;}
