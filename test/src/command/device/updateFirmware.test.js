const { faker } = require('@faker-js/faker')
const updateFirmware = require('command/device/updateFirmware')
const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('updateFirmware', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.string.uuid()
  const firmwareUpdateId = faker.string.uuid()

  it('calls amplifys API.post with the expected args', async () => {

    jest.spyOn(API, 'post').mockImplementation(args => args)
    updateFirmware({ deviceId, firmwareUpdateId })

    expect(API.post).toHaveBeenCalledWith(
      'command',
      `devices/${deviceId}/update-firmware`,
      { body: { firmwareUpdateId }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(updateFirmware, 'post', [{ deviceId, firmwareUpdateId }])
})
