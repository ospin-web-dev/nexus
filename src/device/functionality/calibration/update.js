const { API } = require('aws-amplify')

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
 * @param {Object} body

 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, fctGraphId, fctId, body) => API
    .post('device', `${deviceId}/configurations/${fctGraphId}/functionalities/${fctId}/calibrations`, { body, ...DEFAULT_REQ_OPTS }),
)
