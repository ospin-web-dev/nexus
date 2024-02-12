const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const list = require('process/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {
  const userId = faker.string.uuid()
  const deviceId = faker.string.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list({ userId, deviceId })
    expect(API.get).toHaveBeenCalledWith('process', '', { queryStringParameters: { userId, deviceId }, ...DEFAULT_REQ_OPTS })
  })

  it('should take query parameters', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)
    const queryStringParameters = { skip: 1, limit: 1, userId, deviceId }

    await list(queryStringParameters)
    expect(API.get).toHaveBeenCalledWith('process', '', { ...DEFAULT_REQ_OPTS, queryStringParameters })

  })

  testDefaultHTTPResponses(list, 'get')
})
