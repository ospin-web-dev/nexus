const validateAuthorization = require('./validateAuthorization')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

/**
 * @namespace nexus.deviceAPI.authentication
 */

module.exports = {
  setCredentials: AuthorizedDeviceAPI.setCredentials,
  validateAuthorization,
}
