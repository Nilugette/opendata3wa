require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

require ('./app/routes')(app)

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}` ;

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => {
        app.listen(8000, function () {
            console.log('Port 8000')
        })
    })


