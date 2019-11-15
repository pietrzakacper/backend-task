const express = require('express')
const fetch = require('node-fetch')
const { PORT } = require('../utils/constants')

const serverUrl = `http://localhost:${PORT}`

const getFilenames = async () => {
    const filenamesResponse = await fetch(`${serverUrl}/filenames`)
    const filenamesJson = await filenamesResponse.json()

    const filenames = filenamesJson.map(({ name }) => name)

    return filenames
}

const getSizeForFilename = async (filename) => {
    const sizeResponse = await fetch(`${serverUrl}/size?name=${filename}`)
    const { size } = await sizeResponse.json()

    return size
}

async function sizes(req, res) {
    try {
        const filenames = await getFilenames()
        const jsonResponsePromised = filenames.map(async filename => ({
                name: filename,
                size: await getSizeForFilename(filename)
            }))
        const jsonResponse = await Promise.all(jsonResponsePromised)

        res.json(jsonResponse)
    } catch (e) {
        console.error(e.message)
        res.sendStatus(500)
    }
}

const router = express.Router()
router.get('/sizes', sizes)

module.exports = router
