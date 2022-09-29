const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc updates a process
 * @memberof nexus.process
 * @function update
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {Object} params.params
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, params }) => API.patch('process', processId, { body: params, ...DEFAULT_REQ_OPTS }),
)
