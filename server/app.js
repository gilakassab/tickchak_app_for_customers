const express = require('express');
// const config = require('./config/config');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();
app.use(express.json());
const cors = require('cors');
app.use(cors());


const eventRouter = require('./routes/eventsRoute');
// const passswordsRouter = require('./Routes/passwordsRoutes');
// const loginRouter = require('./Routes/loginRoutes');
// const registerRouter=require('./Routes/registerRoutes')




const logger = (req, res, next)=>{
    const url = req.url;
    const date = new Date();
    const msg = `Date: ${date}, Url:${url} \n`;
    fs.appendFile(path.join(__dirname, 'log.txt'), msg, ()=>{
        console.log('success!!');
        next();
    });

}
app.use(logger);
app.use('/events', eventRouter);
// app.use('/passwords', passswordsRouter);
// app.use('/logIn',loginRouter);
// app.use('/register',registerRouter);

// app.use('*', (req, res)=>{
//     res.sendStatus(404);
// })

app.listen(3300, ()=>{
    console.log(`app is listening on port ${3300}`)
})
