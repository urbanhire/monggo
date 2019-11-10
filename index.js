const {MongoClient} = require('mongodb')
const event = require('events')

class Database {

    constructor() {
        if(!!Database.instance) {
            return Database.instance
        }
        Database.instance = this

        this.db = null
        this.host = null
        this.port = null
        this.dbName = null

        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            reconnectTries: 1,
            reconnectInterval: 500
        }

        this.connection = new event.EventEmitter()

        return this
    }

    setParam = (host, port, databaseName, options = this.options) => {
        this.host = host
        this.port = port
        this.dbName = databaseName
        this.options = options
    }

    _createConnection = async () => {
        const uri = `mongodb://${this.host}:${this.port}/${this.dbName}`
        const client = new MongoClient(uri, this.options)
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

    getConnection = async () => {
        if(!this.db) await this._createConnection()
        return this.db
    }
}

module.exports = Database



