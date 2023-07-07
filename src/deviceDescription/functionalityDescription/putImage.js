const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc adds or replaces a functionality description image
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function create
 * @async
 * @param {string} functionaltiyDescriptionId
 * @param {Object} body
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (fctDescriptionId, body) => API.put(
    'device-description',
    `functionality-descriptions/${fctDescriptionId}/image`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
