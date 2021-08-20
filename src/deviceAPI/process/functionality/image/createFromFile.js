const fs = require('fs')
const serializeAxiosResponse = require('../../../../utils/serializeAxiosResponse')
const RegexUtils = require('../../../../utils/RegexUtils')
const { DEFAULT_REQ_OPTS } = require('../../../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../../../AuthorizedDeviceAPI')

function createDataUriFromFile(file) {
  if (!fs.existsSync(file)) {
    throw Error(`No file found at location ${file}`)
  }
  const fileExtensionRegexMatch = new RegExp(RegexUtils.FILE_EXTENSION).exec(file)
  const fileExtension = fileExtensionRegexMatch[fileExtensionRegexMatch.length - 1]
  const dataUri = `data:image/${fileExtension};base64,`.concat(fs.readFileSync(file, 'base64'))
  return dataUri
}

/**
 * Uploads a process image
 * @async
 * @param processId the process Id
 * @param functionalityId the process Id
 * @param body Object containing the image and metadata
 * @param body.pathToImage the absolute path to the image
 * @param body.imageCreatedAt the unix timestamp of the image creation
 * @example {
 * processId: 9588c1cc-9c39-4ddb-bb7d-bd3a2e9b26cf,
 * functionalityId:df78c050-4dc6-47d4-910e-812c175e05d9,
 * params: { pathToImage: './image.jpeg',imageCreatedAt: 13463458943  }
 * @returns {Promise <object>} Promise resolving with the createdImageRef
 */

module.exports = serializeAxiosResponse(
  (processId, functionalityId, body) => {
    const imageDataUri = createDataUriFromFile(body.pathToImage)
    return AuthorizedDeviceAPI.post(
      `/processes/${processId}/functionalities/${functionalityId}/images`,
      { body: {
        imageCreatedAt: body.imageCreatedAt,
        imageDataUri,
      },
      ...DEFAULT_REQ_OPTS },
    )
  },
)
