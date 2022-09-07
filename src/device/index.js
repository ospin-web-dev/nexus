const access = require('./access')
const certificate = require('./certificate')
const create = require('./create')
const createHeidolphCoreGateway = require('./createHeidolphCoreGateway')

const functionality = require('./functionality')
const functionalityGraph = require('./functionalityGraph')
const functionalityConfiguration = require('./functionalityConfiguration')
const get = require('./get')
const getUserInvitations = require('./getUserInvitations')
const list = require('./list')
const remove = require('./remove')
const transferOwnership = require('./transferOwnership')
const update = require('./update')
const manufacturer = require('./manufacturer')

module.exports = {
  access,
  certificate,
  create,
  createHeidolphCoreGateway,
  functionality,
  functionalityConfiguration,
  functionalityGraph,
  get,
  getUserInvitations,
  list,
  remove,
  transferOwnership,
  update,
  manufacturer,
}
