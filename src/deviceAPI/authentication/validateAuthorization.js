const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
/**
 * Check if the device can authenticate with the given credentials
 * @async
 * @returns {Promise <object>} Promise resolving a serialized response
 */

module.exports = serializeAxiosResponse(
  () => AuthorizedDeviceAPI.get('validateAuthorization'),
)
