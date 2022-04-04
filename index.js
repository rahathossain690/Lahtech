
const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

// TODO: CORS
// TODO: App limiter

const routes = require('./route')

app.use(express.json())
app.use(routes)

const database = require('./models')

database.sequelize.sync({alter: true}).then(async () => {
    console.log("Database connected")

    app.listen( process.env.PORT || 3000 , () => { 
        console.log(`server running`)
    })
})