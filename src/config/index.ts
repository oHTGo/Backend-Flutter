import * as dotenv from 'dotenv';
dotenv.config();
console.log(`Running on ${process.env.NODE_ENV}`);

const SALT = process.env.SALT;
const CLIENT_URL = process.env.CLIENT_URL;
const BACKEND_URL = process.env.BACKEND_URL;
const PORT = process.env.PORT;
const VERSION = process.env.VERSION;
const JWTSECRET = process.env.JWTSECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export {
  SALT,
  CLIENT_URL,
  BACKEND_URL,
  PORT,
  VERSION,
  JWTSECRET,
  CLIENT_ID,
  CLIENT_SECRET
};
