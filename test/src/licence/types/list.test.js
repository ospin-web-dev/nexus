const listTypes = require('licence/type/list')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

testHTTPEndpoint({
  name: 'listTypes',
  handler: listTypes,
  httpVerb: 'get',
  serviceName: 'licence',
  params: [],
  expectedURLSegment: 'types',
})
