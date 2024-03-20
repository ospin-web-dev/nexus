const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc dispatches a command to end a process on the device
 * @memberof nexus.command.device.process
 * @function end
 * @async
 * @param {string} deviceId
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, processId) => API.post(
    'command',
    `devices/${deviceId}/processes/${processId}/end-process`,
    { body: {}, ...DEFAULT_REQ_OPTS },
  ),
)
