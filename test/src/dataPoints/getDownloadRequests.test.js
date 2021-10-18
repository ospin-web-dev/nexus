const { API } = require('aws-amplify')
const faker = require('faker')

const getDownloadRequests = require('dataPoints/getDownloadRequests')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('getDownloadRequests', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getDownloadRequests(processId)
    expect(API.get).toHaveBeenCalledWith('datapoints', `processes/${processId}/downloadrequests`, { ...DEFAULT_REQ_OPTS })
  })

  describe('on API.get success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await getDownloadRequests(process)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
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
      const resp = await getDownloadRequests(processId)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        status: null,
      }))
    })
  })
})
