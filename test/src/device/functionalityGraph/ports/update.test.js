const faker = require('faker')

const updatePorts = require('device/functionalityGraph/ports/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testHTTPEndpoint = require('../../../../testHelpers/testHTTPEndpoint')

const params = {
  deviceId: faker.datatype.uuid(),
  fctGraphId: faker.datatype.uuid(),
  body: {},
}

testHTTPEndpoint({
  name: 'update physical mapping',
  handler: updatePorts,
  httpVerb: 'patch',
  serviceName: 'device',
  params: [...Object.values(params) ],
  expectedURLSegment: `${params.deviceId}/functionality-graphs/${params.fctGraphId}/ports`,
  expectedPayload: { body: {}, ...DEFAULT_REQ_OPTS },
})
