// NODE SETUP

const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const csv = require('csvtojson')
const pug = require('pug')

const sortModule = require('./ownmodules/sortmodules.js')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('client'))

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.post('/save', urlencodedParser, (req, res) => {
    console.log(req.body)
    let name = req.body.jmeno || "Anonym"
    let points = req.body.body
    let humanMade = req.body.human
    let date = new Date()
    console.log(name, points, humanMade)
    let celek = `${name},${points},${humanMade}\n`
    fs.appendFile('./data/stats.csv', celek, (err) => {
        if (err) {
            console.log("Error in editing file !!!")
            return
        }

    })
    res.redirect(301, '/')
})

app.get('/scores', (req, res) => {
    let leaderboardsData
    csv().fromFile('./data/stats.csv')
        .then((data) => {
            leaderboardsData = data
            fs.readFile('./data/settings.json', (err, data) => {
                let text = JSON.parse(data)
                res.render('index.pug', {
                    'player': (text['sort'] == "byName") ? sortModule.sort.byAlphabetic(leaderboardsData, 'jmeno') : sortModule.sort.byIndex(leaderboardsData, 'body')
                })
            })
        })
        .catch((err) => {
            console.log("Error with reading file !!!")
            return
        })
})

app.get('/change', (req, res) => {
    console.log(req.body)
    fs.readFile('./data/settings.json', "utf8", (err, data) => {
        let text = JSON.parse(data)
        console.log(text['sort'])
        if (text['sort'] == "byName") fs.writeFile('./data/settings.json', JSON.stringify({ "sort": "byPoints" }), () => { })
        if (text['sort'] == "byPoints") fs.writeFile('./data/settings.json', JSON.stringify({ "sort": "byName" }), () => { })
        res.redirect(301, "/scores")
    })
})

app.post('/aaa', urlencodedParser, (req, res) => {
    fs.readFile('./data/settings.json', 'utf8', (err, data) => {
        console.log(data)
        let text = JSON.parse(data)
        if (text.sort == "byName") fs.writeFile('./data/settings.json', JSON.stringify({ 'sort': 'byPoints' }), (err, data) => {
            console.log("Done.")
            res.redirect(301, "/scores")
        })
        if (text.sort == "byPoints") fs.writeFile('./data/settings.json', JSON.stringify({ 'sort': 'byName' }), (err, data) => {
            console.log("Done.")
            res.redirect(301, "/scores")
        })
    })
})

app.listen(port, () => {
    console.log("Port " + port)
})

// const loadSettings = csv().fromFile('./data/settings.csv')
//     const loadData = csv().fromFile('./data/stats.csv')
//     Promise.all([
//         loadSettings,
//         loadData
//     ]).then((data) => {
//         res.render('index.pug', {'player': sortModule.sort.byAlphabetic(data[1], 'jmeno'), 'settings': data[0]})
//     })