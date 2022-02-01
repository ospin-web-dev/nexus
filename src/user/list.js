const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../utils/objUtils')

module.exports = serializeAxiosResponse(
  ({ deviceId, processId }) => API.get('user', '', {
    queryStringParameters: removeUndefinedKeys({
      processId,
      deviceId,
    }),
    ...DEFAULT_REQ_OPTS,
  }),
)
