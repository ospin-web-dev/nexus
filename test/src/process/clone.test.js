const { default: API } = require('@aws-amplify/api-rest')
const { faker } = require('@faker-js/faker')

const clone = require('process/clone')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('clone process', () => {
  const processId = faker.string.uuid()
  const processName = faker.company.buzzPhrase()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await clone(processId, { processName })
    expect(API.post).toHaveBeenCalledWith('process', `${processId}/clones`, { body: { processName }, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(clone, 'post')
})
