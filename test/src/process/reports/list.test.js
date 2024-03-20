const { faker } = require('@faker-js/faker')

const list = require('process/reports/list')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('process.reports.create', () => {

  const processId = faker.string.uuid()

  testHTTPEndpoint({
    name: 'list report requests',
    handler: list,
    httpVerb: 'get',
    serviceName: 'process',
    params: [processId],
    expectedURLSegment: `${processId}/report-requests`,
  })

})
