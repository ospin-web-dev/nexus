const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc dispatches a command to resume a process on the device
 * @memberof nexus.command.device.process
 * @function resume
 * @async
 * @param {string} deviceId
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, processId) => API.post(
    'command',
    `devices/${deviceId}/processes/${processId}/resume-process`,
    { body: {}, ...DEFAULT_REQ_OPTS },
  ),
)
