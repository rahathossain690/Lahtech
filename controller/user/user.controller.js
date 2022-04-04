const {User} = require('../../models')
const api_response = require('../../api_response')

module.exports = {
    getUser: async(req, res) => {
        res.send(req.user)
    }
}