const { default: API } = require('@aws-amplify/api-rest')
const { faker } = require('@faker-js/faker')

const authorizeMany = require('user/pusher/subscriptions/authorizeMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('authorizeMany', () => {

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
    const userId = faker.string.uuid()
    const payload = { socketId: '12345-54321', channelName: 'channelName' }

    await authorizeMany(userId, payload)
    expect(API.post).toHaveBeenCalledWith('user', `${userId}/subscriptions`, { body: payload, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(authorizeMany, 'post')
})
