import express from 'express'

const router = express.Router()

import { register, login,update } from '../controller/authControl.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/update').patch(authenticateUser, update)
router.route('/test').get(login)

export default router