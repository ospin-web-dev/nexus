const API = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

const deleteMany = require('process/deleteMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('deleteMany', () => {
  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)
    const processId = [uuidv4(), uuidv4()]

    await deleteMany(processId)
    expect(API.patch).toHaveBeenCalledWith('process', '', { body: { processesIds: processId }, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(deleteMany, 'patch')
})
