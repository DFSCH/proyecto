import mysql from 'mysql2/promise';
export const createDb = config => mysql.createPool(config);
