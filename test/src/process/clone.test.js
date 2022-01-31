const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

const clone = require('process/clone')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('clone process', () => {
  const processId = faker.datatype.uuid()
  const processName = faker.company.bs()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await clone(processId, { processName })
    expect(API.post).toHaveBeenCalledWith('process', `${processId}/clones`, { body: { processName }, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(clone, 'post')
})
