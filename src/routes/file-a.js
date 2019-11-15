const express = require('express')
const { loadFromProjRootSync } = require('../utils/loadFile')

const fileAContents = loadFromProjRootSync('data/files/file-a.txt')

function fileA(req, res) {
    res.send(fileAContents)
}

const router = express.Router()
router.get('/file-a', fileA)

module.exports = router
