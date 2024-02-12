const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')
const update = require('device/functionality/calibration/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('update calibration', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.string.uuid()
  const fctGraphId = faker.string.uuid()
  const fctId = faker.string.uuid()
  const body = {
    slotName: 'notebook',
  }

  it('calls amplify\'s API.post method with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await update(deviceId, fctGraphId, fctId, body)
    expect(API.post).toHaveBeenCalledWith(
      'device',
      `${deviceId}/configurations/${fctGraphId}/functionalities/${fctId}/calibrations`,
      { body, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(update, 'post', [ deviceId, fctGraphId, fctId, body ])
})
