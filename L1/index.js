const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', function (req, res, next) {
    // res.send('Welcome to ExpressJS')
    fs.writeFile('/inaccessible-path', 'data', next)
}, function (req, res) {
    res.send('OK')
})

app.get('/test', function (req, res) {
    res.send('OKEY')
})

app.get('/error', function (err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    res.status(500)
    res.render('error', { error: err })
})

app.get('/timeout', function (req, res, next) {
    setTimeout(function () {
        try {
            throw new Error('BROKEN')
        } catch (err) {
            next(err)
        }
    }, 3000)
})

app.get('/overhead', function (req, res, next) {
    Promise.resolve().then(function () {
        throw new Error('BROKEN')
    }).catch(next)
})

app.listen(3000)