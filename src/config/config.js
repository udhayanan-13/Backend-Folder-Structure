import "dotenv/config";

export const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    enableArithAbort: true,
    encrypt: true,
    trustServerCertificate: true,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};
