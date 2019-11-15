const express = require('express')
const { loadFromProjRootAsync } = require('../utils/loadFile')

const fileBPath = 'data/files/file-b.txt'

async function fileB(req, res) {
    try {
        const fileBContents = await loadFromProjRootAsync(fileBPath)
        res.send(fileBContents)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/file-b', fileB)

module.exports = router
