import test from 'ava'
import DB from './../lib/memory'

const db = new DB()

test.after.always('guaranteed cleanup', t => {
  db.close()
})

test('Create new Model', t => {
  let user = db.save('user', {name: 'iddar'})
  t.is(user.name, 'iddar', 'User name not found')
  t.true('createAt' in user)
})

test('Update model', t => {
  let user = db.save('user', {name: 'iddar'})
  t.is(user.name, 'iddar', 'User name not found')
  t.true('createAt' in user)
})
//
//
// let user = db.save('user', {name: 'iddar'})
// // console.warn(db.database)
//
// db.update('user', user.id, {name: 'Ceji'})
// // console.warn(db.database)
//
// let post = db.save('post', {owner: user.id, title: 'holo'})
// // console.warn(db.database)
//
// let populate = db.populate('post', 'user', 'owner', 'id')
// console.warn(populate)
