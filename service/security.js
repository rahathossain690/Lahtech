
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    
    hashPassword : (plainTextPassword) => {
        const saltRounds =  parseInt(process.env.saltRounds) || 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },

    comparePassword: (hashedPassword, plainTextPassword) => {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
    },

    generateToken: (email, forMail=false) => {
        return jwt.sign({
            email: email
          }, forMail ? process.env.JWT_EMAIL_SECRET: process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 }); // Week
    },

    verify: (encoded, email=false) => {
        return jwt.verify(encoded, forMail ? process.env.JWT_EMAIL_SECRET: process.env.JWT_SECRET)
    }

}