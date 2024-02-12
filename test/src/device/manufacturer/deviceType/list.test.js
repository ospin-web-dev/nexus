const { faker } = require('@faker-js/faker')
const { default: API } = require('@aws-amplify/api-rest')

const list = require('device/manufacturer/deviceType/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {

  const manufacturerId = faker.string.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list({ manufacturerId })
    expect(API.get).toHaveBeenCalledWith('device', `manufacturers/${manufacturerId}/deviceTypes`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(list, 'get', [ manufacturerId ])
})
