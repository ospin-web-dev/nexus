const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc adds a user notification to all users
 * @memberof nexus.user.notifications
 * @function putAll
 * @async
 * @param {Object} params
 * @param {string} params.originId
 * @param {string} params.sourceName
 * @param {string} params.sourceType
 * @param {string} params.topic
 * @param {string} params.message
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(({
  originId,
  sourceName,
  sourceType,
  topic,
  message,
}) => API.put(
  'user',
  'notifications',
  {
    body: {
      originId,
      sourceName,
      sourceType,
      topic,
      message,
    },
    ...DEFAULT_REQ_OPTS,
  },
))
