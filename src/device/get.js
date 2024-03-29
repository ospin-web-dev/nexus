const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns a device
 * @memberof nexus.device
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId }) => API.get('device', `${deviceId}`, { ...DEFAULT_REQ_OPTS }),
)
