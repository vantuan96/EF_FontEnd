import Service from '../Service'

class CreateTable extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/TableData/', parameters)
  }
}

export default CreateTable
