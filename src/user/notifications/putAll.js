const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')

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
  },
))
