const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates a process annotation
 * @memberof nexus.process.annotation
 * @function create
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {Object} params.data
 * @param {string} params.data.text
 * @param {number} params.data.userTimestamp
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, data }) => API.post('process', `${processId}/annotations`, { body: data, ...DEFAULT_REQ_OPTS }),
)
