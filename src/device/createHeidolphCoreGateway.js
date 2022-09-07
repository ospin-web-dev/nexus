const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc creates a heidolph core gateway consisting of 6 individual devices
 * @memberof nexus.device
 * @function createHeidolphCoreGateway
 * @async
 * @param {Object} params
 * @param {string} params.baseName
 * @param {string} params.manufacturerDeviceTypeId
 * @param {boolean} [params.isVirtual]
 * @param {string} [params.ownerId]
 * @param {number} [params.featureVersion]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  params => API.post('device', 'heidolph-core-gateways', { body: params, ...DEFAULT_REQ_OPTS }),
)
