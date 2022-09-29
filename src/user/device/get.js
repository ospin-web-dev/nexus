const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a device a user has access to
 * @memberof nexus.user
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, userId }) => API
    .get('user', `${userId}/devices/${deviceId}`, DEFAULT_REQ_OPTS),
)
