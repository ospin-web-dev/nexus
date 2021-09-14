const { createDataUriFromFile } = require('../../../../utils/imageUtils')
const serializeAxiosResponse = require('../../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../../../AuthorizedDeviceAPI')

/**
 * Uploads a process image based given filen path
 * for information on the necessary
 * parameters check the api documentation in the readme *
 * @async
 * @param processId the process Id
 * @param streamId the stream Id
 * @param body Object containing the image and metadata
 * @param body.pathToImage the absolute path to the image
 * @param body.imageCreatedAt the unix timestamp of the image creation
 * @example {
 * processId: 9588c1cc-9c39-4ddb-bb7d-bd3a2e9b26cf,
 * streamId:1345526,
 * params: { pathToImage: './image.jpeg',imageCreatedAt: 13463458943  }
 * @returns {Promise <object>} Promise resolving with the createdImageRef
 */

module.exports = serializeAxiosResponse(
  (processId, streamId, body) => {
    const requestBody = {
      ...body,
      imageDataUri: createDataUriFromFile(body.pathToImage),
    }
    delete requestBody.pathToImage
    return AuthorizedDeviceAPI.post(
      `processes/${processId}/streams/${streamId}/images`,
      requestBody,
      DEFAULT_REQ_OPTS,
    )
  },
)
