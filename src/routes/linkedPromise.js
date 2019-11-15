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

function linkedPromise(req, res) {
    getFilenamesInDir(namesDirPath)
        .then(filenames => {
            const responseDataPromised = filenames
                .map(filename => {
                    const dataEntry = { name: filename.replace('.txt', '') }
                    const idFileContentPromised = readFileAsync(path.join(namesDirPath, filename))

                    return idFileContentPromised.then(idFileContent => {
                        const id = parseInt(idFileContent.toString())
                        dataEntry.id = id

                        return readFileAsync(path.join(valuesDirPath, `${id}.txt`))
                    })
                    .then(valueFileContent => {
                        const value = valueFileContent.toString().trim()
                        dataEntry.value = value

                        return dataEntry
                    })
                })

            return Promise.all(responseDataPromised)
        })
        .then(responseData => {
            res.json(responseData)
        })
        .catch(err => {
            console.error(err.message)
            res.sendStatus(500)
        })
}
const router = express.Router()
router.get('/linked/promise', linkedPromise)

module.exports = router
