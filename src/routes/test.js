const express = require('express')

function test(req, res) {
    res.json({ test: { ok: true } })
}

const router = express.Router()
router.get('/test', test)

module.exports = router
