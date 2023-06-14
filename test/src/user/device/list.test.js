const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const list = require('user/device/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  const params = {
    userId: faker.datatype.uuid(),
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
