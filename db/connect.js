//const connectionString = 'mongodb+srv://testing:QX3zNqiknfqWhT72@demoapp.wlekrnt.mongodb.net/demoapp?retryWrites=true&w=majority'

import mongoose from "mongoose";

const connectDB = (url) => {
    //mongoose.model.
    return mongoose.connect(url)
    //return mongoose.createConnection()
}

export default connectDB