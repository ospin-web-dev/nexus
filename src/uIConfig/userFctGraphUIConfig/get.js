const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a UI config for a user and functionality graph
 * @memberof nexus.uIConfig.userFctGraphUIConfig
 * @function get
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.fctGraphId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId, fctGraphId }) => API.get(
    'uiconfig',
    `users/${userId}/functionality-graphs/${fctGraphId}`,
    DEFAULT_REQ_OPTS,
  ),
)
