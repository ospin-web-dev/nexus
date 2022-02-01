const { default: API } = require('@aws-amplify/api-rest')

const list = require('device/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list()
    expect(API.get).toHaveBeenCalledWith('device', '', { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(list, 'get')
})
