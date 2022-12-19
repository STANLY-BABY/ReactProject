const { uploadFile } = require("../utils/s3");
// const {datas} = require('../models/user.model')
const User = require("../models/user.model");


module.exports = {
    home : async (req, res, next) => {
         res.send("home")
    },
    uploadFile :  async (req, res, next) => {
        try {
           console.log(req.params.id +'adsaf') 
           const id = req.params.id
           const { file } = req;
           console.log(file)
           const result = await uploadFile(file);
           console.log(result);
           return res.status(201).json({ status:true });
        } catch (error) {
            console.log(error)
        }
   },
   userDatas:async(req,res)=>{
    const user=req.user.email;
    const data =await User.findOne
        ({email:user}).then((data)=>{
            console.log(data,'fata');
            res.status(200).json(data)
        })
    console.log("uhuhuhuh",req.user.email);
   }
}