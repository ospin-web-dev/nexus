const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates a new template
 * @memberof nexus.deviceDescription.template
 * @function create
 * @async
 * @param {Object} params
 * @param {string} [params.deviceId]
 * @param {Object} params.template
 * @param {string} params.template.name
 * @param {array} params.template.functionalities
 * @param {array} params.template.connections
 * @param {string} [params.template.imageURL]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  params => API.post('device-description', 'templates', { body: params, ...DEFAULT_REQ_OPTS }),
)
