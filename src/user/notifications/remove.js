const {default: API} = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(({ userId, notificationId }) => API.del(
  'user',
  `${userId}/notification/${notificationId}`,
  DEFAULT_REQ_OPTS,
))
