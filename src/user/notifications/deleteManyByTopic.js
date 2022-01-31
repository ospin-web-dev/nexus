const {default: API} = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(({ userId, topic }) => API.del(
  'user',
  `${userId}/notifications/${topic}`,
  DEFAULT_REQ_OPTS,
))
