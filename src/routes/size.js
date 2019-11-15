const express = require('express')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { APP_ROOT } = require('../utils/constants')

const filesDirPath = path.join(APP_ROOT, 'data/files')

const getFileStats = promisify(fs.stat)

async function size(req, res) {
    try {
        const { name } = req.query

        if(!name) {
            return res.sendStatus(400)
        }

        const filePath = path.join(filesDirPath, name)
        const { size } = await getFileStats(filePath)

        res.json({ size })
    } catch (e) {
        console.error(e.message)

        if(e.code === 'ENOENT') {
            return res.sendStatus(404)
        }
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/size', size)

module.exports = router
