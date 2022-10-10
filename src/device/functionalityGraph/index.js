const configuration = require('./configuration')
const physicalMapping = require('./physicalMapping')
const ports = require('./ports')
const update = require('./update')

/**
 * @namespace nexus.device.functionalityGraph
 */

module.exports = {
  update,
  ports,
  configuration,
  physicalMapping,
}
