const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const update = require('device/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('update', () => {

  const params = [{ deviceId: faker.datatype.uuid() }]

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await update(params)
    expect(API.put).toHaveBeenCalledWith('device', `${params.deviceId}`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(update, 'put', [ params ])
})
