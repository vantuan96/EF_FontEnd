import Service from './Service'

class DoctorPlaceDiagnosticsOrder extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/DoctorPlaceDiagnosticsOrder', parameters)
  }
  charge (data) {
    return this.submit('post', `${this.endpoint}/Charge/`, data)
  }
  submitCharge (data) {
    return this.submit('post', `${this.endpoint}/ChargeV2/`, data)
  }
  submitDrs (chargeId) {
    return this.submit('post', `${this.endpoint}/ChargeV2/${chargeId}`)
  }
  createOrderSet (data) {
    return this.submit('post', `${this.endpoint}/OrderSets/Create/`, data)
  }
  getOrderSet () {
    return this.submit('get', `${this.endpoint}/OrderSets/List/`)
  }
  deleteOrderSet (id) {
    return this.submit('post', `${this.endpoint}/OrderSets/Delete/${id}`)
  }
  deleteShareOrderSet (id) {
    return this.submit('post', `${this.endpoint}/OrderSets/DeleteShare/${id}`)
  }
  draft (data) {
    return this.submit('post', `${this.endpoint}/ChargeDraft/`, data)
  }
  ShareOrderSetForUser (data) {
    return this.submit('post', `${this.endpoint}/OrderSets/ShareForUsers/${data.Id}`, {Usernames: data.Usernames ? data.Usernames.split(',') : []})
  }
}

export default DoctorPlaceDiagnosticsOrder
