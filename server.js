// NODE SETUP

const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const csv = require('csvtojson')

const app = express()
const port = 3000

app.use(express.static('client'))

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/save', urlencodedParser ,(req, res) => {
    console.log(req.body)
    let name = req.body.jmeno
    let points = req.body.body
    let humanMade = req.body.human
    let date = new Date()
    console.log(name, points, humanMade)
    let celek = `${name};${points};${humanMade}\n`
    fs.appendFile('./data/stats.csv', celek, (err) => {
        if (err) {
            console.log("Error in editing file !!!")
            return
        }
        
    })
    res.redirect(301,'/')
})

app.listen(port, () => {
    console.log("Port "+port)
})