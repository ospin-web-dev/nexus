const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc returns all device types for a manufacturer
 * @memberof nexus.device.manufacturer.deviceType
 * @function list
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ manufacturerId }) => API.get('device', `manufacturers/${manufacturerId}/deviceTypes`, { ...DEFAULT_REQ_OPTS }),
)
