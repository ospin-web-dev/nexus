const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const list = require('user/device/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  const params = {
    userId: faker.datatype.uuid(),
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method with the user id', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(params)
    expect(API.get).toHaveBeenCalledWith(
      'user',
      `${params.userId}/devices`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(list, 'get', [ params ])
})
