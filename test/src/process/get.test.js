const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const get = require('process/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {
  const processId = faker.datatype.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(processId)
    expect(API.get).toHaveBeenCalledWith('process', processId, DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(get, 'get')
})
