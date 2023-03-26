import { StatusCodes } from "http-status-codes"
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const defaultError = {
        statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
        msg : 'Something to wrong, try again latter',         
    }

    res.status(defaultError.statusCode).json({msg:err})
}

export default errorHandlerMiddleware