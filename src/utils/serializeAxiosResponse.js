// without ?. these end up rather ugly!
const extractErrorMsg = error => (
  (
    error
    && error.response
    && error.response.data
    && error.response.data.message
  ) || (error && error.message) || ''
)

const extractStatusCode = error => (
  (
    error
    && error.response
    && error.response.status
  ) || null
)

const DEFAULT_RESPONSE = {
  success: null,
  status: null,
  data: null,
  error: null,
  errorMsg: null,
}

const serializeResponse = res => ({
  ...DEFAULT_RESPONSE,
  ...res,
})

module.exports = fn => (
  async (...args) => {
    try {
      /* the amplify package seems to hide the actual response
       * object by default, and returns the body as the res... */
      const res = await fn(...args)

      return serializeResponse({
        success: true,
        status: 200,
        data: res,
      })

    } catch (e) {
      return serializeResponse({
        success: false,
        status: extractStatusCode(e),
        error: e,
        errorMsg: extractErrorMsg(e),
      })
    }
  }
)
