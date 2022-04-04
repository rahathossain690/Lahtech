
/**
 * 
 * 1. signup
 * 2. signin
 * 
 */

const {User} = require('../../models')
const api_response = require('../../api_response')
const securityService = require('../../service/security')
const mailService = require('../../service/mail')


const normalizeUserObject = (user, needPasswordHash=false) => {
    try{
        if(!needPasswordHash) {
            delete user.password_hash
            delete user.dataValues.password_hash
        }
    } catch(err){

    }
    return user
}


const signup = async (data) => {
    try{
        // TODO: Validatoin
        data.password_hash = securityService.hashPassword(data.password)
        delete data.password

        const user = normalizeUserObject( await User.create(data) )

        const mailText = `Click this link to verify: http://localhost:3000/user/verify-email?token=${securityService.generateToken(data.email, true)}`;
        if((process.env.NODE_ENV || "development") == "development") {
            const mailLink = await mailService.sendMail(data.email, "Confirm email", mailText);
            return {user, mailLink};
        } else {
            mailService.sendMail(data.email, "Confirm email", mailText);
            return {user,};
        }

    } catch(err) {
        return {
            failed: true,
            status: api_response.STATUS.BAD_REQUEST,
            message: err.message
        }
    }
}

const signin = async (data) => {
    try{
        // TODO: Validation
        const user = normalizeUserObject( await User.findOne({
            where: {
                email: data.email
            },
            raw: true
        }), true)
        
        if(!user) throw Error("User not found")

        if (!securityService.comparePassword(user.password_hash, data.password)) {
            throw Error("Password does not match")
        }
        if(!user.is_verified) {
            throw Error("Email not verified yet")
        }
        const token = securityService.generateToken(user.email)
        return {token,}

    } catch(err) {
        return {
            failed: true,
            status: api_response.STATUS.BAD_REQUEST,
            message: err.message
        }
    }
}

const verifyEmail = async (data) => {
    try{
        // TODO: Validation
        data = securityService.verify(data.token, true);
        const user = normalizeUserObject( await User.findOne({
            where: {
                email: data.email
            },
            raw : true
        }) )
        if(!user) {
            throw Error("User not found")
        }
        const updateInfo = await User.update({is_verified: true},
            {
                where: {
                    email: data.email
                }
        })
        return {updateInfo,}

    } catch(err) {
        return {
            failed: true,
            status: api_response.STATUS.BAD_REQUEST,
            message: err.message
        }
    }
}

const forgotPassword = async (data) => {
    try{
        // TODO: Validation
        const user = normalizeUserObject( await User.findOne({
            where: {
                email: data.email
            }
        }))
        if(!user) throw Error("User not found")

        const mailText = `Click this link to confirm password: http://localhost:3000/user/confirm-forgot-password?token=${securityService.generateToken(data.email, true)}`;
        
        if((process.env.NODE_ENV || "development") == "development") {
            const mailLink = await mailService.sendMail(data.email, "Forgot password", mailText);
            return {mailLink};
        } else {
            mailService.sendMail(data.email, "Forgot passowrd", mailText);
            return {};
        }

    } catch(err) {
        return {
            failed: true,
            status: api_response.STATUS.BAD_REQUEST,
            message: err.message
        }
    }
}

const confirmForgotPassword = async (data) => {
    try{
        // TODO: Validation
        const {email} = securityService.verify(data.token, true);
        const user = normalizeUserObject( await User.findOne({
            where: {
                email: email
            },
            raw : true
        }) )
        if(!user) {
            throw Error("User not found")
        }
        const hashedPassword = securityService.hashPassword(data.password)
        const updateInfo = await User.update({password_hash: hashedPassword},
            {
                where: {
                    email: email
                }
        })
        return {updateInfo,}
    } catch(err) {
        return {
            failed: true,
            status: api_response.STATUS.BAD_REQUEST,
            message: err.message
        }
    }
}

module.exports = {

    signup: async (req, res) => {
        const result = await signup(req.body);
        if(result.failed) {
            res.status(result.status).send(api_response.FAILURE(result.message))
        } else {
            res.send(api_response.SUCCESS(result))
        }
    },

    signin: async (req, res) => {
        const result = await signin(req.body);
        if(result.failed) {
            res.status(result.status).send(api_response.FAILURE(result.message))
        } else {
            res.send(api_response.SUCCESS(result))
        }
    },

    verifyEmail: async(req, res) => {
        const result = await verifyEmail(req.query)
        if(result.failed) {
            res.status(result.status).send(api_response.FAILURE(result.message))
        } else {
            res.send(api_response.SUCCESS(result))
        }
    },

    forgotPassword: async (req, res) => {
        const result = await forgotPassword(req.body)
        if(result.failed) {
            res.status(result.status).send(api_response.FAILURE(result.message))
        } else {
            res.send(api_response.SUCCESS(result))
        }
    },

    confirmForgotPassword: async(req, res) => {
        const result = await confirmForgotPassword(req.body)
        if(result.failed) {
            res.status(result.status).send(api_response.FAILURE(result.message))
        } else {
            res.send(api_response.SUCCESS(result))
        }
    }
}