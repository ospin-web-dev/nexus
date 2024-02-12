const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc accepts the device invitation
 * @memberof nexus.user
 * @function acceptDeviceInvitation
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @param {Object} params.params
 * @param {string} params.params.invitationId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId, params }) => API.put(
    'user',
    `${userId}/access/device/accept`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
