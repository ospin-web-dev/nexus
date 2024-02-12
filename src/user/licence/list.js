const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc lists all licences
 * @memberof nexus.user.licence
 * @function list
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId }) => API.get('user', `${userId}/licences`, DEFAULT_REQ_OPTS),
)
