const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc modifies the user access on a device
 * @memberof nexus.device.access
 * @function modify
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params.params
 * @param {string} params.params.usedId
 * @param {string} params.params.newGroup
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .put('device', `${deviceId}/access`, { body: params, ...DEFAULT_REQ_OPTS }),
)
