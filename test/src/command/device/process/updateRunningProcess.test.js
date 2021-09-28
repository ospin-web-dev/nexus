const faker = require('faker')
const updateRunningProcess = require('command/device/process/updateRunningProcess')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('updateRunningProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
  })

  const processId = faker.datatype.uuid()
  const deviceId = faker.datatype.uuid()
  const defaultBody = {
    elapsedTime: faker.datatype.number(),
    entryPhaseId: faker.datatype.number(),
  }

  it('calls amplifys API.post with the expected args', async () => {

    updateRunningProcess(deviceId, processId, defaultBody)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/processes/${processId}/update-running-process`,
      { body: defaultBody, ...DEFAULT_REQ_OPTS },

    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(API, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await updateRunningProcess({})

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

        const resp = await updateRunningProcess({})

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
