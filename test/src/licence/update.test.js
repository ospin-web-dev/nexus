const { faker } = require('@faker-js/faker')

const update = require('licence/update')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

const requestParams = {
  licenceId: faker.string.uuid(),
  params: {
    invoiceId: 'ABCD-EFGH-2022',
  },
}

testHTTPEndpoint({
  name: 'update',
  handler: update,
  httpVerb: 'patch',
  serviceName: 'licence',
  params: [requestParams],
  expectedURLSegment: requestParams.licenceId,
  expectedPayload: { body: requestParams.params },
})
