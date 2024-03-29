const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const createDeletionRequest = require('user/createDeletionRequest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('createDeletionRequest', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
    const userId = faker.string.uuid()

    await createDeletionRequest(userId)
    expect(API.post).toHaveBeenCalledWith('user', `${userId}/deletion-requests`, { body: {}, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createDeletionRequest, 'post')
})
