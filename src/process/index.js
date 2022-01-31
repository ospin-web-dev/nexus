const clone = require('./clone')
const create = require('./create')
const deleteMany = require('./deleteMany')
const functionality = require('./functionality')
const get = require('./get')
const grantAccess = require('./grantAccess')
const list = require('./list')
const modifyAccess = require('./modifyAccess')
const preview = require('./preview')
const revokeAccess = require('./revokeAccess')
const update = require('./update')

module.exports = {
  clone,
  create,
  list,
  get,
  deleteMany,
  grantAccess,
  functionality,
  modifyAccess,
  preview,
  revokeAccess,
  update,
}
