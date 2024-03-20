const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc gets the materliazed view of a sensor
 * @memberof nexus.dataPoints.materializedView
 * @function get
 * @async
 * @param {string} processId
 * @param {string} reporterFctId,
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, reporterFctId) => API.get('datapoints', `processes/${processId}/functionalities/${reporterFctId}/materialized-view`, DEFAULT_REQ_OPTS),
)
