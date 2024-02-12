const { faker } = require('@faker-js/faker')
const add = require('user/licence/add')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const userId = faker.string.uuid()
const params = { key: faker.string.uuid(), deviceId: faker.string.uuid() }

testHTTPEndpoint({
  name: 'add',
  handler: add,
  httpVerb: 'post',
  serviceName: 'user',
  params: [{ userId, params }],
  expectedURLSegment: `${userId}/licences`,
  expectedPayload: { body: params },
})
