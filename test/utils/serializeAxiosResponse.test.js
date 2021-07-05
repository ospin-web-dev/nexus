/* eslint-disable max-classes-per-file */
const serializeAxiosResponse = require('utils/serializeAxiosResponse')

describe('serializeAxiosResponse', () => {

  it('returns a function that, when invoked, calls the function with the passed args', async () => {
    const fn = jest.fn()
    const res = serializeAxiosResponse(fn)

    const args = [ 'a', 'b' ]
    res(...args)

    expect(fn).toHaveBeenCalledWith(...args)
  })

  it('awaits async functions', async () => {
    const fn = serializeAxiosResponse(() => Promise.resolve('<3 u angelo M.'))

    const res = await fn()
    expect(res.success).toBe(true)
  })

  describe('when the async function returns successfully', () => {
    it('returns a serialized object with the response set to \'data\'', async () => {
      const data = { some: 'data', wouldBe: 'nice' }

      const fn = serializeAxiosResponse(() => Promise.resolve(data))
      const res = await fn()

      expect(res).toStrictEqual(expect.objectContaining({
        success: true,
        data,
        error: null,
        status: 200,
      }))
    })
  })

  describe('when the async function throws error', () => {

    class ServerError extends Error {

      constructor(...args) {
        super(...args)
        this.response = {
          status: 500,
          data: { message: 'server error' },
        }
      }

    }

    class NotFoundError extends Error {

      constructor(...args) {
        super(...args)
        this.response = {
          status: 400,
          data: { message: 'auth error' },
        }
      }

    }

    it('returns a serialized object with the error message and status fields parsed out to reflect a not found error', async () => {
      const serverError = new ServerError()
      const fnA = serializeAxiosResponse(() => Promise.reject(serverError))
      const resA = await fnA()

      expect(resA).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: serverError.response.data.message,
        error: serverError,
        status: 500,
      }))

      const notFoundError = new NotFoundError()
      const fnB = serializeAxiosResponse(() => Promise.reject(notFoundError))
      const resB = await fnB()

      expect(resB).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error: notFoundError,
        errorMsg: notFoundError.response.data.message,
        status: 400,
      }))
    })

    describe('when the async function throws the special nonsense auth error that has a different message structure', () => {

      class AuthError extends Error {

        constructor(...args) {
          super(...args)
          this.response = {
            status: 401,
            message: 'auth error',
          }
        }

      }

      it('returns a serialized object with the error message and status fields parsed out to reflect and auth error', async () => {
        const authError = new AuthError()
        const fn = serializeAxiosResponse(() => Promise.reject(authError))
        const res = await fn()

        expect(res).toStrictEqual(expect.objectContaining({
          success: false,
          data: null,
          error: authError,
          errorMsg: authError.message,
          status: 401,
        }))
      })
    })

  })

})
