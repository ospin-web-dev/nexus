const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const createHeidolphCoreGateway = require('device/createHeidolphCoreGateway')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('createHeidolphCoreGateway device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    const body = {
      ownerId: faker.datatype.uuid(),
      name: 'knuckles',
      isVirtual: false,
    }

    await createHeidolphCoreGateway(body)
    expect(API.post).toHaveBeenCalledWith('device', 'heidolph-core-gateways', { body, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(createHeidolphCoreGateway, 'post')
})
