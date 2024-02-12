const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc revokes a user's access from the device
 * @memberof nexus.device.access
 * @function revoke
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params.params
 * @param {string} params.params.usedId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .del('device', `${deviceId}/access`, { body: params, ...DEFAULT_REQ_OPTS }),
)
