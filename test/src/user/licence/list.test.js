const { faker } = require('@faker-js/faker')
const list = require('user/licence/list')

const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const userId = faker.string.uuid()

testHTTPEndpoint({
  name: 'list',
  handler: list,
  httpVerb: 'get',
  serviceName: 'user',
  params: [{ userId }],
  expectedURLSegment: `${userId}/licences`,
})
