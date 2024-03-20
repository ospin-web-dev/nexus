const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates an user invitation for a device
 * @memberof nexus.device.access
 * @function grant
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params.params
 * @param {string} params.params.groupName
 * @param {string} params.params.hostName
 * @param {string} params.params.email
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .post('device', `${deviceId}/access`, { body: params, ...DEFAULT_REQ_OPTS }),
)
