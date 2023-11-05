const mongoose = require("mongoose");

module.exports = () => {
  const connectionURI = "mongodb://127.0.0.1:27017/Users";

  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Set the strictQuery option to false to suppress the warning
  mongoose.set('strictQuery', false);

  mongoose.connect(connectionURI, connectionParams);

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("Database connection error:", error);
  });

  db.once("open", () => {
    console.log("Connected to database successfully");
  });

  db.on("disconnected", () => {
    console.log("Disconnected from database");
  });

  process.on("unhandledRejection", (error, promise) => {
    console.error("Unhandled Promise rejection:", error);
    console.error(error.stack || "No stack trace available");
  });

  // Handle Node.js process termination events
  process.on("SIGINT", () => {
    db.close(() => {
      console.log("Database connection closed due to app termination");
      process.exit(0);
    });
  });
};
