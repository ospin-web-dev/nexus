const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc queries the data points of a sensor for a process
 * @memberof nexus.dataPoints
 * @function get
 * @async
 * @param {string} processId
 * @param {string} reporterFctId,
 * @param {Object} [params]
 * @param {number} [params.numberOfPoints],
 * @param {number} [params.start],
 * @param {number} [params.end],
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, reporterFctId, params) => API.get('datapoints', `processes/${processId}/functionalities/${reporterFctId}?numberOfPoints=${params.numberOfPoints}&start=${params.start}&end=${params.end}`, { ...DEFAULT_REQ_OPTS }),
)
