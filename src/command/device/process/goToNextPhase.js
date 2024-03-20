const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc dispatches a command to transition a process on the device into the next phase
 * @memberof nexus.command.device.process
 * @function goToNextPhase
 * @async
 * @param {string} deviceId
 * @param {string} processId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, processId) => API.post(
    'command',
    `devices/${deviceId}/processes/${processId}/next-phase`,
    { body: {}, ...DEFAULT_REQ_OPTS },
  ),
)
