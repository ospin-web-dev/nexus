const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const updatePorts = require('device/functionalityGraph/ports/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')
const testHTTPEndpoint = require('../../../../testHelpers/testHTTPEndpoint')

describe('updatePorts', () => {
  const params = {
    deviceId: faker.datatype.uuid(),
    fctGraphId: faker.datatype.uuid(),
    body: {},
  }

  afterAll(() => { jest.restoreAllMocks() })

  testHTTPEndpoint({
    name: 'update physical mapping',
    handler: updatePorts,
    httpVerb: 'patch',
    serviceName: 'device',
    params: [...Object.values(params) ],
    expectedURLSegment: `${params.deviceId}/functionality-graphs/${params.fctGraphId}/ports`,
    expectedPayload: { body: {}, ...DEFAULT_REQ_OPTS },
  })

  testDefaultHTTPResponses(updatePorts, 'patch', [ params ])
})
