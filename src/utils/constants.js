const fs = require('fs')
const path = require('path')

// Note that if the location of this file in the src tree changes, APP_ROOT needs to be adjusted as well
const APP_ROOT = path.join(__dirname, '../..')

module.exports.APP_ROOT = APP_ROOT

module.exports.PORT = (() => {
    const portFilePath =  path.join(APP_ROOT, 'data/port.txt')
    const defaultPort = 3456

    try {
        const portFileContent = fs.readFileSync(portFilePath)
        const port = parseInt(portFileContent)

        if(Number.isNaN(port)) {
            console.info(`Contents of portFile is not a number, portFileContent: "${portFileContent}". Using default port.`)
            return defaultPort
        }

        return port
    } catch(e) {
        return defaultPort
    }
})()