const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
app.use(express.json());

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // <-- Enable credentials
};
app.use(cors(corsOptions));

// הגדרת נתיב סטטי לתיקיית uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const eventRouter = require("./routes/eventsRoute");
const emailRouter = require("./routes/emailRoute");
app.use("/events", eventRouter);
app.use("/sendEmail", emailRouter);

const userRouter = require("./routes/usersRoute");
const loginRouter = require("./routes/loginRoute");
const signUpRouter = require("./routes/signUpRoute");
const logoutRouter = require("./routes/logoutRoute");

const seatsTakenRouter = require("./routes/seatsTakenRoute");
const auditoriumsPartsRouter = require("./routes/auditoriumsPartsRoute");
const auditoriumsRouter = require("./routes/auditoriumsRoute");

app.use("/users", userRouter);

app.use("/seatsTaken", seatsTakenRouter);
app.use("/auditoriumsParts", auditoriumsPartsRouter);
app.use("/auditoriums", auditoriumsRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);
app.use("/logout", logoutRouter);

const verifyJWT = require("./middleware/verifyJWT");
const verifyRoles = require("./middleware/verifyRoles");
app.use(verifyJWT);
app.use(verifyRoles);



app.listen(3300, () => {
  console.log(`app is listening on port ${3300}`);
});

//.env
//ACCESS_TOKEN_SECRET=13bb6ef5d34dfdf2950bba76c6288c695670b7cb9a5c2afcf2836b373234901dac6e8d5f1aeb0d54d1ce62d11b5cb8e3910f93336e4216b489a7e18f64ef1bd7
// REFRESH_TOKEN_SECRET=90963d2ca7486ea964b558b9ebbef0f92a1af42a50d87fe62a9089a4366035100e6ce903a8f0c2bc97e4aa9cda1b0443117cd4d2ec71c8faa83bd7fee58ba7d4
// EMAIL_USER="gilakassab@gmail.com"
// EMAIL_PASS="sade kuab mocg kucm"
