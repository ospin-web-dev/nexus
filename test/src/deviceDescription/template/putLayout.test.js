const faker = require('faker')

const putLayout = require('deviceDescription/template/putLayout')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

const id = faker.datatype.uuid()
const params = {
  layout: {
    1: { x: 5, y: 78 },
  },
}

testHTTPEndpoint({
  name: 'putImage',
  handler: putLayout,
  httpVerb: 'put',
  serviceName: 'device-description',
  expectedURLSegment: `templates/${id}/layout`,
  params: [id, params],
  expectedPayload: { body: params },
})
