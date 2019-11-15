const express = require('express')

const { PORT } = require('./utils/constants')

const testRouter = require('./routes/test')
const fileARouter = require('./routes/file-a')
const jsonARouter = require('./routes/json-a')
const fileBRouter = require('./routes/file-b')
const jsonBRouter = require('./routes/json-b')
const fileRouter = require('./routes/file')
const sizeRouter = require('./routes/size')
const filenamesRouter = require('./routes/filenames')
const sizesRouter = require('./routes/sizes')
const txtRouter = require('./routes/txt')
const stringsRouter = require('./routes/strings')
const dataRouter = require('./routes/data')
const linkedCallbackRouter = require('./routes/linkedCallback')
const linkedPromiseRouter = require('./routes/linkedPromise')
const linkedAwaitRouter = require('./routes/linkedAwait')

class Server {
    constructor() {
        this.app = express()
        this.setupRouter()
    }
    setupRouter() {
        this.app.use(testRouter)
        this.app.use(fileARouter)
        this.app.use(jsonARouter)
        this.app.use(fileBRouter)
        this.app.use(jsonBRouter)
        this.app.use(fileRouter)
        this.app.use(sizeRouter)
        this.app.use(filenamesRouter)
        this.app.use(sizesRouter)
        this.app.use(txtRouter)
        this.app.use(stringsRouter)
        this.app.use(dataRouter)
        this.app.use(linkedCallbackRouter)
        this.app.use(linkedPromiseRouter)
        this.app.use(linkedAwaitRouter)
    }
    start() {
        this.app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
    }
}

module.exports = Server