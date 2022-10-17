const faker = require('faker')

const updateFctGraph = require('device/functionalityGraph/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = {
  deviceId: faker.datatype.uuid(),
  fctGraphId: faker.datatype.uuid(),
  body: { name: faker.animal.lion() },
}

testHTTPEndpoint({
  name: 'update fctGraph',
  handler: updateFctGraph,
  httpVerb: 'patch',
  serviceName: 'device',
  params: [...Object.values(params) ],
  expectedURLSegment: `${params.deviceId}/functionality-graphs/${params.fctGraphId}`,
  expectedPayload: { body: { ...params.body }, ...DEFAULT_REQ_OPTS },
})
