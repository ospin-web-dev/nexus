const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc updates a sensor calibration
 * @memberof nexus.device.functionality.calibration
 * @function update
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.fctId
 * @param {string} params.slotName
 * @param {Object} params.params
 * @param {Object} params.params.offset
 * @param {Object} params.params.slope
 * @param {number} params.params.offset.value
 * @param {boolean} params.params.offset.locked
 * @param {number} params.params.slope.value
 * @param {boolean} params.params.slope.locked
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, fctId, slotName, params }) => API
    .post('device', `${deviceId}/functionalities/${fctId}/calibrations`, {
      body: {
        slotName,
        calibrationData: params,
      },
      ...DEFAULT_REQ_OPTS,
    }),
)
