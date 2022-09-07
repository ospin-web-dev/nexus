const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')

/**
 * @desc validates the authorization of a device
 * @memberof nexus.deviceAPI.authentication
 * @function validateAuthorization
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => AuthorizedDeviceAPI.get('validateAuthorization'),
)
