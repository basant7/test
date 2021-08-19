const { response } = require('express');
const express = require('express');
require('./connection')
const postuser= require('./routes/user')

const app = express();

app.use(express.json());

app.use(postuser);

app.get('/home', (req, res)=>{
    res.json({
        "message": "Welcome"
    });
});

app.listen(3000,()=>{
    console.log("Connected to port 3000")
});