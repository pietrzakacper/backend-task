const express = require('express')
const { loadFromProjRootSync } = require('../utils/loadFile')

const jsonAObj = JSON.parse(loadFromProjRootSync('data/files/json-a.json'))

function jsonA(req, res) {
    res.json(jsonAObj['data'])
}

const router = express.Router()
router.get('/json-a', jsonA)

module.exports = router
