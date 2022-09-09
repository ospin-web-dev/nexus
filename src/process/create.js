const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc creates a process
 * @memberof nexus.process
 * @function create
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params.params
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API.post(
    'process', `?deviceId=${deviceId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
