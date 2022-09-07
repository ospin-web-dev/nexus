const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a process preview (a small subset of process data)
 * @memberof nexus.process.preview
 * @function get
 * @async
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  processId => API.get('process', `${processId}/public`, DEFAULT_REQ_OPTS),
)
