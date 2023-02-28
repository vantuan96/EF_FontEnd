import Service from '../Service'

class MedicalRecord extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/MedicalRecord/', parameters)
  }
}

export default MedicalRecord
