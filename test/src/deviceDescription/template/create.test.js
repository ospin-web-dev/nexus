const faker = require('faker')

const create = require('deviceDescription/template/create')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = {
  name: faker.name.findName(),
  imageURL: faker.internet.url(),
  deviceId: faker.datatype.uuid(),
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
