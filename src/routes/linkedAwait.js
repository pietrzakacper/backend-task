const express = require('express')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const getFilenamesInDir = promisify(fs.readdir)
const readFileAsync = promisify(fs.readFile)

const { APP_ROOT } = require('../utils/constants')

const linkedDirPath = path.join(APP_ROOT, 'data/linked')
const namesDirPath = path.join(linkedDirPath, 'names')
const valuesDirPath = path.join(linkedDirPath, 'values')

async function readDataEntry(filename) {
    const idFileContent = await readFileAsync(path.join(namesDirPath, filename))
    const id = parseInt(idFileContent.toString())
    const valueFileContent = await readFileAsync(path.join(valuesDirPath, `${id}.txt`))

    return {
        name: filename.replace('.txt', ''),
        value: valueFileContent.toString().trim(),
        id
    }
}

async function linkedAwait(req, res) {
    try {
        const filenames = await getFilenamesInDir(namesDirPath)
        const responseData = await Promise.all(filenames.map(readDataEntry))

        res.json(responseData)
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
}
const router = express.Router()
router.get('/linked/await', linkedAwait)

module.exports = router
