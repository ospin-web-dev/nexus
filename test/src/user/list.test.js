const { faker } = require('@faker-js/faker')
const { default: API } = require('@aws-amplify/api-rest')

const list = require('user/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  const params = {
    deviceId: faker.string.uuid(),
    processId: undefined,
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(params)
    expect(API.get).toHaveBeenCalledWith('user', '', {
      queryStringParameters: params,
      ...DEFAULT_REQ_OPTS,
    })
  })

  testDefaultHTTPResponses(list, 'get', [ params ])
})
