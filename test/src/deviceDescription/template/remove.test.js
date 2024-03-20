const { faker } = require('@faker-js/faker')

const remove = require('deviceDescription/template/remove')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const templateId = faker.string.uuid()

testHTTPEndpoint({
  name: 'list',
  handler: remove,
  httpVerb: 'del',
  serviceName: 'device-description',
  expectedURLSegment: `templates/${templateId}`,
  params: [templateId],
})
