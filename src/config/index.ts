import * as dotenv from 'dotenv';
dotenv.config();
console.log(`Running on ${process.env.NODE_ENV}`);

const SALT = process.env.SALT;
const CLIENT_URL = process.env.CLIENT_URL;
const BACKEND_URL = process.env.BACKEND_URL;
const PORT = process.env.PORT;
const VERSION = process.env.VERSION;
const JWTSECRET = process.env.JWTSECRET;

export {SALT, CLIENT_URL, BACKEND_URL, PORT, VERSION, JWTSECRET};
