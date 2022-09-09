const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc transfers the ownership of a device to another device user
 * @memberof nexus.device
 * @function transforOwnership
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params.params
 * @param {string} params.params.newOwnerId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .put('device', `${deviceId}/transfer-ownership`, { body: params, ...DEFAULT_REQ_OPTS }),
)
