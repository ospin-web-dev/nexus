const { faker } = require('@faker-js/faker')

const get = require('dataPoints/materializedView/get')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const processId = faker.string.uuid()
const reporterFctId = faker.string.uuid()

testHTTPEndpoint({
  name: 'get',
  handler: get,
  httpVerb: 'get',
  serviceName: 'datapoints',
  expectedURLSegment: `processes/${processId}/functionalities/${reporterFctId}/materialized-view`,
  params: [processId, reporterFctId],
})
