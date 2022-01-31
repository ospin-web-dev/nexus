const faker = require('faker')
const resumeProcess = require('command/device/process/resumeProcess')
const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('resumeProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.datatype.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    resumeProcess(deviceId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/resume-process`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(resumeProcess, 'post')
})
