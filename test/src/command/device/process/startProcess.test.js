const faker = require('faker')
const startProcess = require('command/device/process/startProcess')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('create Process Functionality Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
  })

  const processId = faker.datatype.uuid()
  const deviceId = faker.datatype.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    startProcess(deviceId, processId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/processes/${processId}/start-process`,
      { body: {}, ...DEFAULT_REQ_OPTS },

    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(API, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await startProcess({})

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
        jest.spyOn(API, 'post').mockImplementation(() => { throw new Error() })
      })

      it('should repond with the error message,the status code and success=false', async () => {

        const resp = await startProcess({})

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
