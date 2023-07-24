const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const listSubjects = require('log/listSubjects')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('listSubjects', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.getSubject method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await listSubjects()
    expect(API.get)
      .toHaveBeenCalledWith('log', 'subjects', { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(listSubjects, 'get')
})
