const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')
/**
 * Uploads a process image, the image needs to be encoded in base64
 * requires the image to be encoded in base64
 * and the file type as string
 * @param {string} ProcessId @param {string} FunctionalityID @param {object} Body
 * @example {imageData: ****, fileType: 'jpeg'}
 * @return {promise} Promise
 */
module.exports = serializeAxiosResponse(
  (processId, functionalityId, body) => Amplify.API.post(
    'process', `${processId}/functionality/${functionalityId}`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
