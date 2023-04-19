const list = require('deviceDescription/functionalityDescription/list')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

testHTTPEndpoint({
  name: 'list',
  handler: list,
  httpVerb: 'get',
  serviceName: 'device-description',
  expectedURLSegment: 'functionality-descriptions',
})
