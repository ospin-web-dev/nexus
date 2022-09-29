const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const createForProcess = require('dataPoints/downloadRequest/createForProcess')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('createForProcess', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await createForProcess(processId)
    expect(API.post).toHaveBeenCalledWith('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createForProcess, 'post')
})
