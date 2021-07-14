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

  describe('when calling its wrapped method', () => {
    const endpointMock = jest.fn()
    const wrappedMock = serializeAxiosResponse(endpointMock)
    const expectedRessource = 'user'
    const expectedPath = '/'

    it('should by default set requestOpts to have "response: true"', async () => {
      wrappedMock(expectedRessource, expectedPath)

      expect(endpointMock).toHaveBeenCalledWith(expectedRessource, expectedPath)

    })

    it('should merge requestOpts when additional opts are passed in', async () => {
      const additionalRequestOpts = { parameter: 'value' }
      wrappedMock(expectedRessource, expectedPath, additionalRequestOpts)

      expect(endpointMock).toHaveBeenCalledWith(
        expectedRessource,
        expectedPath,
        { ...additionalRequestOpts },
      )
    })

    it('should always override requestOpts.response to true', async () => {
      const additionalRequestOpts = { response: false }
      wrappedMock(expectedRessource, expectedPath, additionalRequestOpts)

      expect(endpointMock).toHaveBeenCalledWith(
        expectedRessource,
        expectedPath,
      )
    })
  })

  describe('when the async function returns successfully', () => {
    it('should respond with the status code of the response', async () => {
      const data = { status: 201 }
      const fn = serializeAxiosResponse(() => Promise.resolve(data))
      const res = await fn()

      expect(res.status).toBe(data.status)
    })

    it('returns a serialized object with the response set to \'data\'', async () => {
      const response = { data: 'data' }

      const fn = serializeAxiosResponse(() => Promise.resolve(response))
      const res = await fn()

      expect(res).toStrictEqual(expect.objectContaining({
        success: true,
        data: response.data,
        error: null,
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
