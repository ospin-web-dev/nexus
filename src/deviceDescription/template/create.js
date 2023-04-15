const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates a new template
 * @memberof nexus.deviceDescription.template
 * @function create
 * @async
 * @param {Object} params
 * @param {string} params.name
 * @param {array} params.functionalities
 * @param {array} params.connections
 * @param {string} [params.deviceId]
 * @param {string} [params.imageURL]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (params) => API.post('device-description', 'templates', { body: params, ...DEFAULT_REQ_OPTS }),
)
