const {default: API} = require('@aws-amplify/api-rest')

const logClientError = require('utilsService/logClientError')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('logClientError', () => {

  const params = { error: {} }

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await logClientError(params)
    expect(API.post).toHaveBeenCalledWith('utils', 'client-errors', { body: params.error, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(logClientError, 'post', [ params ])
})
