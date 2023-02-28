import Service from './Service'
import utils from '@/utils.js'
class Auth extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/Account', parameters)
  }

  /**
   * Method used to login.
   *
   * @param {String} username The username.
   * @param {String} password The password.
   *
   * @returns {Promise} The result in a promise.
   */
  login ({ username, password, captcha }) {
    const data = {
      username,
      password,
      captcha
    }
    this.removeCookie()
    return this.submit('post', `${this.endpoint}/login/?_un=${username}&rqid=` + utils.getCookie('EFORM_CLIENT_REQUEST_ID'), data)
  }
  removeCookie () {
    // console.log('here')
  }
  logout () {
    return this.submit('get', `${this.endpoint}/logout/`)
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register (data) {
    return this.submit('post', `${this.endpoint}/register`, data)
  }
}

export default Auth
