const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const list = require('dataPoints/downloadRequest/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('list download requests', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(processId)
    expect(API.get).toHaveBeenCalledWith('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(list, 'get')
})
