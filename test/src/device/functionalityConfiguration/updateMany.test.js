const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const updateMany = require('device/functionalityConfiguration/updateMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('updateMany', () => {

  const params = {
    deviceId: faker.datatype.uuid(),
    updates: [],
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await updateMany(params)
    expect(API.patch)
      .toHaveBeenCalledWith(
        'device',
        `${params.deviceId}/functionalities-configurations`,
        { body: { updates: params.updates }, ...DEFAULT_REQ_OPTS },
      )
  })

  testDefaultHTTPResponses(updateMany, 'patch', [ params ])
})
