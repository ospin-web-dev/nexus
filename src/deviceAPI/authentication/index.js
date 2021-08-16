const validateAuthorization = require('./validateAuthorization')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

module.exports = {
  setCredentials: AuthorizedDeviceAPI.setCredentials,
  validateAuthorization,
}
