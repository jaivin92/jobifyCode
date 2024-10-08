import {readFile } from 'fs/promises'
import dotenv from 'dotenv'

dotenv.config()


import connectDB from './db/connect.js'

import Job from './model/Job.js'


const  start = async () => {
    try {
      await connectDB(process.env.MONGO_URL)  
      await Job.deleteMany()

      const jsonProducts = JSON.parse( await readFile( new URL('./mock-data.json', import.meta.url)) )

      await Job.create(jsonProducts)
      console.log('Success!!!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()