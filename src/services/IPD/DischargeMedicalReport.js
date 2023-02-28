import Service from '../Service'

class DischargeMedicalReport extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/Document/DischargeMedicalReport', parameters)
  }
}

export default DischargeMedicalReport
