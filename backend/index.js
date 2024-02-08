const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');


const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log("server started");
})