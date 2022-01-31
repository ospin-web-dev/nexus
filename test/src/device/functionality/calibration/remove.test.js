const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const remove = require('device/functionality/calibration/remove')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('remove calibration', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.datatype.uuid(),
    fctId: faker.datatype.uuid(),
    slotName: 'notebook',
  }

  it('calls amplify\'s API.patch method with the expected args', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await remove(params)
    expect(API.patch).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/functionalities/${params.fctId}/calibrations`,
      { body: { slotName: params.slotName }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(remove, 'patch', [ params ])
})
