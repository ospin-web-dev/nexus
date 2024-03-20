const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc deletes a sensor calibration
 * @memberof nexus.device.functionality.calibration
 * @function remove
 * @async
 * @param {string} deviceId
 * @param {string} fctGraphId
 * @param {string} fctId
 * @param {object} body
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (deviceId, fctGraphId, fctId, body) => API
    .patch(
      'device',
      `${deviceId}/configurations/${fctGraphId}/functionalities/${fctId}/calibrations`,
      { body, ...DEFAULT_REQ_OPTS },
    ),
)
