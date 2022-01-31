const {default: API} = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ userId }) => API.get('user', `${userId}/public`, DEFAULT_REQ_OPTS),
)
