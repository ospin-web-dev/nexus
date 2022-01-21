const {default: API} = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(({
  originId,
  sourceName,
  sourceType,
  topic,
  message,
}) => API.put(
  'user',
  'notifications',
  {
    body: {
      originId,
      sourceName,
      sourceType,
      topic,
      message,
    },
    ...DEFAULT_REQ_OPTS,
  },
))
