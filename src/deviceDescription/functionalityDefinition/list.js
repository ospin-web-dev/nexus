const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc fetches a list of functionality definitions
 * @memberof nexus.deviceDescription.functionalityDefinition
 * @function list
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => API.get('device-description', 'functionality-definitions', DEFAULT_REQ_OPTS),
)
