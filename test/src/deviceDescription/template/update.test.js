const faker = require('faker')

const update = require('deviceDescription/template/update')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const templateId = faker.datatype.uuid()
const params = {
  name: faker.name.findName(),
  imageURL: faker.internet.url(),
  connections: [],
  functionalities: [],
}

testHTTPEndpoint({
  name: 'update',
  handler: update,
  httpVerb: 'put',
  serviceName: 'device-description',
  expectedURLSegment: `templates/${templateId}`,
  params: [templateId, params],
  expectedPayload: { body: params },
})
