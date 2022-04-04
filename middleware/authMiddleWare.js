
const {User} = require('../models')
const securityService = require('../service/security')
const api_response = require('../api_response')

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

module.exports = async (req, res, next) => {
    try{
        const token = req.headers.token
        const email = securityService.verify(token).email
        req.user = normalizeUserObject( await User.findOne({
            where: {
                email: email
            },
            raw: true
        }) )
        next()
    } catch(err) {
        res.status(api_response.STATUS.FORBIDDEN).send(api_response.FAILURE(err))
    }
}