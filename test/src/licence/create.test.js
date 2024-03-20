const { faker } = require('@faker-js/faker')

const create = require('licence/create')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

const params = { typeId: faker.string.uuid() }

testHTTPEndpoint({
  name: 'create',
  handler: create,
  httpVerb: 'post',
  serviceName: 'licence',
  params: [{ params }],
  expectedPayload: { body: params },
})
