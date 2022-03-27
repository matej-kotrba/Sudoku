// NODE SETUP

const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const csv = require('csvtojson')
const pug = require('pug')

const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('client'))

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/save', urlencodedParser ,(req, res) => {
    console.log(req.body)
    let name = req.body.jmeno
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
    res.redirect(301,'/')
})

app.get('/scores', (req, res) => {
    csv().fromFile('./data/stats.csv')
    .then((data) => {
        // console.log(data)
        let array = data
        for (var i = 0; i < data.length; i++) {
            for (var k = 0; k < data.length-1-i;k++) {
                if (+array[k].body < +array[k+1].body) {
                    let a = array[k]
                    let b = array[k+1]
                    array[k] = b
                    array[k+1] = a
                }
            }
        }
        res.render('index.pug', {'player': array})
    })
    .catch((err) => {
        console.log("Error with reading file !!!")
    })
})

app.listen(port, () => {
    console.log("Port "+port)
})