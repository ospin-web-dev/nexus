const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns all snapshots of the process
 * @memberof nexus.process.snapshot
 * @function list
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId }) => API.get('process', `${processId}/snapshots`, DEFAULT_REQ_OPTS),
)
