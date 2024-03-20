const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc grants access to a process
 * @memberof nexus.process.access
 * @function grant
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {string} params.params.groupName
 * @param {string} params.params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, userId, groupName }) => API.put(
    'process', `${processId}/access/${userId}`,
    { body: { groupName }, ...DEFAULT_REQ_OPTS },
  ),
)
