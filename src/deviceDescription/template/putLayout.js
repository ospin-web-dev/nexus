const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc adds or replaces a fct graph template layout used in the ultimate builder
 * @memberof nexus.deviceDescription.functionalityGraphTemplate
 * @function putLayout
 * @async
 * @param {string} templateId
 * @param {Object} body
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (templateId, body) => API.put(
    'device-description',
    `templates/${templateId}/layout`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
