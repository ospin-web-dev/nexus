const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const functionality = require('../../../src/deviceAPI/functionality')
const setUpAuthenticatedDeviceAPI = require('../../testHelpers/setUpAuthenticatedDeviceAPI')

describe('update functionalities', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(AuthenticatedDeviceAPI, 'put').mockImplementation(args => args)
  })

  const body = {
    fctGraph: {
      name: 'graph',
    },
    supportedVirtualFunctionalities: [ 'fct1', 'fct2']
    ,
  }

  it('calls amplifys API.put with the expected args', async () => {
    setUpAuthenticatedDeviceAPI()

    await functionality(body)

    expect(AuthenticatedDeviceAPI.put).toHaveBeenCalledWith(
      'functionalities',
      body,
      DEFAULT_REQ_OPTS,

    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'put').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      setUpAuthenticatedDeviceAPI()

      const resp = await functionality(body)

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
        jest.spyOn(AuthenticatedDeviceAPI, 'put').mockImplementation(() => { throw new Error() })
      })

      it('should repond with the error message,the status code and success=false', async () => {
        setUpAuthenticatedDeviceAPI()

        const resp = await functionality(body)

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
