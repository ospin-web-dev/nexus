const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a UI config for a user
 * @memberof nexus.uIConfig.userUIConfig
 * @function post
 * @async
 * @param {string} userId
 * @param {object} body
 * @returns {Promise<ApiResponse>}
*/

module.exports = serializeAxiosResponse(
  (userId, body) => API.post(
    'uiconfig',
    `users/${userId}`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
