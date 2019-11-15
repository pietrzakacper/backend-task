const DataController = require('./data')

describe('DataController', () => {
    test('should put, get and delete data', () => {
        const dataController = new DataController()
        const dataStored = { 'key': 'value' }
        const id = 1
        dataController.putData(id, dataStored)

        expect(dataController.getData(id)).toBe(dataStored)
        expect(() => dataController.deleteData(id)).not.toThrow()
    })

    test(`should throw when not existing data is requested`, () => {
        const dataController = new DataController()

        expect(() => dataController.getData(1, { 'key': 'value' })).toThrow()
    })

    test(`should throw when not existing data is deleted`, () => {
        const dataController = new DataController()

        expect(() => dataController.deleteData(1, { 'key': 'value' })).toThrow()
    })
})
