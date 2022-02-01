const faker = require('faker')
const endProcess = require('command/device/process/endProcess')
const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('endProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.datatype.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    endProcess(deviceId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/end-process`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(endProcess, 'post')
})
