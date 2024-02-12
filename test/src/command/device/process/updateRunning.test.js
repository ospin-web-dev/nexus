const { faker } = require('@faker-js/faker')
const updateRunningProcess = require('command/device/process/updateRunning')
const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('updateRunningProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const deviceId = faker.string.uuid()
  const defaultBody = {
    elapsedTime: faker.number.int(),
    entryPhaseId: faker.number.int(),
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
