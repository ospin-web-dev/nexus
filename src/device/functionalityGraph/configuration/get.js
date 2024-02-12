const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc returns a device's functionality graph configurations
 * @memberof nexus.device.functionalityGraph.configuration
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.fctGraphId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, fctGraphId }) => API.get('device', `${deviceId}/functionality-graphs/${fctGraphId}/configurations`, { ...DEFAULT_REQ_OPTS }),
)
