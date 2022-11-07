const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc deletes a sensor calibration
 * @memberof nexus.device.functionality.calibration
 * @function remove
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.fctGraphId
 * @param {string} params.fctId
 * @param {string} params.slotName
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, fctGraphId, fctId, slotName }) => API
    .patch(
      'device',
      `${deviceId}/configurations/${fctGraphId}/functionalities/${fctId}/calibrations`,
      { body: { slotName }, ...DEFAULT_REQ_OPTS },
    ),
)
