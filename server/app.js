const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
app.use(express.json());

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // <-- Enable credentials
};
app.use(cors(corsOptions));

// הגדרת נתיב סטטי לתיקיית uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const eventRouter = require('./routes/eventsRoute');
const emailRouter = require('./routes/emailRoute');
app.use('/events', eventRouter);
app.use('/sendEmail', emailRouter);

const userRouter = require('./routes/usersRoute');
const loginRouter = require('./routes/loginRoute');
const signUpRouter = require('./routes/signUpRoute');
const logoutRouter = require('./routes/logoutRoute');
const seatsViewRouter = require('./routes/seatsViewRoute');
const seatsTakenRouter = require('./routes/seatsTakenRoute');
const auditoriumsPartsRouter = require('./routes/auditoriumsPartsRoute');
const auditoriumsRouter = require('./routes/auditoriumsRoute');

app.use('/users', userRouter);
app.use('/seatsView', seatsViewRouter);
app.use('/seatsTaken', seatsTakenRouter);
app.use('/auditoriumsParts', auditoriumsPartsRouter);
app.use('/auditoriums', auditoriumsRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/logout', logoutRouter);

const verifyJWT = require('./middleware/verifyJWT');
const verifyRoles = require('./middleware/verifyRoles');
app.use(verifyJWT);
app.use(verifyRoles);

app.use('/', require('./routes/root'));

app.listen(3300, () => {
    console.log(`app is listening on port ${3300}`);
});
