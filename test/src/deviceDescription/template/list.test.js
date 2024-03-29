const { faker } = require('@faker-js/faker')

const list = require('deviceDescription/template/list')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = {
  deviceId: faker.string.uuid(),
}

testHTTPEndpoint({
  name: 'list',
  handler: list,
  httpVerb: 'get',
  serviceName: 'device-description',
  expectedURLSegment: 'templates',
  params: [params],
  expectedPayload: { queryStringParameters: params },
})
