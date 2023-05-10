const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc returns a UI config for a user
 * @memberof nexus.uIConfig.userUIConfig
 * @function post
 * @async
 * @param {object} params
 * @param {string} params.userId
 * @param {object} params.devices
 * @return {Promise<ApiResponse}
*/

module.exports = serializeAxiosResponse(
  ({ userId, devices }) => API.post(
    'useruiconfig',
    `users/${userId}/uiconfig`,
    { devices, ...DEFAULT_REQ_OPTS}, // ?? to do check
  ),
)
