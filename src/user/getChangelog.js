const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc returns a web app changelog
 * @memberof nexus.user
 * @function getChangelog
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => API.get('user', 'changelog', DEFAULT_REQ_OPTS),
)
