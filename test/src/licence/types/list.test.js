const listTypes = require('licence/type/list')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const queryStringParameters = { embed: true }
testHTTPEndpoint({
  name: 'listTypes',
  handler: listTypes,
  httpVerb: 'get',
  serviceName: 'licence',
  params: [queryStringParameters],
  expectedURLSegment: 'types',
  expectedPayload: { queryStringParameters },

})
