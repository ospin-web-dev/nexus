const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc creates a new functionality description
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function create
 * @async
 * @param {Object} params
 * @param {string} params.subType
 * @param {string} [params.displayName=null]
 * @param {string} [params.description=null]
 * @param {string} [params.iconURL=null]
 * @param {string} [params.inputDescriptionImageURL=null]
 * @param {string} [params.imageURL=null]
 * @param {array} [params.slotRelations=[]]
 * @param {array} [params.slotDescriptions=[]]
 * @param {boolean} [params.safeForCustomerUse=false]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  params => API.post('device-description', 'functionality-descriptions', { body: params, ...DEFAULT_REQ_OPTS }),
)
