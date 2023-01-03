const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns limited information to validate a device after installation
 * @memberof nexus.device
 * @function validate
 * @async
 * @param {string} deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  deviceId => API.get('device', `${deviceId}/validate`, { ...DEFAULT_REQ_OPTS }),
)
