const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc queries the logs of a device
 * @memberof nexus.log
 * @function listSubjects
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => API.get('log', 'subjects', { ...DEFAULT_REQ_OPTS }),
)
