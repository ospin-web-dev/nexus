const {default: API} = require('@aws-amplify/api-rest')
const faker = require('faker')

const list = require('process/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {
  const userId = faker.datatype.uuid()
  const deviceId = faker.datatype.uuid()


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

  });

  testDefaultHTTPResponses(list, 'get')
})
