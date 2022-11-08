const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc updates a sensor calibration
 * @memberof nexus.device.functionality.calibration
 * @function update
 * @async
 * @param {string} deviceId
 * @param {string} fctGraphId
 * @param {string} fctId
 * @param {string} slotName
 * @param {Object} payload

 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, fctGraphId, fctId, body) => API
    .post('device', `${deviceId}/configurations/${fctGraphId}/functionalities/${fctId}/calibrations`, { body, ...DEFAULT_REQ_OPTS }),
)
