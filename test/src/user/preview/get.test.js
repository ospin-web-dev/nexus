const faker = require('faker')
const {default: API} = require('@aws-amplify/api-rest')

const get = require('user/preview/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  const params = { userId: faker.datatype.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method with the user id', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(params)
    expect(API.get).toHaveBeenCalledWith('user', `${params.userId}/public`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(get, 'get', [ params ])
})
