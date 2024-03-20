const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const removeAll = require('event/device/removeAll')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('removeAll device events', () => {

  const params = { deviceId: faker.string.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await removeAll(params)
    expect(API.del).toHaveBeenCalledWith('event', `devices/${params.deviceId}`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(removeAll, 'del', [ params ])
})
