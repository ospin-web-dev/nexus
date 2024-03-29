const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const get = require('dataPoints/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const reporterFctId = faker.string.uuid()
  const params = {
    numberOfPoints: 1000,
    start: Date.now(),
    end: Date.now() + 10000,
  }

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(processId, reporterFctId, params)
    expect(API.get).toHaveBeenCalledWith('datapoints', `processes/${processId}/functionalities/${reporterFctId}?numberOfPoints=${params.numberOfPoints}&start=${params.start}&end=${params.end}`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(() => get(processId, reporterFctId, params), 'get')
})
