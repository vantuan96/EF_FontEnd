import Service from './Service'

class Users extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/User/InfoFormAD', parameters)
  }
}

export default Users
