import Service from './Service'

class HIVTestingConsentServices extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD', action) {
    super(`api/${type}/HIVTestingConsent/${action}`, parameters)
  }
}

export default HIVTestingConsentServices
