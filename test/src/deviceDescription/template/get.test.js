const { faker } = require('@faker-js/faker')

const get = require('deviceDescription/template/get')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = [
  faker.string.uuid(),
  {
    deviceId: faker.string.uuid(),
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
