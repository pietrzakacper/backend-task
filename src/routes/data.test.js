const dataRouter = require('./data')
const supertest = require('supertest')
const app = require('express')()

app.use(dataRouter)

const server = app.listen(3333)
const request = supertest(app)

let uniqueId = 1
describe('Endpoint /data/{id}', () => {
    afterEach(() => uniqueId += 1)
    afterAll(() => server.close())

    test('should put, get and delete data', async () => {
        const sentPayload = { key: uniqueId }
        const url = `/data/${uniqueId}`

        const resPut = await request.put(url).send(sentPayload)
        expect(resPut.status).toBe(200)
        expect(resPut.body).toEqual({ok: true})

        const resGet = await request.get(url)
        expect(resGet.status).toBe(200)
        expect(resGet.body).toEqual(sentPayload)

        const resDelete = await request.delete(url)
        expect(resDelete.status).toBe(200)
        expect(resDelete.body).toEqual({ok: true})
    })

    test('should respond with error when getting not existent data', async () => {
        const resGet = await request.get(`/data/${uniqueId}`)
        expect(resGet.status).toBe(400)
        expect(resGet.body).toEqual({error: true})
    })

    test('should respond with error when deleting not existent data', async () => {
        const resDelete = await request.delete(`/data/${uniqueId}`)
        expect(resDelete.status).toBe(400)
        expect(resDelete.body).toEqual({error: true})
    })
})
