const { default: API } = require('@aws-amplify/api-rest')
const { faker } = require('@faker-js/faker')

const create = require('process/create')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('create process', () => {
  const params = {
    deviceId: faker.string.uuid(),
    params: { name: faker.company.buzzPhrase() },
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await create(params)
    expect(API.post).toHaveBeenCalledWith(
      'process',
      `?deviceId=${params.deviceId}`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(create, 'post', [ params ])
})
