const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const createForProcess = require('dataPoints/downloadRequest/createForProcess')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('createForProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const body = { reporterFctIds: [faker.datatype.uuid()] }

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await createForProcess(processId, body)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/downloadrequests`, { body, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createForProcess, 'post')
})
