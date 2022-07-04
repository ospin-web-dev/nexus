const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ userId, params }) => API.post('user', `${userId}/licences`, { body: params, ...DEFAULT_REQ_OPTS }),
)
