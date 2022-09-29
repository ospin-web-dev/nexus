const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc list all download request for a process
 * @memberof nexus.dataPoints.downloadRequest
 * @function list
 * @async
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  processId => API.get('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS }),
)
