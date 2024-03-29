const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc list all process report requests for a process
 * @memberof nexus.process.reports
 * @function list
 * @async
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  processId => API.get('process', `${processId}/report-requests`, { ...DEFAULT_REQ_OPTS }),
)
