import app from "./app.js";
import dbConnect from "./config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 3001;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  })
  .catch((err) => {
    console.log("Error in creating a server: " + err);
  });
