const express = require("express")
const router = express.Router()
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")


router.post("/register",async(req,res)=>{
    const {username,password} = req.body 
    const user=await userModel.findOne({
        username
    })    
    if(user){
        return res.status(409).json({
            message:"user already exist "
        })
    }
    const users=await userModel.create({
        username,password
    })
    const token = jwt.sign({
        id:users._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"User created Successfully",
        users

    })
})
router.get("/user", async (req, res) => {
    const token = req.cookies.token // Make sure this matches the name in res.cookie()

    if (!token) {
        return res.status(401).json({
            message: "unauthorized user"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const users = await userModel.findOne({
            _id: decode.id
        })

        return res.status(200).json({
            message: 'User data fetched successfully',
            users
        })

    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
})
router.post("/login",async(req,res)=>{
    const {username,password} = req.body
    const user = await userModel.findOne({
        username
    })
    if(!user){
        return res.status(401).json({
            message:"Invalid username "
        })
    }

    const isPasswordValid = user.password === password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password "
        })
    }
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token)

   res.status(200).json({
    message:"user login successfully ",
    user 
   })

})

router.get('/logout',(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"user Logout Sucessfully"
    })
})

module.exports = router