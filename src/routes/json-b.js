const express = require('express')
const { loadFromProjRootAsync } = require('../utils/loadFile')

const jsonBFilePath = 'data/files/json-b.json'

async function jsonB(req, res) {
    try {
        const jsonBFileContents = await loadFromProjRootAsync(jsonBFilePath)
        const jsonBObj = JSON.parse(jsonBFileContents)
        res.json(jsonBObj['data'])
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/json-b', jsonB)

module.exports = router
