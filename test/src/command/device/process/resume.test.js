const { faker } = require('@faker-js/faker')
const resumeProcess = require('command/device/process/resume')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('resumeProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.string.uuid()
  const processId = faker.string.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    resumeProcess(deviceId, processId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/processes/${processId}/resume-process`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(resumeProcess, 'post')
})
