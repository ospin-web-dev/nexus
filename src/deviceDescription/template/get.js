const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../../utils/objUtils')

/**
 * @desc fetches a template
 * @memberof nexus.deviceDescription.template
 * @function get
 * @async
 * @param {object} [params]
 * @param {string} [params.deviceId]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (templateId, { deviceId }) => API.get('device-description', `templates/${templateId}`, {
    queryStringParameters: removeUndefinedKeys({ deviceId }),
    ...DEFAULT_REQ_OPTS,
  }),
)
