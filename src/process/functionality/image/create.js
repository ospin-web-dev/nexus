const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc creates a process image
 * @memberof nexus.process.functionality.image
 * @function create
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {Object} params.body
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, functionalityId, body) => API.post(
    'process', `${processId}/functionalities/${functionalityId}/images`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
