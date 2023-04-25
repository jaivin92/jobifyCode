import { UnAuthenticatedError } from "../error/index.js";


const checkPermissions = (reqestUser, resourceUser) => {
    if(reqestUser===resourceUser.toString()) return

    throw new UnAuthenticatedError(" Not Authorized to access to this route")
};

export default checkPermissions;