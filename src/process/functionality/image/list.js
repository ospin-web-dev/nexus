const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

/**
 * @desc queries process images
 * @memberof nexus.process.functionality.image
 * @function list
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {string} params.functionalityId
 * @param {Object} params.opts
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, functionalityId, opts) => API.get(
    'process', `${processId}/functionalities/${functionalityId}/images`,
    { ...opts, ...DEFAULT_REQ_OPTS },
  ),
)
