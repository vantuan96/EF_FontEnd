import Service from './Service'

class Services extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/DoctorPlaceDiagnosticsOrder/Services', parameters)
  }
  GetPriceService (data) {
    return this.submit('post', `${this.endpoint}/GetPrice/`, data)
  }
  GetDetailService (data) {
    return this.submit('post', `${this.endpoint}/GetDetailService/`, data)
  }
}

export default Services
