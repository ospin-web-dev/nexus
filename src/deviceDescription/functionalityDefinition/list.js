const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../../utils/objUtils')

/**
 * @desc fetches a list of functionality definitions
 * @memberof nexus.deviceDescription.functionalityDefinition
 * @function list
 * @param {Object} queryStringParameters
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get(
    'device-description',
    'functionality-definitions',
    {
      queryStringParameters: removeUndefinedKeys(queryStringParameters),
      ...DEFAULT_REQ_OPTS,
    },
  ),
)
