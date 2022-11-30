// npm i jsonwebtoken

const BaseRoute = require('../routes/base/baseRoute')
const Boom = require('boom')
const jwt = require('jsonwebtoken');
const PasswordHelper = require('./../helpers/passwordHelper')

const SIMULAR_USER = {
    username: 'Vasco',
    password: '1898'
}

class AuthRoutes extends BaseRoute {

    constructor(secret, db) {
        super()
        this.secret = secret
        this.db = db
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            handler: async (request) => {
                const { username, password } = request.payload
                const [usuario] = await this.db.read({
                    username: username.toLowerCase()
                })

                if (!usuario) return Boom.unauthorized('O usuário informado não existe.')
                const match = await PasswordHelper.compareAsync(password, usuario.password)
                if (!match) return Boom.unauthorized('O usuário ou senha estão incorretos.')


                // if (username !== SIMULAR_USER.username || password !== SIMULAR_USER.password) {
                //     return Boom.unauthorized()
                // }

                const token = jwt.sign({
                    username: username,
                    id: 1
                }, this.secret)
                return { token }
            }
        }
    }


}

module.exports = AuthRoutes