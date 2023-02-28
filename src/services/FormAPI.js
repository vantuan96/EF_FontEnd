import Service from './Service'

class FormAPI extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api', parameters)
  }
  GetList () {
    return this.submit('get', `/${this.endpoint}/GetList/${this.getUrlApi()}`)
  }
  GetDetail (FormId) {
    return this.submit('get', `/${this.endpoint}/GetDetail/${this.getUrlApi(FormId)}`)
  }
  CheckGetDetail (FormId) {
    return this.submit('get', `/${this.endpoint}/IsCheckGetDetail/${this.getUrlApi(FormId)}`)
  }
  CreateForm (data) {
    return this.submit('post', `/${this.endpoint}/CreateForm/${this.getUrlApi()}`, data)
  }
  UpdateForm (FormId, data) {
    return this.submit('post', `/${this.endpoint}/UpdateForm/${this.getUrlApi(FormId)}`, data)
  }
  ConfirmForm (FormId, data) {
    return this.submit('post', `/${this.endpoint}/ConfirmForm/${this.getUrlApi(FormId)}`, data)
  }
  getUrlApi (FormId) {
    return `${this.parameters.VisitType}/${this.parameters.FormCode}/${this.parameters.VisitId}${FormId ? '/' + FormId : ''}`
  }
}

export default FormAPI
