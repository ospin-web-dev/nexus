const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const remove = require('event/remove')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('remove event', () => {

  const params = { eventId: faker.datatype.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await remove(params)
    expect(API.del).toHaveBeenCalledWith('event', `${params.eventId}`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(remove, 'del', [ params ])
})
