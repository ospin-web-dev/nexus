const faker = require('faker')

const create = require('process/reports/create')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('process.reports.create', () => {

  const processId = faker.datatype.uuid()

  testHTTPEndpoint({
    name: 'create report request',
    handler: create,
    httpVerb: 'post',
    serviceName: 'process',
    params: [processId],
    expectedURLSegment: `${processId}/report-requests`,
  })

})
