const faker = require('faker')

const create = require('licence/create')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

const params = { typeId: faker.datatype.uuid() }

testHTTPEndpoint({
  name: 'create',
  handler: create,
  httpVerb: 'post',
  serviceName: 'licence',
  params: [{ params }],
  expectedPayload: { body: params },
})
