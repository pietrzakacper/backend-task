const express = require('express')
const path = require('path')
const { APP_ROOT } = require('../utils/constants')

const filesDirPath = path.join(APP_ROOT, 'data/files')

async function file(req, res) {
    try {
        const { name } = req.query

        if(!name) {
            return res.sendStatus(400)
        }

        const filePath = path.join(filesDirPath, name)
        res.sendFile(filePath, { headers: {
            'Content-Type': 'text/plain'
        }})
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/file', file)

module.exports = router
