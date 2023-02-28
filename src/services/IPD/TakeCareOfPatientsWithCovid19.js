import Service from '../Service'

class TakeCareOfPatientsWithCovid19 extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/TakeCareOfPatientsWithCovid19', parameters)
  }
}

export default TakeCareOfPatientsWithCovid19
