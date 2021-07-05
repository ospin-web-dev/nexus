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

const OVERRIDE_REQUEST_OPTS = {
  response: true,
}

module.exports = fn => (
  async (apiName, path, requestOpts = {}) => {
    try {
      const mergedRequestsOpts = {
        ...requestOpts,
        ...OVERRIDE_REQUEST_OPTS,
      }

      const { status, data } = await fn(apiName, path, mergedRequestsOpts)

      return serializeResponse({
        success: true,
        status,
        data,
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
