const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const updateMany = require('device/functionalityGraph/functionalityConfiguration/updateMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('updateMany', () => {

  const params = {
    deviceId: faker.string.uuid(),
    fctGraphId: faker.string.uuid(),
    updates: [],
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await updateMany(params)
    expect(API.patch)
      .toHaveBeenCalledWith(
        'device',
        `${params.deviceId}/functionality-graphs/${params.fctGraphId}/configurations`,
        { body: { updates: params.updates }, ...DEFAULT_REQ_OPTS },
      )
  })

  testDefaultHTTPResponses(updateMany, 'patch', [ params ])
})
