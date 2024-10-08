import { StatusCodes } from "http-status-codes"
import CustomApiError from "./custom-api.js"
class UnAuthenticatedError extends Error {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnAuthenticatedError