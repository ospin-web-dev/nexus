const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc dispatches a command to update a running process on the device
 * @memberof nexus.command.device.process
 * @function updateRunning
 * @async
 * @param {string} deviceId
 * @param {string} processId
 * @param {Object} params
 * @param {number} params.entryPhaseId
 * @param {number} params.elapsedTime
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, processId, params) => API.post(
    'command',
    `devices/${deviceId}/processes/${processId}/update-running-process`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
