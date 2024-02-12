const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc clones a process
 * @memberof nexus.process
 * @function clone
 * @async
 * @param {string} processId
 * @param {Object} body
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, body) => API.post(
    'process', `${processId}/clones`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
