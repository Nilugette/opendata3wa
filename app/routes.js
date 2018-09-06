const User = require('../models/User.model.js')

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index')
    })

    app.get('/login', function (req, res) {
        req.flash('danger', 'Oops erreur fatale')
        res.render('login')
    })  

    app.get('/register', function (req, res) {
        res.render('register')
    }) 

    app.post('/register', function (req, res) {
        // insérer en base les données transmises
        User.signup(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.password_confirmation)
            .then(() => {
                req.flash('success', 'Inscription réussie ! Vous pouvez maintenant vous connecter')
                res.redirect('/')
            })
            .catch(errors => {
                res.render('register', { errors, user: req.body })
            })
    })
}
