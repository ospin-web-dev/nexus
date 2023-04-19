const faker = require('faker')

const create = require('deviceDescription/functionalityDescription/create')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const params = {
  subType: faker.name.findName(),
  imageURL: faker.internet.url(),
}

testHTTPEndpoint({
  name: 'create',
  handler: create,
  httpVerb: 'post',
  serviceName: 'device-description',
  expectedURLSegment: 'functionality-descriptions',
  params: [params],
  expectedPayload: { body: params },
})
