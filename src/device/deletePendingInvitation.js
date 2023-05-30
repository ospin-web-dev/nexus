const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc retract user pending invitation
 * @memberof nexus.device
 * @function retract
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params
 * @param {string} params.invitationId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, invitationId }) => API
    .del('device', `${deviceId}/user-invitation/${invitationId}`, { ...DEFAULT_REQ_OPTS }),
)
