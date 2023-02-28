import Service from './Service'

class Clinics extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/DiagnosticReporting', parameters)
  }
  ListPending () {
    return this.submit('get', `/${this.endpoint}/List`)
  }
  ByDoctor () {
    return this.submit('get', `/${this.endpoint}/ByDoctor`)
  }
  Pick (ItemId) {
    return this.submit('post', `/${this.endpoint}/Pickup/${ItemId}`)
  }
  AddMurse (ItemId, data) {
    return this.submit('post', `/${this.endpoint}/AddNurse/${ItemId}`, data)
  }
  ListCanLamSang () {
    return this.submit('get', `/${this.endpoint}/ByPID`)
  }
  DetailCanLamSang (Id) {
    return this.submit('get', `/${this.endpoint}/${Id}`)
  }
}

export default Clinics
