import Service from './Service'

class ConsentForOperationOrrProcedure extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'IPD') {
    super(`api/${type}/ConsentForOperationOrrProcedure`, parameters)
  }
}

export default ConsentForOperationOrrProcedure
