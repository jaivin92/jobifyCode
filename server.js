//import cors from 'cors'
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
//error handle
import 'express-async-errors'
import morgan from 'morgan'
//db and auth
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobRoutes.js'
//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if(process.env.NODE_ENV !== "production"){
    app.use(morgan('dev'))
}

//app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
   // throw new Error('error')
    res.send({msg:'Welcome'})
})

app.get('/api', (req,res)=>{
    // throw new Error('error')
     res.send({msg:'api'})
 })

app.use('/api/auth',authRouter)
app.use('/api/job',authenticateUser, jobsRouter)
//app.use('/api/job', jobsRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000

// app.listen (port, ()=>{
//     console.log(`Server run on ${port}.... ${process.env.MONGO_URL}`  )
// })

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen (port, ()=>{
            console.log(`Server run on ${port}....${process.env.NODE_ENV}` )
        })
    } catch (error) {
        console.log(error)        
    }
}

start()