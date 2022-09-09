const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc deletes a device (only in development environment)
 * @memberof nexus.device
 * @function remove
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId }) => API.del('device', `${deviceId}`, { ...DEFAULT_REQ_OPTS }),
)
