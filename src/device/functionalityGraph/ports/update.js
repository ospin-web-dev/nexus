const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')
/**
 * Changes the ports of the devices functionality
 * @param deviceId the Id of the device
 * @param fctGraphId the Id of the fctGraph to be updated
 * @param body the request body
 * @async
 * @returns {Promise <object>} Promise resolving to a serialized process object
 */
module.exports = serializeAxiosResponse(
  (deviceId, fctGraphId, body) => API
    .patch('device', `${deviceId}/functionality-graphs/${fctGraphId}/ports`, { body, ...DEFAULT_REQ_OPTS }),
)
