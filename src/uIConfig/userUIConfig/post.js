const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a UI config for a user
 * @memberof nexus.uIConfig.userUIConfig
 * @function post
 * @async
 * @param {string} userId
 * @param {object} payload
 * @returns {Promise<ApiResponse>}
*/

module.exports = serializeAxiosResponse(
  (userId, params) => API.post(
    'uiconfig',
    `users/${userId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
