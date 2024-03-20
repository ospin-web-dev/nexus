const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../../utils/objUtils')

/**
 * @desc fetches a list of templates
 * @memberof nexus.deviceDescription.template
 * @function list
 * @async
 * @param {object} [params]
 * @param {string} [params.deviceId]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId }) => API.get('device-description', 'templates', {
    queryStringParameters: removeUndefinedKeys({ deviceId }),
    ...DEFAULT_REQ_OPTS,
  }),
)
