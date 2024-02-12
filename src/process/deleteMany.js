const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc deletes mutliple processes
 * @memberof nexus.process
 * @function deleteMany
 * @async
 * @param {Array<string>} ids
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ids => API.patch('process', '', { body: { processesIds: ids }, ...DEFAULT_REQ_OPTS }),
)
