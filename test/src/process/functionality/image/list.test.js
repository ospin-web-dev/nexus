const { API } = require('aws-amplify')
const faker = require('faker')

const list = require('process/functionality/image/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('list', () => {
  const processId = faker.datatype.uuid()
  const functionalityId = faker.datatype.uuid()


  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list(processId, functionalityId)
    expect(API.get).toHaveBeenCalledWith('process', `${processId}/functionalities/${functionalityId}/images`, { ...DEFAULT_REQ_OPTS })
  })

  it('should take query parameters', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)
    const queryParams = { queryStringParameters: { skip: 1, limit: 1 } }

    await list(processId, functionalityId, queryParams)
    expect(API.get).toHaveBeenCalledWith('process', `${processId}/functionalities/${functionalityId}/images`, { ...DEFAULT_REQ_OPTS, ...queryParams })

  });

  describe('on API.get success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await list()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on API.get error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await list()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        errorMsg: '',
        status: null,
      }))
    })
  })
})
