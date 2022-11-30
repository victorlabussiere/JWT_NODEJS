// npm i bcrypt
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/herosSchema')

const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/schema/userSchema')

const Bcrypt = require('bcrypt')

const JWT_SECRET = 'MEU_SEGREDAO'
const app = new Hapi.Server({ port: 5000 }) // criação do servidor com hapi
const mapRoutes = (instance, methods) => methods.map(method => instance[method]())

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))
    const connectionPostgres = await Postgres.connect
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const ContextPostgres = new Context(new Postgres(connectionPostgres, model))

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, ContextPostgres), AuthRoute.methods())
    ])

    app.start()
        .then(console.log('Servidor rodando na porta ===>', app.info.port))
        .catch(startError => Error(startError.message))

    return app
}

module.exports = main()