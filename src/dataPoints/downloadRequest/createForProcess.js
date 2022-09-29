const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc requests a download of all sensor data of a process
 * @memberof nexus.dataPoints.downloadRequest
 * @function createForProcess
 * @async
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  processId => API
    .post('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS }),
)
