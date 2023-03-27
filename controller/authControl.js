import User from "../model/User.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError} from "../error/index.js"

const register = async (req, res) =>{
    const { name, email, password } = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Please Provide all values')
    }

    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('User Already exists')
    }

     const user = await User.create({name, email,password})
     const token = user.createJWT()
     res.status(StatusCodes.OK).json({user:{
        email:user.email,
        lastname:user.lastName,
        location:user.location,
        name:user.name
     }, token, location:user.location})
   //res.status(500).json({msg:'server error'})
   // res.send('register user')
} 

const login = async (req, res) =>{
    console.log(process.env.MONGO_URL)
    //single find
    //const user = await User.findOne("test1@t.com")

    //const user = await User.db("users").json()

    const user = await User.db.collection('users').find({}).toArray()

   // res.send('login user')
   console.log(user);
   res.send({Msg : user})
} 

const update = (req, res) =>{
    res.send('update user')
    user.save()
} 

export {register, login,update}