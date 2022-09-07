const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns all pending user invitations
 * @memberof nexus.device
 * @function getUserInvitations
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId }) => API.get('device', `${deviceId}/user-invitations`, { ...DEFAULT_REQ_OPTS }),
)
