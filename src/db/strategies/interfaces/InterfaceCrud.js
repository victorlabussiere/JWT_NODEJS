class NotImplementedException extends Error {
    constructor() {
        super()
    }
}
class ICrud {
    static connect() {
        throw new NotImplementedException()
    }

    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
    isConnected() {
        throw new NotImplementedException()
    }
}
module.exports = ICrud