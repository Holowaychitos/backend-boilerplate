const ObjectID = require('mongodb').ObjectID

const defaults = {}
const validModelName = new RegExp(/^[a-z\d\-_\-s.]+$/)

/**
 * Create DB conection
 * @class
 */
class DB {
  /**
   * Create database conection
   * @constructor
   * @param {object} conf - configuration preferens
   */
  constructor (conf) {
    this.conf = Object.assign({}, defaults, conf)
    this.database = {}
  }

  /**
   * Save collection object
   * @param {string} model - the model name
   * @param {object} conf - configuration preferens
   */
  save (model, data) {
    if (!validModelName.test(model)) throw Error('Invalid model name (please following this rule /^[a-z\d\-_\-s.]+$/)')
    let id = new ObjectID()
    this.database = Object.assign({}, this.database, {
      [model]: {
        [id]: Object.assign({}, data, {
          id: id,
          createAt: (new Date()).toISOString(),
          updateAt: (new Date()).toISOString()
        })
      }
    })
    return this.database[model][id]
  }

  /**
   * Updata collection object
   * @param {string} model - the model name
   * @param {objectId} id - objectId object
   * @param {object} data - new data
   */
  update (model, id, data) {
    if (!validModelName.test(model)) throw Error('Invalid model name (please following this rule /^[a-z\d\-_\-s.]+$/)')
    if (!ObjectID.isValid(id)) throw Error('Invalid id')
    delete data.id
    this.database[model][id] = Object.assign({}, this.database[model][id], data, {updateAt: (new Date()).toISOString()})
    return this.database[model][id]
  }

  /**
   * Delete collection object
   * @param {string} model - the model name
   * @param {objectId} id - objectId object
   */
  delete (model, id) {
    if (!validModelName.test(model)) throw Error('Invalid model name (please following this rule /^[a-z\d\-_\-s.]+$/)')
    if (!ObjectID.isValid(id)) throw Error('Invalid id')
    delete this.database[model][id]
    return true
  }

  /**
   * Find one collection object
   * @param {string} model - the model name
   * @param {object} query - the query params
   * @param {object} sort - the sort params
   */
  find (model, query, sort) {
    return this.database[model][query]
  }

  /**
   * Find all collection objects
   * @param {string} model - the model name
   * @param {object} query - the query params
   * @param {object} sort - the sort params
   */
  findAll (model, query, sort) {
    return [this.database[model]
  }

  /**
   * populate all collection objects
   * @param {string} model - the model name
   * @param {object} query - the query params
   * @param {object} sort - the sort params
   */
  populate (firstModel, secondModel, firstModelProp, secondModelProp) {
    if (!validModelName.test(firstModel)) throw Error('Invalid firs model name (please following this rule /^[a-z\d\-_\-s.]+$/)')
    if (!validModelName.test(secondModel)) throw Error('Invalid second model name (please following this rule /^[a-z\d\-_\-s.]+$/)')

    return Object.keys(this.database[firstModel]).map((id) => {
      let objA = Object.assign({}, this.database[firstModel][id])
      let idB = objA[firstModelProp]
      let objB = this.database[secondModel][idB]

      objA[firstModelProp] = objB

      return objA
    })
  }

  close () {
    this.database = {}
    return true
  }
}

module.exports = DB
