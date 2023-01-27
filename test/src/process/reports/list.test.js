const faker = require('faker')

const list = require('process/reports/list')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('process.reports.create', () => {

  const processId = faker.datatype.uuid()

  testHTTPEndpoint({
    name: 'list report requests',
    handler: list,
    httpVerb: 'get',
    serviceName: 'process',
    params: [processId],
    expectedURLSegment: `${processId}/report-requests`,
  })

})
