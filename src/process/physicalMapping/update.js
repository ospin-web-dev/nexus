const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * synchronizes the ports for this process with the currently set ports on the device
 * @param processId the Id of the process to be updated
 * @async
 * @returns {Promise<ApiResponse>}
 */
module.exports = serializeAxiosResponse(
  processId => API.post('process', `${processId}/physical-mappings`, { body: {}, ...DEFAULT_REQ_OPTS }),
)
