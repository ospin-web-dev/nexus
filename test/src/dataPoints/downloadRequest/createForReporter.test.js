const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const createForReporter = require('dataPoints/downloadRequest/createForReporter')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('createForReporter', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const reporterFctId = faker.string.uuid()

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await createForReporter(processId, reporterFctId)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/functionalities/${reporterFctId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createForReporter, 'post')
})
