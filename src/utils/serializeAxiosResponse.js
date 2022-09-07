const HTTPError = require('./HTTPError')

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

/* This can wrap requests from the 'aws-amplify' packages `Auth`and
 * `API` modules.
 *
 * `Auth` response take a different shape than the amplify API
 * module. Most notably, Auth's requests don't accept request options,
 * and do not return an object that matches `{ data, status }`. For
 * this reason,`serializeAxiosResponse` returns `...rest` as the
 * response `data` when it can find no response data in a successful
 * request (which is the case with `Auth` endpoint responses). */
module.exports = fn => (
  async (...args) => {
    try {
      const { status, data, ...rest } = await fn(...args)
      return {
        status,
        data: data || rest,
      }
    } catch (e) {
      throw new HTTPError({
        message: extractErrorMsg(e),
        error: e,
        status: extractStatusCode(e),
      })
    }
  }
)
