const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns a user
 * @memberof nexus.user
 * @function get
 * @async
 * @param {string} userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  userId => API.get('user', `${userId}`, DEFAULT_REQ_OPTS),
)
