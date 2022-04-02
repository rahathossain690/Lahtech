
/**
 * 
 * 1. signup
 * 2. signin
 * 
 */

const {User} = require('../../models')
const api_response = require('../../api_response')


const signup = async (infodata) => {
    try{

        console.log(infodata)

        throw Error("Haha")
        

    } catch(err) {
        return {
            failed: true,
            status: api_response.STATUS.BAD_REQUEST,
            message: "Error occured"
        }
    }
}

module.exports = {

    signup: async (req, res) => {
        const result = await signup(req.body);
        if(result.failed) {
            res.status(result.status).send(api_response.FAILURE(result.message))
        } else {
            res.send(api_response.SUCCESS(result.user))
        }
    }

}