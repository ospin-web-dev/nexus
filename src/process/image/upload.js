const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
/**
 * Uploads a process image, the image needs to be encoded in base64
 * requires the image to be encoded in base64
 * and the file type as string
 * @param {string} ProcessId @param {string} FunctionalityID @param {object} ImageData
 * @example {imageData: ****, fileType: 'jpeg'}
 * @memberof Image
 * @return {promise} Promise
 */
module.exports = serializeAxiosResponse(
  (processId, functionalityId, params) => Amplify.API.post(
    'process', `${processId}/functionalities/${functionalityId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
