const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc creates a device
 * @memberof nexus.device
 * @function create
 * @async
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.manufacturerDeviceTypeId
 * @param {boolean} [params.isVirtual]
 * @param {string} [params.ownerId]
 * @param {number} [params.featureVersion]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  params => API.post('device', '', { body: params, ...DEFAULT_REQ_OPTS }),
)
