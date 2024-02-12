const { default: API } = require('@aws-amplify/api-rest')
const { faker } = require('@faker-js/faker')
const get = require('process/preview/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('get process preview', () => {
  const processId = faker.string.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(processId)
    expect(API.get).toHaveBeenCalledWith('process', `${processId}/public`, DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(get, 'get')
})
