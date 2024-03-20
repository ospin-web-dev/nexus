const { faker } = require('@faker-js/faker')

const remove = require('deviceDescription/functionalityDescription/remove')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const id = faker.string.uuid()

testHTTPEndpoint({
  name: 'delete',
  handler: remove,
  httpVerb: 'del',
  serviceName: 'device-description',
  expectedURLSegment: `functionality-descriptions/${id}`,
  params: [id],
})
