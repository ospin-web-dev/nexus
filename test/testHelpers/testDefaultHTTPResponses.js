const { API } = require('aws-amplify')

module.exports = (fn, httpVerb) => {

  describe(`on API.${httpVerb} success`, () => {
    beforeAll(() => {
      jest.spyOn(API, httpVerb)
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await fn()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        errorMsg: null,
        error: null,
        status: 200,
      }))
    })
  })

  describe(`on API.${httpVerb} error`, () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, httpVerb)
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await fn()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: '',
        error,
        status: null,
      }))
    })
  })

}