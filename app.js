const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const port = 5000 || process.env.port;
const secret = 'responsive';
const app = express();

app.use(express.json())
app.use(cors());

const url = `mongodb+srv://youtube:youtube@cluster0.qx7kghf.mongodb.net/`;

mongoose.connect(url).then(() => console.log('connection to mongoDb success')).then(() => {
    app.listen(port, () => console.log(`server is up at port ${port}`))
}).catch(() => console.log(`connection to mongoDb Failed !`))

//CRUD Operations
app.use('/responsive', (req, res , next) => { // /responsive this is not url,  this is secret code.
    const token = req.headers.authorization;// if bearer in token before then (token = req.headers.authorization?.split("Bearer")[1];)
    if(token) {
        jwt.verify(token, secret , function(err, decoded) {
            if(err) {
                return res.status(403).json({
                    status: "Failed",
                    message: "Token is not Valid"
                })
            }
            req.user = decoded.data;
            next();
          });
    }else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})

app.use('/user', userRouter);
app.use('/post', postRouter);