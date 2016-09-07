const Koa = require('koa')
// const route = require('koa-route')
const co = require('co')
const store = require('./lib/db')
// const JSData = require('js-data')
// const DSMongoDBAdapter = require('js-data-mongodb')
// const store = new JSData.DS()
// const adapter = new DSMongoDBAdapter('mongodb://localhost:27017')
// store.registerAdapter('mongodb', adapter, { default: true })

const app = new Koa()3
// "store" will now use the MongoDB adapter for all async operations

const User = store.defineResource({
  // Resource name is required
  name: 'user',
  // Why couldn't Mongo just use "id"?
  idAttribute: '_id',
  // map this resource to a collection, default is Resource#name
  table: 'users'
})

store.create('user', { name: 'Ceji' })

User.findAll()
