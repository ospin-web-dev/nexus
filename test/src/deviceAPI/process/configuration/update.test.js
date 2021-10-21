const faker = require('faker')
const nexus = require('../../../../../index')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const setUpAuthenticatedDeviceAPI = require('../../../../testHelpers/setUpAuthenticatedDeviceAPI')

describe('update Configuration', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(args => args)
    setUpAuthenticatedDeviceAPI()
  })

  const body = {
    fctGraph: {
      name: 'graph'
    },
    supportedVirtualFunctionalities: [ 'fct1', 'fct2']
    ,
  }

  it('calls amplifys API.post with the expected args', async () => {
    nexus.deviceAPI.configuration.update(body)

    expect(AuthenticatedDeviceAPI.post).toHaveBeenCalledWith(
      'configuration',
      body, DEFAULT_REQ_OPTS,

    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await nexus.deviceAPI.configuration.update(body)

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

        const resp = await nexus.deviceAPI.configuration.update(body)

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
