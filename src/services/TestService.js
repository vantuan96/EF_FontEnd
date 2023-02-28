import Service from './Service'

class TestService extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor () {
    super(`api/Account/GetManageApp`)
  }
}

export default TestService
