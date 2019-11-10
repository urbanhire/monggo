<p align="center">
  <a href="" rel="noopener">
 <img width=200px src="https://winter-cdn.urbanhire.com/img/logo.svg" alt="Monggo"></a>
</p>

<h3 align="center">monggo</h3>
  <p align="center">A mongodb connection pooling wrapper of mongodb native drive.</p>
<div align="center">

</div>

---

### Installing

```
npm i monggo
```

## 🎈 Usage <a name="usage"></a>

```
var monggo = require('monggo')

const db = new monggo()
db.setParam('localhost', 27017, 'dbname')
const database = db.getConnection()

var collectionName = 'customers'
var customer = {
  name: 'Polan',
  address: 'Bintaro'
}

const r = database.collection(collectionName).insertOne(customer)
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database

## ✍️ Authors <a name = "authors"></a>

- [@gsoultan](https://github.com/gsoultan) - Idea & Initial work
