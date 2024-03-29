const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')
const list = require('log/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    limit: 100,
    processId: faker.string.uuid(),
    startTime: Date.now() - 10000,
    endTime: undefined,
    deviceId: faker.string.uuid(),
    userId: faker.string.uuid(),
    level: 'information',
    subject: 'device/operation',
    skip: 2,
  }

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(params)
    expect(API.get)
      .toHaveBeenCalledWith('log', '', { queryStringParameters: params, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(list, 'get', [ params ])
})
