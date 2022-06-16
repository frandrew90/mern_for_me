const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
// const router = require("./routes/auth_routes.js");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth_routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      //   useCreateIndex: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () =>
      console.log(`App has been started on PORT ${PORT}...`)
    );
  } catch (error) {
    console.log("server error", error.message);
    process.exit(1);
  }
}

start();
