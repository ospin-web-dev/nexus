const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const update = require('device/functionality/calibration/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('update calibration', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.datatype.uuid(),
    fctId: faker.datatype.uuid(),
    fctGraphId: faker.datatype.uuid(),
    slotName: 'notebook',
    params: [],
  }

  it('calls amplify\'s API.post method with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await update(params)
    expect(API.post).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/configurations/${params.fctGraphId}/functionalities/${params.fctId}/calibrations`,
      { body: { slotName: params.slotName, calibrationData: params.params }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(update, 'post', [ params ])
})
