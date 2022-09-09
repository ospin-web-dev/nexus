const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates or update a UI config for a user and functionality graph
 * @memberof nexus.uIConfig.userFctGraphUIConfig
 * @function put
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.fctGraphId
 * @param {Object} params.configs
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (userId, fctGraphId, configs) => API.put('uiconfig', `users/${userId}/functionality-graphs/${fctGraphId}`, { body: configs, ...DEFAULT_REQ_OPTS }),
)
