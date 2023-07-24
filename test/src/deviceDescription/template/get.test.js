const faker = require('faker')

const get = require('deviceDescription/template/get')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = [
  faker.datatype.uuid(),
  {
    deviceId: faker.datatype.uuid(),
  }
]

testHTTPEndpoint({
  name: 'list',
  handler: get,
  httpVerb: 'get',
  serviceName: 'device-description',
  expectedURLSegment: `templates/${params[0]}`,
  params,
  expectedPayload: { queryStringParameters: params[1] },
})
