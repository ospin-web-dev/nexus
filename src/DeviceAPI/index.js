const process = require('./process')
const AuthorizedDeviceAPI = require('./AuthorizedDeviceAPI')

module.exports = {
  setCredentials: AuthorizedDeviceAPI.setCredentials,
  process,
}
