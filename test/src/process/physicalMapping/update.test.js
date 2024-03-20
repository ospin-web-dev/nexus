const { faker } = require('@faker-js/faker')

const update = require('process/physicalMapping/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const processId = faker.string.uuid()

testHTTPEndpoint({
  name: 'update physical mapping',
  handler: update,
  httpVerb: 'post',
  serviceName: 'process',
  params: [processId],
  expectedURLSegment: `${processId}/physical-mappings`,
  expectedPayload: { body: {}, ...DEFAULT_REQ_OPTS },
})
