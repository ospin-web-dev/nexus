const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc revokes access from a process
 * @memberof nexus.process.access
 * @function revoke
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {string} params.params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, userId }) => API.del(
    'process', `${processId}/access/${userId}`,
    DEFAULT_REQ_OPTS,
  ),
)
