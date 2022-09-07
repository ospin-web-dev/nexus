const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const createForReporter = require('dataPoints/downloadRequest/createForReporter')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('createForReporter', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const reporterFctId = faker.datatype.uuid()

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await createForReporter(processId, reporterFctId)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/functionalities/${reporterFctId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createForReporter, 'post')
})
