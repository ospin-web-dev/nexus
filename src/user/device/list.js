const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns all devices
 * @memberof nexus.user.device
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId, queryStringParameters }) => API.get('user', `${userId}/devices`, { queryStringParameters, ...DEFAULT_REQ_OPTS }),
)
