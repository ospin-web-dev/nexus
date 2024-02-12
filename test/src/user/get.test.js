const { default: API } = require('@aws-amplify/api-rest')
const { faker } = require('@faker-js/faker')

const get = require('user/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)
    const userId = faker.string.uuid()

    await get(userId)
    expect(API.get).toHaveBeenCalledWith('user', userId, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(get, 'get')
})
