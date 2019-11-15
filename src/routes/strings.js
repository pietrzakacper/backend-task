const express = require('express')
const path = require('path')
const { execFile } = require('child_process')
const { APP_ROOT } = require('../utils/constants')

const pipeDataFromProc = (process, writeStream) => new Promise((res, rej) => {
    process.stdout.on('data', chunk => writeStream.write(chunk))
    process.on('exit', res)
    process.on('error', rej)
})

const scriptPath = path.join(APP_ROOT, 'data/scripts/strings.js')

async function strings(req, res) {
    try {
        let processData
        try {
            processData = JSON.parse(req.get('X-JSON-Data'))
        } catch (e) {
            console.error(e)
            return res.sendStatus(400)
        }

        if(!processData || !processData['param']) {
            return res.sendStatus(400)
        }

        const { param } = processData
        const process = execFile(scriptPath, [param], { maxBuffer: 20 * 1024 * 1024 })

        res.set('Content-Type', 'text/plain')
        res.status(200)

        await pipeDataFromProc(process, res)

        res.end()
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/strings', strings)

module.exports = router
