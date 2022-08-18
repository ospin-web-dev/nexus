const list = require('licence/list')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

testHTTPEndpoint({
  name: 'listTypes',
  handler: list,
  httpVerb: 'get',
  serviceName: 'licence',
  params: [],
})