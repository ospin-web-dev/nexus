const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc retract pending user invitation
 * @memberof nexus.device
 * @function deletePendingInvitation
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params
 * @param {string} params.invitationId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, invitationId }) => API
    .del('device', `${deviceId}/user-invitations/${invitationId}`, { ...DEFAULT_REQ_OPTS }),
)
