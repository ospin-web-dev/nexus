const API = require('@aws-amplify/api-rest')
const faker = require('faker')

const getDownloadRequests = require('dataPoints/getDownloadRequests')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('getDownloadRequests', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getDownloadRequests(processId)
    expect(API.get).toHaveBeenCalledWith('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(getDownloadRequests, 'get')
})
