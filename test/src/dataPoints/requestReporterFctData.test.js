const { API } = require('aws-amplify')
const faker = require('faker')

const requestReporterFctData = require('dataPoints/requestReporterFctData')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('requestReporterFctData', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const reporterFctId = faker.datatype.uuid()

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await requestReporterFctData(processId, reporterFctId)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/functionalities/${reporterFctId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(requestReporterFctData, 'post')
})
