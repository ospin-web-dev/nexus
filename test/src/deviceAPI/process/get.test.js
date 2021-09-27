const faker = require('faker')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const nexus = require('../../../../index')
const setUpAuthenticatedDeviceAPI = require('../../../testHelpers/setUpAuthenticatedDeviceAPI')

describe('get Process', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(AuthenticatedDeviceAPI, 'get').mockImplementation(args => args)
    setUpAuthenticatedDeviceAPI()
  })

  const processId = faker.datatype.uuid()

  it('calls amplifys authenticated device API with the expected path', async () => {
    nexus.deviceAPI.process.get(processId)

    expect(AuthenticatedDeviceAPI.get).toHaveBeenCalledWith(`processes/${processId}`, DEFAULT_REQ_OPTS)
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'get').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await nexus.deviceAPI.process.get(processId)


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
        jest.spyOn(AuthenticatedDeviceAPI, 'get').mockImplementation(() => { throw new Error() })
      })

      it('should repond with the error message,the status code and success=false', async () => {

        const resp = await nexus.deviceAPI.process.get(processId)

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
