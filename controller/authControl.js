import User from "../model/User.js"
import { StatusCodes } from "http-status-codes"

const register = async (req, res) =>{
        const user = await User.create(req.body)
        res.status(StatusCodes.OK).json({user})
        //res.status(500).json({msg:'server error'})
   // res.send('register user')
} 

const login = async (req, res) =>{
    console.log(process.env.MONGO_URL)
    //single find
    //const user = await User.findOne("test1@t.com")

    //const user = await User.db("users").json()

    const user = await User.collection("users")

   // res.send('login user')
   res.send("Msg :"+ user)
} 

const update = (req, res) =>{
    res.send('update user')
} 

export {register, login,update}