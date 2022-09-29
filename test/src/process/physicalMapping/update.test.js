const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const update = require('process/physicalMapping/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('update process', () => {
  const processId = faker.datatype.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await update(processId)
    expect(API.post).toHaveBeenCalledWith(
      `processes/${processId}/physical-mappings`,
      { body: {}, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(update, 'post', [ processId ])
})
