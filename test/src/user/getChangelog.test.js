const { API } = require('aws-amplify')

const getChangelog = require('user/getChangelog')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('getChangelog', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getChangelog()
    expect(API.get).toHaveBeenCalledWith('user', 'changelog', DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(getChangelog, 'get')
})
