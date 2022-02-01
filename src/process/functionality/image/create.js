const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')
/**
 * Uploads a process image
 * requires the image to be encoded in base64
 * and the file type as string
 * @async
 * @param {string} ProcessId @param {string} FunctionalityId
 * @param {object} Body
 * @returns {Promise <object>} Promise resolving with the createdImageRef
 */
module.exports = serializeAxiosResponse(
  (processId, functionalityId, body) => API.post(
    'process', `${processId}/functionalities/${functionalityId}/images`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
