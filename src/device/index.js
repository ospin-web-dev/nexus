const certificate = require('./certificate')
const create = require('./create')
const createHeidolphCoreGateway = require('./createHeidolphCoreGateway')

const functionality = require('./functionality')
const functionalityConfiguration = require('./functionalityConfiguration')
const get = require('./get')
const getUserInvitations = require('./getUserInvitations')
const grantAccess = require('./grantAccess')
const list = require('./list')
const modifyAccess = require('./modifyAccess')
const remove = require('./remove')
const revokeAccess = require('./revokeAccess')
const transferOwnership = require('./transferOwnership')
const update = require('./update')
const manufacturer = require('./manufacturer')

module.exports = {
  certificate,
  create,
  createHeidolphCoreGateway,
  functionality,
  functionalityConfiguration,
  get,
  getUserInvitations,
  grantAccess,
  list,
  modifyAccess,
  remove,
  revokeAccess,
  transferOwnership,
  update,
  manufacturer,
}
