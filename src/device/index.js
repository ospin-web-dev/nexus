const access = require('./access')
const certificate = require('./certificate')
const create = require('./create')
const createHeidolphCoreGateway = require('./createHeidolphCoreGateway')

const functionality = require('./functionality')
const functionalityGraph = require('./functionalityGraph')
const get = require('./get')
const getUserInvitations = require('./getUserInvitations')
const list = require('./list')
const remove = require('./remove')
const deletePendingInvitation = require('./deletePendingInvitation')
const transferOwnership = require('./transferOwnership')
const update = require('./update')
const manufacturer = require('./manufacturer')
const validate = require('./validate')

/**
 * @namespace nexus.device
 */

module.exports = {
  access,
  certificate,
  create,
  createHeidolphCoreGateway,
  functionality,
  functionalityGraph,
  get,
  getUserInvitations,
  list,
  remove,
  deletePendingInvitation,
  transferOwnership,
  update,
  manufacturer,
  validate,
}
