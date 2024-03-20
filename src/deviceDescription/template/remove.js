const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc deletes a template
 * @memberof nexus.deviceDescription.template
 * @function remove
 * @async
 * @param {string} templateId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  templateId => API.del('device-description', `templates/${templateId}`, DEFAULT_REQ_OPTS),
)
