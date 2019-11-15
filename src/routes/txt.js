const express = require('express')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { APP_ROOT } = require('../utils/constants')

const filesDirPath = path.join(APP_ROOT, 'data/files')

const getFilenamesInDir = promisify(fs.readdir)

const pipeData = (readStream, writeStream) => new Promise((res, rej) => {
    readStream.on('data', chunk => writeStream.write(chunk))
    readStream.on('close', res)
    readStream.on('error', rej)
})

async function txt(req, res) {
    try {
        const filenames = await getFilenamesInDir(filesDirPath)
        const txtFilenames = filenames.filter(filename => filename.endsWith('.txt'))
        const txtFilePaths = txtFilenames.map(filename => path.join(filesDirPath, filename))

        res.set('Content-Type', 'text/plain')
        res.status(200)

        for(const filePath of txtFilePaths) {
            const fileStream = fs.createReadStream(filePath)
            await pipeData(fileStream, res)
        }

        res.end()
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/txt', txt)

module.exports = router
