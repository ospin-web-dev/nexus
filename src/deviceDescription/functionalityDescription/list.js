const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc fetches a list of functionality descriptions
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function list
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => API.get('device-description', 'functionality-descriptions', DEFAULT_REQ_OPTS),
)
