const { API } = require('aws-amplify')

const getMetrics = require('utilsService/getMetrics')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('getMetrics', () => {

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getMetrics()
    expect(API.get).toHaveBeenCalledWith('utils', 'metrics', DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(getMetrics, 'get')
})
