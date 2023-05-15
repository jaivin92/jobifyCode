import express from 'express'

const router = express.Router()

import rateLimiter from 'express-rate-limit'

const appLimit = rateLimiter({
    windowMs : 15*60*1000,  //15 minute
    max : 10,
    message : 'Too many request this IP address, please try again after 15 minute',
})

import { register, login,update } from '../controller/authControl.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post( appLimit,register)
router.route('/login').post(appLimit, login)
router.route('/update').patch(authenticateUser, update)
router.route('/test').get(login)

export default router