const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const list = require('process/functionality/image/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {
  const processId = faker.string.uuid()
  const functionalityId = faker.string.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(processId, functionalityId)
    expect(API.get).toHaveBeenCalledWith('process', `${processId}/functionalities/${functionalityId}/images`, { ...DEFAULT_REQ_OPTS })
  })

  it('should take query parameters', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)
    const queryParams = { queryStringParameters: { skip: 1, limit: 1 } }

    await list(processId, functionalityId, queryParams)
    expect(API.get).toHaveBeenCalledWith('process', `${processId}/functionalities/${functionalityId}/images`, { ...DEFAULT_REQ_OPTS, ...queryParams })
  })

  testDefaultHTTPResponses(list, 'get')
})
