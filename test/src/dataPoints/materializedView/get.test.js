const faker = require('faker')

const get = require('dataPoints/materializedView/get')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const processId = faker.datatype.uuid()
const reporterFctId = faker.datatype.uuid()

testHTTPEndpoint({
  name: 'get',
  handler: get,
  httpVerb: 'get',
  serviceName: 'datapoints',
  expectedURLSegment: `processes/${processId}/functionalities/${reporterFctId}/materialized-view`,
  params: [processId, reporterFctId],
})
