const { faker } = require('@faker-js/faker')

const create = require('deviceDescription/template/create')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = {
  name: faker.lorem.word(),
  imageURL: faker.internet.url(),
  deviceId: faker.string.uuid(),
  connections: [],
  functionalities: [],
}

testHTTPEndpoint({
  name: 'create',
  handler: create,
  httpVerb: 'post',
  serviceName: 'device-description',
  expectedURLSegment: 'templates',
  params: [params],
  expectedPayload: { body: params },
})
