const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc authorizes a user for user pusher channels
 * @memberof nexus.user.pusher.subscriptions
 * @function authorizeMany
 * @async
 * @param {string} userId
 * @param {Object} params
 * @param {string} params.socketId
 * @param {Array<string>} params.channelNames
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (id, params) => API.post('user', `${id}/subscriptions`, { body: params, ...DEFAULT_REQ_OPTS }),
)
