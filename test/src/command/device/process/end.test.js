const { faker } = require('@faker-js/faker')
const endProcess = require('command/device/process/end')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('endProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.string.uuid()
  const processId = faker.string.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    endProcess(deviceId, processId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/processes/${processId}/end-process`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(endProcess, 'post')
})
