const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc modifies access to a process
 * @memberof nexus.process.access
 * @function modify
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {string} params.params.newGroup
 * @param {string} params.params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, userId, newGroup }) => API.patch(
    'process', `${processId}/access/${userId}`,
    { body: { newGroup }, ...DEFAULT_REQ_OPTS },
  ),
)
