const {MongoClient} = require('mongodb')
const event = require('events')

class Database {

    constructor(uri, dbname, options) {
        if(!!Database.instance) {
            return Database.instance
        }
        Database.instance = this

        this.db = null
        this.dbName = dbname
        this.uri = uri

        this.connection = new event.EventEmitter()

        if(options) {
           this.options = options
           return this
        }

        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            reconnectTries: 1,
            reconnectInterval: 500
        }

        return this
    }

    async _createConnection() {
        const client = new MongoClient(this.uri, this.options)
        try{
            await client.connect()
            this.db = client.db(this.dbName)
        }catch(err){
            console.log(err)
        }
        
        client.on('close', () => {
            this.db = null
            this.connection.emit('close')
        })
    }

    async getConnection() {
        if(!this.db) await this._createConnection()
        return this.db
    }
}

module.exports = Database



