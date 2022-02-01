const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const list = require('log/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    limit: 100,
    processId: faker.datatype.uuid(),
    startTime: Date.now() - 10000,
    endTime: undefined,
    deviceId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
  }

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(params)
    expect(API.get)
      .toHaveBeenCalledWith('log', '', { queryStringParameters: params, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(list, 'get', [ params ])
})
