const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc updates a template
 * @memberof nexus.deviceDescription.template
 * @function update
 * @async
 * @param {string} templateId
 * @param {Object} params
 * @param {string} params.name
 * @param {array} [params.functionalities]
 * @param {array} [params.connections]
 * @param {string} [params.deviceId]
 * @param {string} [params.imageURL]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (templateId, params) => API.put('device-description', `templates/${templateId}`, { body: params, ...DEFAULT_REQ_OPTS }),
)
