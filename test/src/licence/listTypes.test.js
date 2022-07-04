const listTypes = require('licence/listTypes')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

testHTTPEndpoint({
  name: 'listTypes',
  handler: listTypes,
  httpVerb: 'get',
  serviceName: 'licence',
  params: [],
  expectedURLSegment: 'types',
})
