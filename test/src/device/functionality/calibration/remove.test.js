const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const remove = require('device/functionality/calibration/remove')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('remove calibration', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = faker.datatype.uuid()
  const fctGraphId = faker.datatype.uuid()
  const fctId = faker.datatype.uuid()
  const body = {
    slotName: 'notebook',
  }

  it('calls amplify\'s API.patch method with the expected args', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await remove(deviceId, fctGraphId, fctId, body)
    expect(API.patch).toHaveBeenCalledWith(
      'device',
      `${deviceId}/configurations/${fctGraphId}/functionalities/${fctId}/calibrations`,
      { body, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(remove, 'patch', [ deviceId, fctGraphId, fctId, body ])
})
