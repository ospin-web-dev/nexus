const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const get = require('device/functionalityGraph/configuration/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('device.functionalityGraph.configuration.get', () => {

  const params = { deviceId: faker.datatype.uuid(), fctGraphId: faker.datatype.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(params)
    expect(API.get).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/functionality-graphs/${params.fctGraphId}/configurations`
      , { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(get, 'get', [ params ])
})
