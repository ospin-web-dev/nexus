const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../utils/objUtils')

module.exports = serializeAxiosResponse(
  ({ limit, processId, startTime, endTime, deviceId, userId }) => (
    API.get('log', '', {
      queryStringParameters: removeUndefinedKeys({
        limit,
        processId,
        startTime,
        endTime,
        deviceId,
        userId,
      }),
      ...DEFAULT_REQ_OPTS,
    })
  ),
)
