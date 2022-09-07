const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates or updates a UI config a device
 * @memberof nexus.uIConfig
 * @function put
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.userId
 * @param {Object} params.params
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId, deviceId, params }) => API.put(
    'uiconfig',
    `users/${userId}/devices/${deviceId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
