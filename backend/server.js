const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { logger, errorhandler } = require("./middlewares/validate");
const noteroutes = require("./routes/user-route");
const authroutes = require("./routes/auth-route");


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());


app.use(cookieParser());

app.use(logger);


mongoose.connect("mongodb+srv://shushantk70_db_user:4RgrQmKuG1maXLkb@cluster0.kx5wstf.mongodb.net/")
  .then(() => console.log("database is connected"))
  .catch(err => console.error("error connecting", err));



app.use("/api/auth", authroutes);
app.use("/api/notes", noteroutes);


app.use(errorhandler);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
