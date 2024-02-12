const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a device's certificate
 * @memberof nexus.device.certificate
 * @function get
 * @async
 * @param {string} deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  deviceId => API.get('device', `${deviceId}/certificate`, { ...DEFAULT_REQ_OPTS }),
)
