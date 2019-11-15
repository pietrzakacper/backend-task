const fs = require('fs')
const path = require('path')
const { APP_ROOT } = require('./constants')
const util = require('util')

module.exports.loadFromProjRootSync = (pathFromProjRoot) => {
    try {
        const filePath = path.join(APP_ROOT, pathFromProjRoot)
        return fs.readFileSync(filePath)
    } catch (e) {
        throw new Error(`Couldn't load ${pathFromProjRoot}. ${e.message}`)
    }
}

const readFileAsync = util.promisify(fs.readFile)

module.exports.loadFromProjRootAsync = async (pathFromProjRoot) => {
    try {
        const filePath = path.join(APP_ROOT, pathFromProjRoot)
        return readFileAsync(filePath)
    } catch (e) {
        throw new Error(`Couldn't load ${pathFromProjRoot}. ${e.message}`)
    }
}