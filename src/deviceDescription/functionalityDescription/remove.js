const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc deletes a functionality description
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function remove
 * @async
 * @param {string} functionaltiyDescriptionId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  functionaltiyDescriptionId => API.del(
    'device-description',
    `functionality-descriptions/${functionaltiyDescriptionId}`,
    DEFAULT_REQ_OPTS,
  ),
)
