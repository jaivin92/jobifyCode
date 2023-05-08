import { UnAuthenticatedError } from '../error/index.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const auth = async ( req, res, next) => {
    //const headers = req.headers
    const authHeader = req.headers.authorization
    //console.log('authenticate user')
    //console.log(headers)
    //console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError('Authenticated Invalid')
    }
    const token = authHeader.split(' ')[1]
    //console.log("*******  ", token)    
    //console.log("*******  ", process.env.JWT_SECRET, " *** " , process.env.JWT_LIFETIME)    
    const date = new Date();
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //const payload = jwt.verify(token, 'jwtSecret' )
        //console.log(payload)
        //console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        //console.log(payload);
        req.user = { userId: payload.userId}
        next()       
    } catch (error) {
        //console.log('error', error )
        throw new UnAuthenticatedError('Authenticated Invalid')
    }

 
}

export default auth