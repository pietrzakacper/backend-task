const express = require('express')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { APP_ROOT } = require('../utils/constants')

const filesDirPath = path.join(APP_ROOT, 'data/files')

const getFilenamesInDir = promisify(fs.readdir)

async function filenames(req, res) {
    try {
        const filenamesArr = await getFilenamesInDir(filesDirPath)
        const jsonResponse = filenamesArr.map(filename => ({ name: filename }))

        res.json(jsonResponse)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/filenames', filenames)

module.exports = router
