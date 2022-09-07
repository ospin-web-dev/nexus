const faker = require('faker')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const imageUtils = require('utils/imageUtils')
const setUpAuthenticatedDeviceAPI = require('../../../../../testHelpers/setUpAuthenticatedDeviceAPI')
const nexus = require('../../../../../..')

describe('create Process Functionality Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    setUpAuthenticatedDeviceAPI()
    jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation((args = {}) => args)
  })

  const processId = faker.datatype.uuid()
  const functionalityId = faker.datatype.uuid()
  const imageCreatedAt = Date.now(faker.date.recent())
  const pathToImage = './test/src/deviceAPI/process/functionality/image/image.jpeg'
  const body = {
    pathToImage,
    imageCreatedAt,
  }

  it('calls amplifys API.post with the expected args', async () => {
    await nexus.deviceAPI.process.functionality.image.createFromFile(
      processId, functionalityId, body,
    )

    expect(AuthenticatedDeviceAPI.post).toHaveBeenCalledWith(
      `processes/${processId}/functionalities/${functionalityId}/images`,
      {
        imageCreatedAt,
        imageDataUri: expect.anything(),
      },
      DEFAULT_REQ_OPTS,

    )
  })

  it('should show an error message when the file could not be found', async () => {
    await expect(nexus.deviceAPI.process.functionality.image.createFromFile(
      processId, functionalityId, { imageCreatedAt, pathToImage: 'notAFile.jpeg' }))
      .rejects.toThrow(`No file found at location ${'notAFile.jpeg'}`)
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      jest.spyOn(imageUtils, 'createDataUriFromFile').mockImplementation(() => 'some_uri')
      const resp = await nexus.deviceAPI.process.functionality.image.createFromURI(
        processId, functionalityId, body,
      )

      expect(resp).toStrictEqual(expect.objectContaining({
        data: 'success!',
        status: 200,
      }))
    })
  })

  describe('on failure', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    it('should throw an error', async () => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => { throw error })

      await expect(nexus.deviceAPI.process.functionality.image.createFromFile(processId, functionalityId, body))
        .rejects.toThrow(ERROR_TEXT)
    })
  })
})
