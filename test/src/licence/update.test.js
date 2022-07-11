const faker = require('faker')

const update = require('licence/update')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

const requestParams = {
  licenceId: faker.datatype.uuid(),
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
