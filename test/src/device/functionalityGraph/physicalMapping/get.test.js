const faker = require('faker')

const get = require('device/functionalityGraph/physicalMapping/get')
const testHTTPEndpoint = require('../../../../testHelpers/testHTTPEndpoint')

describe('device.functionalityGraph.configuration.get', () => {

  const params = { deviceId: faker.datatype.uuid(), fctGraphId: faker.datatype.uuid() }

  testHTTPEndpoint({
    name: 'get configuration',
    handler: get,
    httpVerb: 'get',
    serviceName: 'device',
    params: [{ ...params }],
    expectedURLSegment: `${params.deviceId}/functionality-graphs/${params.fctGraphId}/physical-mappings`,
  })

})
