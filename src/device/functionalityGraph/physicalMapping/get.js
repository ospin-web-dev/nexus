const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc returns all possible physical mappings for a functionality graph
 * @memberof nexus.device.functionalityGraph.physicalMapping
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.fctGraphId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, fctGraphId }) => API.get('device', `${deviceId}/functionality-graphs/${fctGraphId}/physical-mappings`, { ...DEFAULT_REQ_OPTS }),
)
