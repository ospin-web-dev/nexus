const faker = require('faker')

const remove = require('deviceDescription/template/remove')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const templateId = faker.datatype.uuid()

testHTTPEndpoint({
  name: 'list',
  handler: remove,
  httpVerb: 'del',
  serviceName: 'device-description',
  expectedURLSegment: `templates/${templateId}`,
  params: [templateId],
})
