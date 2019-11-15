
class DataController {
    constructor() {
        this.dataContainer = {} // DataContainer { [id: string]: any }
    }

    putData(id, data) {
        this.dataContainer[id] = data
    }

    getData(id) {
        const data = this.dataContainer[id]

        if(!data) {
            throw new Error(`Data does not exist for id: ${id}`)
        }

        return data
    }

    deleteData(id) {
        if(!this.dataContainer[id]) {
            throw new Error(`Data does not exist for id: ${id}`)
        }

        const didDelete = delete this.dataContainer[id]
        if(!didDelete) {
            throw new Error(`Couldn't delete data for id: ${id}`)
        }
    }
}

module.exports = DataController