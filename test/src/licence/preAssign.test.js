const faker = require('faker')

const preAssign = require('licence/preAssign')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

const body = {deviceId: faker.datatype.uuid(), key: faker.datatype.uuid()}

testHTTPEndpoint({
  name: 'pre-assign licence',
  handler: preAssign,
  httpVerb: 'post',
  serviceName: 'licence',
  params: [body],
  expectedURLSegment: `pre-assign`,
  expectedPayload: { body, ...DEFAULT_REQ_OPTS },
})
