const faker = require('faker')
const updateRunningProcess = require('command/device/process/updateRunningProcess')
const {default: API} = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('updateRunningProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const deviceId = faker.datatype.uuid()
  const defaultBody = {
    elapsedTime: faker.datatype.number(),
    entryPhaseId: faker.datatype.number(),
  }

  it('calls amplifys API.post with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    updateRunningProcess(deviceId, processId, defaultBody)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/processes/${processId}/update-running-process`,
      { body: defaultBody, ...DEFAULT_REQ_OPTS },

    )
  })

  testDefaultHTTPResponses(updateRunningProcess, 'post')
})
