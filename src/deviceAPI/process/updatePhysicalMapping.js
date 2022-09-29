const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')
/**
 * synchronizes the ports for this process with the currently set ports on the device
 * @param processId the Id of the process to be updated
 * @async
 * @returns {Promise <object>} Promise resolving to a serialized process object
 */
module.exports = serializeAxiosResponse(
  processId => AuthorizedDeviceAPI.post(`processes/${processId}/physical-mappings`, { body: {}, ...DEFAULT_REQ_OPTS }),
)
