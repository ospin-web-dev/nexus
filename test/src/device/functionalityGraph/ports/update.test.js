const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const updatePorts = require('device/functionalityGraph/ports/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('updatePorts', () => {

  const params = {
    deviceId: faker.datatype.uuid(),
    fctGraphId: faker.datatype.uuid(),
    body: {},
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await updatePorts(...Object.values(params))
    expect(API.patch)
      .toHaveBeenCalledWith(
        'device',
        `${params.deviceId}/functionality-graphs/${params.fctGraphId}/ports`,
        { body: params.body, ...DEFAULT_REQ_OPTS },
      )
  })

  testDefaultHTTPResponses(updatePorts, 'patch', [ params ])
})
