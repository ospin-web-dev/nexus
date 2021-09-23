const { API } = require('aws-amplify')
const faker = require('faker')

const get = require('dataPoints/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const reporterFctId = faker.datatype.uuid()
  const params = {
    numberOfPoints: 1000,
    start: Date.now(),
    end: Date.now() + 10000,
  }

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(processId, reporterFctId, params)
    expect(API.get).toHaveBeenCalledWith('datapoints', `processes/${processId}/functionalities/${reporterFctId}?numberOfPoints=${params.numberOfPoints}&start=${params.start}&end=${params.end}`, { ...DEFAULT_REQ_OPTS })
  })

  describe('on API.get success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await get(process, reporterFctId, params)

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
      const resp = await get(processId, reporterFctId, params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        status: null,
      }))
    })
  })
})
