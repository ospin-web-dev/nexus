const faker = require('faker')
const add = require('user/licence/add')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const userId = faker.datatype.uuid()
const params = { key: faker.datatype.uuid(), deviceId: faker.datatype.uuid() }

testHTTPEndpoint({
  name: 'add',
  handler: add,
  httpVerb: 'post',
  serviceName: 'user',
  params: [{ userId, params }],
  expectedURLSegment: `${userId}/licences`,
  expectedPayload: { body: params },
})
