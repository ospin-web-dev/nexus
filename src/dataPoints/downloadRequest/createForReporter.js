const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc requests a download of the data of a single sensor
 * @memberof nexus.dataPoints.downloadRequest
 * @function createForReporter
 * @deprecated will be removed in favor of create process
 * @async
 * @param {string} processId
 * @param {string} reporterFctId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, reporterFctId) => API
    .post('datapoints', `processes/${processId}/functionalities/${reporterFctId}/downloadrequests`, { ...DEFAULT_REQ_OPTS }),
)
