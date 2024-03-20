const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const createForProcess = require('dataPoints/downloadRequest/createForProcess')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('createForProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const body = { reporterFctIds: [faker.string.uuid()] }

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await createForProcess(processId, body)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/downloadrequests`, { body, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createForProcess, 'post')
})
