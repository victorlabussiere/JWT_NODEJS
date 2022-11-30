const assert = require('assert')

const PasswordHelper = require('../helpers/passwordHelper')
const api = require('./../api')

const SENHA = 'vitinho@123123'
const HASH = '$2b$04$.gKMUap8ntdjw0C0rWDXYu9ZfEJAHk7t5iHch6K1uO8o9doXFkCce'

describe('UserHelper test suite', function () {
    it('Deve gerar um hash a partir de uma senha ::::', async () => {
        const result = await PasswordHelper.hashPassowrd(SENHA)
        assert.ok(result.length === HASH.length)
    })

    it('Deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.compareAsync(SENHA, HASH)
        assert.ok(result === true)
    })
})