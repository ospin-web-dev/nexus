const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc updates a template
 * @memberof nexus.deviceDescription.template
 * @function update
 * @async
 * @param {string} templateId
 * @param {Object} body
 * @param {Object} body.templateData
 * @param {string} [body.templateData.name]
 * @param {array} [body.templateData.functionalities]
 * @param {array} [body.templateData.connections]
 * @param {string} [body.templateData.deviceId]
 * @param {string} [body.templateData.imageURL]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (templateId, body) => API.put('device-description', `templates/${templateId}`, { body, ...DEFAULT_REQ_OPTS }),
)
