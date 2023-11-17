import { config } from 'dotenv';
import { Pool } from 'pg';

config();

export const pool = new Pool({
  user: process.env.POSTGRES_USER,  
  password: process.env.POSTGRES_PASSWORD,  
  database: process.env.POSTGRES_DB,
  host: 'localhost',
  port: 5433,  
});