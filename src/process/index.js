const access = require('./access')
const annotation = require('./annotation')
const clone = require('./clone')
const create = require('./create')
const deleteMany = require('./deleteMany')
const functionality = require('./functionality')
const physicalMapping = require('./physicalMapping')
const get = require('./get')
const list = require('./list')
const preview = require('./preview')
const snapshot = require('./snapshot')
const update = require('./update')

/**
 * @namespace nexus.process
 */

module.exports = {
  access,
  annotation,
  clone,
  create,
  list,
  get,
  deleteMany,
  functionality,
  physicalMapping,
  preview,
  snapshot,
  update,
}
