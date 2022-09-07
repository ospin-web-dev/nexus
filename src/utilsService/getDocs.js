const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns the documentation of the OSPIN HTTP and MQTT API
 * @memberof nexus.utils
 * @function getDocs
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => API.get('utils', 'documentation', { ...DEFAULT_REQ_OPTS }),
)
