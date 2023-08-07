const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns the xlsx file with metrics
 * @memberof nexus.utils
 * @function getMetrics
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => API.get('utils', 'metrics', { ...DEFAULT_REQ_OPTS }),
)
