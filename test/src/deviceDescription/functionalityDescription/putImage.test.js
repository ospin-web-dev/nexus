const { faker } = require('@faker-js/faker')

const putImage = require('deviceDescription/functionalityDescription/putImage')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const id = faker.string.uuid()
const params = {
  imageDataURI: faker.internet.url(),
}

testHTTPEndpoint({
  name: 'putImage',
  handler: putImage,
  httpVerb: 'put',
  serviceName: 'device-description',
  expectedURLSegment: `functionality-descriptions/${id}/image`,
  params: [id, params],
  expectedPayload: { body: params },
})
