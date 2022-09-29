const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc dispatches a command to open an SSH session on the device
 * @memberof nexus.command.device
 * @function openSsh
 * @async
 * @param {string} deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  deviceId => API.post(
    'command',
    `devices/${deviceId}/open-ssh`,
    { body: {}, ...DEFAULT_REQ_OPTS },
  ),
)
