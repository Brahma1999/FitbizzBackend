const express=require('express');
const router=express.Router();
const {Users}=require('../db/models/users')
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');

//Signup
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.Password,10,(err,hash)=>{
        if(err){
            return res.json({success:false, message:"Hash Error"})
        }
        else{
            const newUser = new Users({
                Name: req.body.Name,
                Mobile: req.body.Mobile,
                Email: req.body.Email,
                Password: hash,
            });
            newUser.save()
            .then((_) => {
                res.json({success:true, message:"Account Has Been Created"});
            }).catch((err) => {
                if(err.code ===11000){
                    return res.json({success:false, message:"Email is Already Exist"}); 
                }
                res.json({success:false, message:"Authentication Failed"});
            })
        }
    })
})

//Login
router.post('/login',(req, res) => {
    Users.find({Email:req.body.Email}).exec().then((result)=>{
        if(result.length <1){
            return res.json({success:false, message:"user Not Found"}); 
        }
        const user=result[0];
        bcrypt.compare(req.body.Password,user.Password,(err,ret)=>{
            if(ret){

                const payload={
                    userId:user._id,
                }
                const token =jwt.sign(payload,"webBatch");
                return res.json({success:true,token:token, message:"Login Successful"});

            }else{
                return res.json({success:false, message:"Password Does not match"})
            }
        });
        
    }).catch(err=>{
        res.json({success:false, message:"Authentication Failed"});
    })
})

//API for Profile

router.get('/profile',checkAuth, (req,res)=>{
    const userId=req.userData.userId;
    Users.findById(userId).exec().then((result)=>{
        res.json({success:true,data:result});
    }).catch(err=>{
        res.json({success:false, message:"Server Error"});
    })
})


module.exports=router;