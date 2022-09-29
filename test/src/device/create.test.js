const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const create = require('device/create')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('create device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    const body = {
      ownerId: faker.datatype.uuid(),
      name: 'knuckles',
      isVirtual: false,
    }

    await create(body)
    expect(API.post).toHaveBeenCalledWith('device', '', { body, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(create, 'post')
})
