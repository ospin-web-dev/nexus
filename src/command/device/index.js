const process = require('./process')
const openSsh = require('./openSsh')
const updateFirmware = require('./updateFirmware')

/**
 * @namespace nexus.command.device
 */

module.exports = {
  process,
  openSsh,
  updateFirmware,
}
