import Vue from 'vue'
import utils from '../utils'
class BaseService {
  /**
   * The constructor of the BaseService.
   *
   * @param {string} endpoint   The endpoint being used.
   * @param {Object} parameters The parameters for the request.
   */
  constructor (endpoint, parameters = {}) {
    this.endpoint = endpoint
    this.parameters = parameters
  }
  hideErrorMsg () {
    this.setParameter('hidemsg', true)
    return this
  }
  hideLoading () {
    this.setParameter('noLoading', true)
    return this
  }
  /**
   * Method used to set the query parameters.
   *
   * @param {Object} parameters The given parameters.
   *
   * @returns {BaseService} The instance of the proxy.
   */
  setParameters (parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[key] = parameters[key]
    })

    return this
  }

  /**
   * Method used to set a single parameter.
   *
   * @param {string} parameter The given parameter.
   * @param {*} value The value to be set.
   *
   * @returns {BaseService} The instance of the proxy.
   */
  setParameter (parameter, value) {
    this.parameters[parameter] = value

    return this
  }

  /**
   * Method used to remove all the parameters.
   *
   * @param {Array} parameters The given parameters.
   *
   * @returns {BaseService} The instance of the proxy.
   */
  removeParameters (parameters) {
    parameters.forEach((parameter) => {
      delete this.parameters[parameter]
    })

    return this
  }

  /**
   * Method used to remove a single parameter.
   *
   * @param {string} parameter The given parameter.
   *
   * @returns {BaseService} The instance of the proxy.
   */
  removeParameter (parameter) {
    delete this.parameters[parameter]
    return this
  }

  /**
   * The method used to perform an AJAX-request.
   *
   * @param {string}      requestType The request type.
   * @param {string}      url         The URL for the request.
   * @param {Object|null} data        The data to be send with the request.
   *
   * @returns {Promise} The result in a promise.
   */
  submit (requestType, url, data = null) {
    // this.setParameter('_currrentUrl', Vue.router.currentRoute.fullPath)
    // var m = process.env.API_URL
    if (requestType === 'export') {
      window.open(process.env.API_URL + url + this.getParameterString(), '_blank')
      return
    }
    return new Promise((resolve, reject) => {
      Vue.$http.defaults.headers.common.RequestId = utils.makeid(80)
      Vue.$http[requestType](url + this.getParameterString(), data, { useCredentails: true })
        .then((response) => {
          resolve(response.data)
        })
        .catch(({ response }) => {          
          Vue.notify({
            type: 'error',
            group: 'foo',
            title: 'Something went wrong!',
            text: 'Please try again after few minutes!'
          })
          if (response) {
            reject(response)
          } else {
            // reject(new Error(response))
            const result = this.submit('get', 'api/Account/logout')
            result.then((ok) => {
              window.location.href = ok.url
            })  
          }
        })
    })
  }

  /**
   * Method used to fetch all items from the API.
   *
   * @returns {Promise} The result in a promise.
   */
  all () {
    return this.submit('get', `/${this.endpoint}`)
  }

  /**
   * Method used to fetch a single item from the API.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  find (id) {
    return this.submit('get', `/${this.endpoint}/${id}`)
  }
  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create (item, ext = '') {
    return this.submit('post', `/${this.endpoint}${ext}`, item)
  }
  /**
   * Method used to update an item.
   *
   * @param {int}    id   The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  update (id, item, ext = '') {
    return this.submit('post', `/${this.endpoint}${ext}${id}`, item)
  }
  patch (id, item) {
    return this.submit('patch', `/${this.endpoint}${id}`, item)
  }
  export () {
    this.parameters.export = 'True'
    return this.submit('export', `${this.endpoint}`)
  }
  /**
   * Method used to destroy an item.
   *
   * @param {int} id The given identifier.
   *
   * @returns {Promise} The result in a promise.
   */
  destroy (id) {
    return this.submit('delete', `/${this.endpoint}/${id}`)
  }

  /**
   * Method used to transform a parameters object to a parameters string.
   *
   * @returns {string} The parameter string.
   */
  getParameterString () {
    const keys = Object.keys(this.parameters)
    var parameterStrings = keys
      .filter(key => !!this.parameters[key])
      .map(key => `${key}=${this.parameters[key]}`)
    // console.log(window.location)
    // parameterStrings.push(`_currentRoute=${window.location.hash}`)
    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`
  }
}

export default BaseService
