const faker = require('faker')

const update = require('process/physicalMapping/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const processId = faker.datatype.uuid()

testHTTPEndpoint({
  name: 'update physical mapping',
  handler: update,
  httpVerb: 'post',
  serviceName: 'process',
  params: [processId],
  expectedURLSegment: `processes/${processId}/physical-mappings`,
  expectedPayload: { body: {}, ...DEFAULT_REQ_OPTS },
})
