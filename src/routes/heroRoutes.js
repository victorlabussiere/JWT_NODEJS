const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this._db = db
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            handler: async req => {
                try {
                    const { name, poder } = req.payload
                    const result = await this._db.create({ name, poder })
                    return {
                        message: "Heroi cadastrado com sucesso",
                        result
                    }
                } catch (erroPost) {
                    console.error('ERRO POST', erroPost)
                }
            }
        }
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: async (request) => {
                let { name, skip, limit } = request.query
                try {
                    if ((skip && isNaN(skip)) || (limit && isNaN(limit))) throw new Error()
                    return await this._db.read(name, +skip, +limit)
                        .then(res => {
                            let newRes = []
                            if (skip == undefined) skip = 0
                            if (limit == undefined) limit = res.length
                            if (!name) {
                                newRes.push(...res)
                                newRes.length = limit
                                return [...newRes]
                            } else {
                                newRes.push(res)
                                newRes.length = limit
                                return [...newRes]
                            }
                        })
                } catch (eListing) {
                    throw Error('Erro -> method heroRoutes - LIST')
                }
            }

        }
    }


    update() {
        return {
            path: '/herois/{_id}',
            method: 'PATCH',
            handler: async req => {
                try {
                    const id = req.params
                    const { payload } = req
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)
                    const result = await this._db.update(id, dados)

                    return {
                        result,
                        message: 'Heroi atualizado com sucesso'
                    }

                } catch (e) {
                    return console.error('ERRO PATCH', e.message)
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{_id}',
            method: 'DELETE',
            handler: async req => {
                try {
                    const id = req.params
                    const { payload } = req
                    const result = await this._db.delete(id)

                    return {
                        result,
                        message: 'Heroi deletado com sucesso'
                    }

                } catch (e) {
                    return console.error('ERRO PATCH', e.message)
                }
            }
        }
    }
}

module.exports = HeroRoutes