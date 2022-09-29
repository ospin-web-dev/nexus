const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc updates a device's functionality configurations
 * @memberof nexus.device.functionalityConfiguration
 * @function updateMany
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Array} params.updates
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, updates }) => API
    .patch('device', `${deviceId}/functionalities-configurations`, { body: { updates }, ...DEFAULT_REQ_OPTS }),
)
