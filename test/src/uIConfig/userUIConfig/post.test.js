const { faker } = require('@faker-js/faker')
const { default: API } = require('@aws-amplify/api-rest')

const post = require('uIConfig/userUIConfig/post')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')
const { DEFAULT_REQ_OPTS } = require('../../../../src/utils/defaultReqOpts')

describe('post', () => {
  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    userId: faker.string.uuid(),
  }

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await post(params.userId, params)

    expect(API.post).toHaveBeenCalledTimes(1)
    expect(API.post).toHaveBeenCalledWith(
      'uiconfig',
      `users/${params.userId}`,
      { body: params, ...DEFAULT_REQ_OPTS },
    )

  })

  testDefaultHTTPResponses(post, 'post', [ params ])
})
