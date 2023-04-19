const faker = require('faker')

const remove = require('deviceDescription/functionalityDescription/remove')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const id = faker.datatype.uuid()

testHTTPEndpoint({
  name: 'delete',
  handler: remove,
  httpVerb: 'del',
  serviceName: 'device-description',
  expectedURLSegment: `functionality-descriptions/${id}`,
  params: [id],
})
