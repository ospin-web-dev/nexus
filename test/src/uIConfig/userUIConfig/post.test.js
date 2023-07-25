const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const post = require('uIConfig/userUIConfig/post')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')
const { DEFAULT_REQ_OPTS } = require('../../../../src/utils/defaultReqOpts')

describe('post', () => {
  afterAll(() => { jest.restoreAllMocks() })

  const userId = faker.datatype.uuid()
  const body = {
    devices: {},
    devicesTab: {},
  }

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await post(userId, body)

    expect(API.post).toHaveBeenCalledTimes(1)
    expect(API.post).toHaveBeenCalledWith(
      'uiconfig',
      `users/${userId}`,
      { body, ...DEFAULT_REQ_OPTS },
    )

  })

  testDefaultHTTPResponses(post, 'post', [ body ])
})
