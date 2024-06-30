const express = require('express');
// const config = require('./config/config');
const fs = require('fs');
const path = require('path');

const app = express();
require('dotenv').config();
app.use(express.json());



const jwt = require('jsonwebtoken');

// const cookieParser = require('cookie-parser');



app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true, // <-- Enable credentials
//   };
  app.use(cors());

// const verifyJWT = require('./middleware/verifyJWT')
// const verifyRoles = require('./middleware/verifyRoles')
// app.use(verifyJWT);
// app.use(verifyRoles);

const userRouter = require('./routes/usersRoute');
const loginRouter = require('./routes/loginRoute');
const signUpRouter = require('./routes/signUpRoute');
const eventRouter = require('./routes/eventsRoute');
const seatsViewRouter = require('./routes/seatsViewRoute');
const seatsTakenRouter = require('./routes/seatsTakenRoute');
const auditoriumsPartsRouter = require('./routes/auditoriumsPartsRoute');

// const passswordsRouter = require('./Routes/passwordsRoutes');
// const loginRouter = require('./Routes/loginRoutes');
// const registerRouter=require('./Routes/registerRoutes')

const logger = (req, res, next) => {
    const url = req.url;
    const date = new Date();
    const msg = `Date: ${date}, Url:${url} \n`;
    fs.appendFile(path.join(__dirname, 'log.txt'), msg, () => {
        console.log('success!!');
        next();
    });
}

app.use(logger);
app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/seatsView',seatsViewRouter);
app.use('/seatsTaken',seatsTakenRouter)
app.use('/auditoriumsParts',auditoriumsPartsRouter)
app.use('/login', loginRouter);
 app.use('/signup',signUpRouter);
// app.use(cookieParser());
// app.use('/', express.static(path.join(__dirname, '/public')));

// app.use('/', require('./routes/root'));

// app.use('/logout', require('./routes/logout'));


// app.use('/passwords', passswordsRouter);
// app.use('/logIn',loginRouter);


// app.use('*', (req, res)=>{
//     res.sendStatus(404);
// })

app.listen(3300, () => {
    console.log(`app is listening on port ${3300}`)
})
