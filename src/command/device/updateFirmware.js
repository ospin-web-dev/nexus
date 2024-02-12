const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc dispatches a command to update the firmware on a device
 * @memberof nexus.command.device
 * @function updateFirmware
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.firmwareUpdateId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, firmwareUpdateId }) => API.post(
    'command',
    `devices/${deviceId}/update-firmware`,
    { body: { firmwareUpdateId }, ...DEFAULT_REQ_OPTS },
  ),
)
