const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const list = require('user/licence/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  const userId = faker.datatype.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list({ userId })
    expect(API.get).toHaveBeenCalledWith('user', `${userId}/licences`, DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(list, 'get', [{ userId }])
})
