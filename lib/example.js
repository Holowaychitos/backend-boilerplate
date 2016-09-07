const DB = require('./memory')

const db = new DB()

let user = db.save('user', {name: 'iddar'})
// console.warn(db.database)

db.update('user', user.id, {name: 'Ceji'})
// console.warn(db.database)

let post = db.save('post', {owner: user.id, title: 'holo'})
// console.warn(db.database)

let populate = db.populate('post', 'user', 'owner', 'id')
console.warn(populate)

// db.delete('user', user.id)
// console.warn(db.database)






// class CRUD {
//   constructor(db) {
//
//   }
// }
//
// class UserModel extends CRUD {
//   constructor() {
//     super()
//   }
// }
//
//
//
// const UserController = Restify(UserModel)
//
// router.get('/user', UserController.get)
// router.post('/user', UserController.post)
//
// app.use(router)
