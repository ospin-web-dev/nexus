const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  (id, params) => (
    API.patch('user', `${id}`, { body: params })
  ),
)
