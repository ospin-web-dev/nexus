const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc updates a device's functionality configurations
 * @memberof nexus.device.functionalityGraphs.functionalityConfiguration
 * @function updateMany
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.fctGraphId
 * @param {Array} params.updates
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, fctGraphId, updates }) => API
    .patch('device', `${deviceId}/functionality-graphs/${fctGraphId}/configurations`, { body: { updates }, ...DEFAULT_REQ_OPTS }),
)
