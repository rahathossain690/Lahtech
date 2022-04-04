
/**
 * 
 * 1. signup
 * 2. signin
 * 
 */

const {User} = require('../../models')
const api_response = require('../../api_response')
const securityService = require('../../service/security')


const normalizeUserObject = (user) => {
    try{
        delete user.password_hash
        delete user.dataValues.password_hash
    } catch(err){

    }
    return user
}


const signup = async (data) => {
    try{
        // TODO: Validatoin
        data.password_hash = securityService.hashPassword(data.password)
        delete data.password
        const user = await User.create(data)
        user = normalizeUserObject(user)
        // TODO: Send Email
        return {user,};

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
        const user = await User.findOne({
            where: {
                email: data.email
            },
            raw: true
        })
        user = normalizeUserObject(user)
        if (!securityService.comparePassword(user.password_hash, data.password)) {
            throw Error("Password does not match")
        }
        // TODO: Uncomment this
        // if(!user.is_verified) {
        //     throw Error("Email not verified yet")
        // }
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
        const email = securityService.verify(data).email
        const user = normalizeUserObject( await User.findOne({
            where: {
                email: email
            },
            raw : true
        }) )
        
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
    }

}