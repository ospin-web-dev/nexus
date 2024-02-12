const { faker } = require('@faker-js/faker')
const goToNextPhase = require('command/device/process/goToNextPhase')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('goToNextPhase', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.string.uuid()
  const processId = faker.string.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    goToNextPhase(deviceId, processId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/processes/${processId}/next-phase`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(goToNextPhase, 'post')
})
