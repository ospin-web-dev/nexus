const { faker } = require('@faker-js/faker')

const get = require('device/functionalityGraph/configuration/get')
const testHTTPEndpoint = require('../../../../testHelpers/testHTTPEndpoint')

describe('device.functionalityGraph.configuration.get', () => {

  const params = { deviceId: faker.string.uuid(), fctGraphId: faker.string.uuid() }

  testHTTPEndpoint({
    name: 'get configuration',
    handler: get,
    httpVerb: 'get',
    serviceName: 'device',
    params: [{ ...params }],
    expectedURLSegment: `${params.deviceId}/functionality-graphs/${params.fctGraphId}/configurations`,
  })

})
