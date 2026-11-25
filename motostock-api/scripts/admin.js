import { configFromEnv } from '../src/config.js';
import { createDb } from '../src/db.js';
const email=process.argv[2];if(!email){console.error('Uso: npm run admin -- correo@ejemplo.com');process.exit(1);}
const db=createDb(configFromEnv().db);try{const [rows]=await db.execute('SELECT id FROM usuarios WHERE email=?',[email.trim().toLowerCase()]);if(!rows.length)throw Error('Primero registra esa cuenta desde la página.');await db.execute("UPDATE usuarios SET rol='admin' WHERE id=?",[rows[0].id]);console.log('Rol administrador asignado. El middleware reconocerá el cambio sin generar otro token.');}catch(e){console.error(e.message);process.exitCode=1;}finally{await db.end();}
