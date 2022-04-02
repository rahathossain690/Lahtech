
const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

// TODO: proxy
// TODO: App limiter

const database = require('./models')

database.sequelize.sync({alter: true}).then(async () => {
    console.log("Database connected")

    app.listen( process.env.PORT || 3000 , () => { 
        console.log(`server running`)
    })
})