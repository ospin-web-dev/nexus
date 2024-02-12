const { faker } = require('@faker-js/faker')

const create = require('process/reports/create')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('process.reports.create', () => {

  const processId = faker.string.uuid()

  testHTTPEndpoint({
    name: 'create report request',
    handler: create,
    httpVerb: 'post',
    serviceName: 'process',
    params: [processId],
    expectedURLSegment: `${processId}/report-requests`,
  })

})
