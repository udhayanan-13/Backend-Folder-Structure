import sql from "mssql";
import { config } from "./config.js";

const dbConnect = async () => {
  try {
    await sql.connect(config);
    console.log("DB connection successful");
  } catch (err) {
    console.log("DB connection failed with error:" + err);
    throw err;
  }
};

export default dbConnect;
