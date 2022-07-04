const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const create = require('licence/create')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('create', () => {
  const params = { typeId: faker.datatype.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await create({ params })
    expect(API.post).toHaveBeenCalledWith(
      'licence', '', { body: { params }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(create, 'post', [ { params } ])
})
