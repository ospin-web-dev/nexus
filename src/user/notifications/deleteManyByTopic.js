const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc deletes all user notifications by topic
 * @memberof nexus.user.notifications
 * @function deleteManyByTopic
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.topic
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(({ userId, topic }) => API.del(
  'user',
  `${userId}/notifications/${topic}`,
  DEFAULT_REQ_OPTS,
))
