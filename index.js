require('dotenv').config()
const express = require('express')
const flash = require('connect-flash');
const app = express()
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const isNotAdmin = true

app.set('view engine', 'pug')
app.set('views', './views')

//Les middlewares se placent avant les routes :
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: 'opendata3wa rocks',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(flash())
app.use((req, res, next) => {
    app.locals.flashMessages = req.flash()
    next()
})
app.use('/admin', (req, res, next) => {
    if(isNotAdmin) {
        req.flash('danger', 'accès interdit')
        return res.redirect('/')
    } else {
        next()
    }
})
//------------------------------------------
require ('./app/routes')(app)

const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}` ;

mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => {
        app.listen(8000, function () {
            console.log('Port 8000')
        })
    })


