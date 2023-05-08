import User from "../model/User.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError , UnAuthenticatedError} from "../error/index.js"

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
     res.status(StatusCodes.CREATED).json({user:{
        email:user.email,
        lastname:user.lastName,
        location:user.location,
        name:user.name
     }, token, location:user.location})
   //res.status(500).json({msg:'server error'})
   // res.send('register user')
} 

const login = async (req, res) =>{
    var { email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw  new UnAuthenticatedError('Not Registered With Email')
    }
    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Password')
    }
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).send({user, token, location:user.location})
} 

const update = async (req, res) =>{

    const {email,name, lastName, location} = req.body
    if(!email || !name || !lastName || !location){
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({_id:req.user.userId});

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save()

    const token = user.createJWT()
    
    //console.log(req.user)
    //res.send('updateUser')
    res.status(StatusCodes.OK).send({user, token, location:user.location})
} 

export {register, login,update}