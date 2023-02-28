import Service from './Service'

class Account extends Service {
  /**
   * The constructor for the ArtistService.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/user/', parameters)
  }
  ChooseSite ({ SiteId, SpecialtyId }) {
    const data = {
      SiteId,
      SpecialtyId
    }
    return this.submit('post', `${this.endpoint}ChooseSite/`, data)
  }
  getInfo () {
    return this.submit('get', `${this.endpoint}info/`)
  }
}

export default Account
