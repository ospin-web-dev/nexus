const { API } = require('aws-amplify')

const getDocs = require('utilsService/getDocs')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('getDocumentation', () => {

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getDocs()
    expect(API.get).toHaveBeenCalledWith('utils', 'documentation', DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(getDocs, 'get')
})
