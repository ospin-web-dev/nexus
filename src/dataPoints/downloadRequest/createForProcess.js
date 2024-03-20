const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc requests a download of all sensor data of a process
 * @memberof nexus.dataPoints.downloadRequest
 * @function createForProcess
 * @async
 * @param {string} processId the id of the process
 * @param {object} the request body
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, body) => API
    .post('datapoints', `processes/${processId}/downloadrequests`, { body,...DEFAULT_REQ_OPTS }),
)
