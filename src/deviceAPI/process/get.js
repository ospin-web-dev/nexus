const serializeAxiosResponse = require('utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')
/**
 * Fetches information for a specific process
 * @param processId the Id of the process to be fetched
 * @async
 * @returns {Promise <object>} Promise resolving to a serialized process object
 */
module.exports = serializeAxiosResponse(
  processId => AuthorizedDeviceAPI.get(`processes/${processId}`, { ...DEFAULT_REQ_OPTS }),
)
