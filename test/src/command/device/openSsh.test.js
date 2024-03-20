const { faker } = require('@faker-js/faker')
const openSsh = require('command/device/openSsh')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('openSsh', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.string.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    openSsh(deviceId)

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/open-ssh`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(openSsh, 'post')
})
