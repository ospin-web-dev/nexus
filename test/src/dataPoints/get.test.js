const { API } = require('aws-amplify')
const faker = require('faker')

const get = require('dataPoints/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    processId: faker.datatype.uuid(),
    reporterFctId: faker.datatype.uuid(),
    numberOfPoints: 1000,
    start: Date.now(),
    end: Date.now() + 10000,
  }

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(params)
    expect(API.get).toHaveBeenCalledWith('datapoints', `processes/${params.processId}/functionalities/${params.reporterFctId}?numberOfPoints=${params.numberOfPoints}&start=${params.start}&end=${params.end}`, { ...DEFAULT_REQ_OPTS })
  })

  describe('on API.get success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await get(params)

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
      const resp = await get(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        status: null,
      }))
    })
  })
})
