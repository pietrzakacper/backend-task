const express = require('express')
const path = require('path')
const fs = require('fs')
const domain = require('domain')

const { APP_ROOT } = require('../utils/constants')

const linkedDirPath = path.join(APP_ROOT, 'data/linked')
const namesDirPath = path.join(linkedDirPath, 'names')
const valuesDirPath = path.join(linkedDirPath, 'values')

function linkedCallback(req, res) {
    const d = domain.create()

    d.run(() => {
        fs.readdir(namesDirPath, (err, filenames) => {
            if(err) {
                throw err
            }

            // ResponseData { name: string, id: string, value: string }[]
            const responseData = []

            filenames.forEach(filename => {
                fs.readFile(path.join(namesDirPath, filename), (err, idFileContent) => {
                    if(err) {
                        throw err
                    }

                    const id = parseInt(idFileContent.toString())

                    fs.readFile(path.join(valuesDirPath, `${id}.txt`), (err, valueFileContent) => {
                        if(err) {
                            throw err
                        }

                        responseData.push({
                            name: filename.replace('.txt', ''),
                            value: valueFileContent.toString().trim(),
                            id,
                        })

                        if(responseData.length === filenames.length && !res.headersSent) {
                            res.json(responseData)
                        }
                    })
                })
            })
        })
    })

    d.on('error', (err) => {
        console.error(err.message)

        if(!res.headersSent) {
            res.sendStatus(500)
        }
    })

}
const router = express.Router()
router.get('/linked/callback', linkedCallback)

module.exports = router
