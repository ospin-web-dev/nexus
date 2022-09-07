const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a subset of a user's data
 * @memberof nexus.user.preview
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId }) => API.get('user', `${userId}/public`, DEFAULT_REQ_OPTS),
)
