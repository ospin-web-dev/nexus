const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns all device invitations for a user
 * @memberof nexus.user
 * @function getDeviceInvitations
 * @async
 * @param {string} userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  id => API.get('user', `${id}/device-invitations`, DEFAULT_REQ_OPTS),
)
