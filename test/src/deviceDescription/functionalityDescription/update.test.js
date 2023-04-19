const faker = require('faker')

const update = require('deviceDescription/functionalityDescription/update')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const id = faker.datatype.uuid()
const params = {
  imageURL: faker.internet.url(),
}

testHTTPEndpoint({
  name: 'update',
  handler: update,
  httpVerb: 'post',
  serviceName: 'device-description',
  expectedURLSegment: `functionality-descriptions/${id}`,
  params: [id, params],
  expectedPayload: { body: params },
})
