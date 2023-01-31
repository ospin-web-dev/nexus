const configuration = require('./configuration')
const physicalMapping = require('./physicalMapping')
const ports = require('./ports')
const update = require('./update')
const functionalityConfiguration = require('./functionalityConfiguration')

/**
 * @namespace nexus.device.functionalityGraph
 */

module.exports = {
  update,
  ports,
  configuration,
  physicalMapping,
  functionalityConfiguration,
}
