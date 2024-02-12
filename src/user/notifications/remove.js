const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc removes a notification
 * @memberof nexus.user.notifications
 * @function remove
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.notificationId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(({ userId, notificationId }) => API.del(
  'user',
  `${userId}/notification/${notificationId}`,
  DEFAULT_REQ_OPTS,
))
