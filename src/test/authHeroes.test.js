const assert = require('assert')

const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schema/userSchema')
const UserSchema = require('./../db/strategies/postgres/schema/userSchema')

let app = {}
const MODELO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZhc2NvIiwiaWQiOjEsImlhdCI6MTY2OTUyMzcwMX0.8Cfn3611iyUYlYzn70Pzq1Cb_HAOFbbxQjFnyr0ggjI'

const USER = {
    username: 'Vasco',
    password: '1898'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$Y1u0xFyEtYpSl7IxL6YmgenNvNumtQIq6hNTZLzHXmYp0.HPJiVHa'
}

describe('Suite de testes de Autenticação', async function () {
    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await Postgres.connect
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        await postgres.update(null, USER_DB, true)

    });

    it('Deve obter um Token', async () => {
        const result = await app.inject({
            method: "POST",
            url: '/login',
            payload: {  // payload => body da requisição 
                username: 'Vasco',
                password: '1898'
            }
        });
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(
            dados.token.length && dados.token.length === MODELO_TOKEN.length,
            console.log('Token criado de acordo com os padrões')
        )
    })
})