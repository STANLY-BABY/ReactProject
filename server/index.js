const express = require('express')
const app = express()
const mongoose= require('mongoose')
const cors= require('cors')
const auth = require('./controllers/auth')
const index = require('./controllers/index')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/MiniProject',(err)=>{
    if(err){
        console.log("erfxfcg vhbre",err);
    }else{
        console.log("db conected");
    }
})

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/movies/",
  filename: (req, file, cb) => {
    let adsfadsf = 'asdfasdf'
    console.log("file : ",file)
    req.imageName = `${req.user.email}.jpg`;
    cb(null, req.imageName);
  },
});

const upload = multer({
  storage: storage,
});

app.post('/api/register', auth.signup)
app.post('/api/login', auth.signin)
app.get('/', auth.verify, index.home)
app.get('/userdata',auth.verify,index.userDatas)

app.post('/', auth.verify, upload.single("image"), index.uploadFile)

app.listen(1337,()=>{
    console.log('started');
})