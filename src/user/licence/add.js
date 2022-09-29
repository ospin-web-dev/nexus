const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc claims a licence for a device
 * @memberof nexus.user.licence
 * @function add
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @param {Object} params.params
 * @param {string} params.params.key
 * @param {string} params.params.deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId, params }) => API.post('user', `${userId}/licences`, { body: params, ...DEFAULT_REQ_OPTS }),
)
