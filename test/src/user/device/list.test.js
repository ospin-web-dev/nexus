const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const list = require('user/device/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  const params = {
    userId: faker.string.uuid(),
    queryStringParameters: {
      skip: 5,
    },
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(params)
    expect(API.get).toHaveBeenCalledWith(
      'user',
      `${params.userId}/devices`,
      { queryStringParameters: { skip: 5 }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(list, 'get', [ params ])
})
