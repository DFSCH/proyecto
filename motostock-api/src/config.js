export function configFromEnv(env = process.env) {
  const secret = env.JWT_SECRET;
  if (!secret || secret.length < 32 || secret.startsWith('CAMBIA_')) throw Error('Configura JWT_SECRET con al menos 32 caracteres aleatorios en .env.');
  if (!env.DB_NAME || !env.DB_USER) throw Error('Configura DB_NAME y DB_USER en .env.');
  return { port: Number(env.PORT || 3000), secret,
    origins: (env.FRONT_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean),
    db: { host: env.DB_HOST || '127.0.0.1', port: Number(env.DB_PORT || 3306), user: env.DB_USER, password: env.DB_PASSWORD || '', database: env.DB_NAME, waitForConnections: true, connectionLimit: 10, decimalNumbers: true, timezone: 'Z', charset: 'utf8mb4' } };
}
