const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc requests the generation of a process report
 * @memberof nexus.process.report
 * @function create
 * @async
 * @param {string} processId the id of the process
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  processId => API.post('process', `${processId}/report-requests`, DEFAULT_REQ_OPTS),
)
