const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const get = require('user/preview/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  const params = { userId: faker.string.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(params)
    expect(API.get).toHaveBeenCalledWith('user', `${params.userId}/public`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(get, 'get', [ params ])
})
