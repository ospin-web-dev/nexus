const faker = require('faker')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const setUpAuthenticatedDeviceAPI = require('../../../../../testHelpers/setUpAuthenticatedDeviceAPI')
const nexus = require('../../../../../..')

describe('create Process Stream Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    setUpAuthenticatedDeviceAPI()
    jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(args => args)
  })

  const processId = faker.datatype.uuid()
  const streamId = 46197316
  const imageCreatedAt = Date.now(faker.date.recent())
  const pathToImage = './test/src/deviceAPI/process/stream/image/image.jpeg'
  const body = {
    pathToImage,
    imageCreatedAt,
  }

  it('calls amplifys API.post with the expected args', async () => {
    await nexus.deviceAPI.process.stream.image.createFromFile(
      processId, streamId, body,
    )

    expect(AuthenticatedDeviceAPI.post).toHaveBeenCalledWith(
      `processes/${processId}/streams/${streamId}/images`,
      {
        imageCreatedAt,
        imageDataUri: expect.anything(),
      },
      DEFAULT_REQ_OPTS,

    )
  })

  it('should show an error message when the file could not be found', async () => {
    const resp = await nexus.deviceAPI.process.stream.image.createFromFile(
      processId, streamId, { imageCreatedAt, pathToImage: 'notAFile.jpeg' },
    )
    expect(resp.errorMsg).toBe(`No file found at location ${'notAFile.jpeg'}`)
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await nexus.deviceAPI.process.stream.image.createFromURI(
        processId, streamId, body,
      )

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })

    describe('on failure', () => {

      beforeEach(() => {
        jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => { throw new Error() })
      })

      it('should repond with the error message,the status code and success=false', async () => {

        const resp = await nexus.deviceAPI.process.stream.image.createFromURI(
          processId, streamId, body,
        )

        expect(resp).toStrictEqual(expect.objectContaining({
          success: false,
          data: null,
          error: new Error(),
          errorMsg: '',
          status: null,
        }))
      })
    })
  })
})
