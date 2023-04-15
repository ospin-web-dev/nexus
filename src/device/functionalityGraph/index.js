const configuration = require('./configuration')
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
  functionalityConfiguration,
}
