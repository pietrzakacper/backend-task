const express = require('express')
const bodyParser = require('body-parser')
const DataController = require('../controllers/data')

const dataController = new DataController()

const parseJsonBody = (request, response) => new Promise((res, rej) =>
    bodyParser.json()(request, response,
        err => err ? rej(err) : res(request.body)
    )
)

async function putData(req, res) {
    let body
    try {
        body = await parseJsonBody(req, res)
    } catch (err) {
        console.error(`JSON parsing error: ${JSON.stringify(err)}`)
        return res.status(err.status || 400).json({ error: true })
    }

    try {
        await dataController.putData(req.params.id, body)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: true })
    }

    res.json({ ok: true })
}

async function getData(req, res) {
    try {
        const data = await dataController.getData(req.params.id)
        res.json(data)
    } catch (err) {
        console.error(err.message)
        res.status(400).json({ error: true })
    }
}

async function deleteData(req, res) {
    try {
        await dataController.deleteData(req.params.id)
        res.json({ ok: true })
    } catch (err) {
        console.error(err.message)
        res.status(400).json({ error: true })
    }
}

const router = express.Router()
router.put('/data/:id', putData)
router.get('/data/:id', getData)
router.delete('/data/:id', deleteData)

module.exports = router
