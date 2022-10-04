const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const update = require('process/physicalMapping/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('update physicalMapping', () => {
  const processId = faker.datatype.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  testHTTPEndpoint({
    name: 'update physical mapping',
    handler: update,
    httpVerb: 'post',
    serviceName: 'process',
    params: [processId],
    expectedURLSegment: `processes/${processId}/physical-mappings`,
    expectedPayload: { body: {}, ...DEFAULT_REQ_OPTS },
  })

  testDefaultHTTPResponses(update, 'post', [ processId ])
})
