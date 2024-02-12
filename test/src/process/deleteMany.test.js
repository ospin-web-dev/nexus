const { default: API } = require('@aws-amplify/api-rest')
const { faker } = require('@faker-js/faker')

const deleteMany = require('process/deleteMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('deleteMany', () => {
  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)
    const processId = [faker.string.uuid(), faker.string.uuid()]

    await deleteMany(processId)
    expect(API.patch).toHaveBeenCalledWith('process', '', { body: { processesIds: processId }, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(deleteMany, 'patch')
})
