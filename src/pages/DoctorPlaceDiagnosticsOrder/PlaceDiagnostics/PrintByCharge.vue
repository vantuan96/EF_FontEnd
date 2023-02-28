/* eslint-disable vue/require-v-for-key */
/* eslint-disable vue/require-v-for-key */
/* eslint-disable vue/valid-v-for */
/* eslint-disable vue/no-template-key */
/* eslint-disable vue/no-template-key */
/* eslint-disable vue/no-template-key */
<template>
  <div v-if="data">
    <modal name="ChargePopupPrint" transition="pop-out" id="ChargePopupPrint" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup">
        <div class="box-body padding-15 box-modal-auto">
          <div id="print-charge-web">
            <table style="width: 100%">
              <thead>
                <tr>
                  <td>
                    <table style="width: 100%">
                      <tr>
                        <td>
                          <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
                        </td>
                        <td>
                          <div class="text-center" style="font-size: 12pt;"><b>{{Site.ViName}}</b></div>
                          <div class="text-center" style="font-size: 11pt;"><b>{{Site.EnName}}</b></div>
                          <div class="text-center no-wrap" style="font-size: 10pt;">Địa chỉ/ Add: {{Site.Address}}</div>
                          <div class="text-center no-wrap" style="font-size: 10pt;">Điện thoại/ Tel: {{Site.PhoneNumber}} Hotline: {{Site.Hotline}} EMERGENCY: {{Site.Emergency}}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <VueBarcode v-if="Customer.PID" v-bind:value="Customer.PID" :height="30" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="0" :fontSize="13"/>
                        </td>
                        <td>
                          <div class="text-center" style="font-size: 12pt; text-transform: uppercase;">
                            <div class="text-center"><b>PHIẾU CHỈ ĐỊNH/ REQUEST ORDER</b></div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table width="100%">
                      <tr>
                        <td width="150" class="no-wrap">Bệnh nhân/ Patient's name:</td><td><b>{{Customer.Fullname}}</b></td>
                        <td width="120" class="no-wrap">Giới tính/ Sex:</td><td> {{GENDER[Customer.Gender]}}</td>
                      </tr>
                      <tr>
                        <td width="150" class="no-wrap">Ngày sinh/ Dob:</td><td> {{Customer.DateOfBirth | formatDate2}}</td>
                        <td width="120" class="no-wrap">Điện thoại/ Tel:</td><td> {{Customer.Phone}}</td>
                      </tr>
                      <tr>
                        <td colspan="4">Địa chỉ/ Address: {{Customer.Address}}</td>
                      </tr>
                      <tr>
                        <td colspan="4">Nơi chỉ định/ Order Location: {{chargeData.AreaName}}</td>
                      </tr>
                      <tr>
                        <td colspan="4">Ngày chỉ định/ Order date: {{data.CreatedAt | formatDate2}}</td>
                      </tr>
                      <tr>
                        <td colspan="4">Chẩn đoán/ Diagnosis: {{data.Diagnosis}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(group, gindex) in Types" v-if="Items.find(e => e.ServiceType === gindex)">
                  <tr :key="gindex">
                    <th style="padding: 5px 0;font-size: 16px;;font-size: 16px;">{{__t(group)}}</th>
                  </tr>
                  <tr  v-for="(item, index) in Items" v-if="item.ServiceType === gindex" :key="index + 'x' + gindex">
                    <td>
                      <div style="border: 1px solid rgb(204, 204, 204);padding:3px 10px;">
                        <p style="margin-top: 0"><input @click="setIndex(item)" class="mr-5 only-web-page" type="checkbox" v-model="item.Selected" /><b>{{__label(item.Service)}}</b>- ({{item.Service.Code}})</p>
                        <p v-if="item.Qty > 1">Số lượng/ Quantity: {{item.Qty}}</p>
                        <template v-else><p v-if="item.Quantity > 1">Số lượng/ Quantity: {{item.Quantity}}</p></template>
                        <!-- <p>Thứ tự ưu tiên/ Priority: {{item.Priority === 'W' ? 'Khẩn cấp/ Urgent' : 'Thường quy'}}</p> -->
                        <!-- <p v-if="item.Reason">Lý do/ Reason: {{item.Reason}}</p> -->
                        <p v-if="item.AdditionalInformation">Yêu cầu/ Requirement: {{item.AdditionalInformation}}</p>
                        <div v-if="item.Comments">Ghi chú/ Doctor's Note: {{item.Comments}}</div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <table width="100%">
                      <tr>
                        <td width="100%">
                        </td>
                        <td>
                          <div class="text-center no-wrap"><b>Bác sĩ ra chỉ định/ Ordering Doctor</b></div>
                          <div class="text-center no-wrap"><i>(Ký và ghi rõ họ tên/ Full name and Signature)</i></div>
                          <br/>
                          <br/><br/>
                          <div class="text-center no-wrap"><b>{{User.Fullname}}</b></div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            <div id="print-charge" class="print-charge-hidden">
              <table style="width: 100%">
                <thead>
                  <tr>
                    <td>
                      <table style="width: 100%">
                        <tr>
                          <td>
                            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
                          </td>
                          <td>
                            <div class="text-center" style="font-size: 12pt;"><b>{{Site.ViName}}</b></div>
                            <div class="text-center" style="font-size: 11pt;"><b>{{Site.EnName}}</b></div>
                            <div class="text-center no-wrap" style="font-size: 10pt;">Địa chỉ/ Add: {{Site.Address}}</div>
                            <div class="text-center no-wrap" style="font-size: 10pt;">Điện thoại/ Tel: {{Site.PhoneNumber}} Hotline: {{Site.Hotline}} EMERGENCY: {{Site.Emergency}}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style="margin: 10px;">
                              <VueBarcode
                                v-if="Customer.PID"
                                v-bind:value="Customer.PID"
                                :height="30"
                                :displayValue="false"
                                :textAlign="'left'"
                                :width="1"
                                :margin="0"
                                :fontSize="13"
                              />
                              <div v-if="Customer.PID" style="font: 13px monospace;">{{Customer.PID}}</div>
                            </div>
                          </td>
                          <td>
                            <div class="text-center" style="font-size: 12pt; text-transform: uppercase;">
                              <div class="text-center"><b>PHIẾU CHỈ ĐỊNH/ REQUEST ORDER</b></div>
                            </div>
                          </td>
                        </tr>
                      </table>
                      <table width="100%">
                        <tr>
                          <td width="150" class="no-wrap">Bệnh nhân/ Patient's name:</td><td><b>{{Customer.Fullname}}</b></td>
                          <td width="120" class="no-wrap">Giới tính/ Sex:</td><td> {{GENDER[Customer.Gender]}}</td>
                        </tr>
                        <tr>
                          <td width="150" class="no-wrap">Ngày sinh/ Dob:</td><td> {{Customer.DateOfBirth | formatDate2}}</td>
                          <td width="120" class="no-wrap">Điện thoại/ Tel:</td><td> {{Customer.Phone}}</td>
                        </tr>
                        <tr>
                          <td colspan="4">Địa chỉ/ Address: {{Customer.Address}}</td>
                        </tr>
                        <tr>
                          <td colspan="4">Nơi chỉ định/ Order Location: {{chargeData.AreaName}}</td>
                        </tr>
                        <tr>
                          <td colspan="4">Ngày chỉ định/ Order date: {{data.CreatedAt | formatDate2}}</td>
                        </tr>
                        <tr>
                          <td colspan="4">Chẩn đoán/ Diagnosis: {{data.Diagnosis}}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(group, gindex) in Types" v-if="Items.find(e => e.ServiceType === gindex)">
                    <tr :key="gindex">
                      <th style="padding: 5px 0;font-size: 16px;">{{__t(group)}}</th>
                    </tr>
                    <template v-for="(item, iin) in formated" v-if="item.ServiceType === gindex">
                      <tr :key="iin + '-' + gindex">
                        <td>
                          <div style="border: 1px solid rgb(204, 204, 204);padding:3px 10px;">
                            <div class="display-flex flex-between">
                              <div>
                                <p style="margin-top: 0"><b>{{__label(item.Service)}}</b> - ({{item.Service.Code}})</p>
                                <p v-if="item.Qty > 1">Số lượng/ Quantity: {{item.Qty}}</p>
                                <template v-else><p v-if="item.Quantity > 1">Số lượng/ Quantity: {{item.Quantity}}</p></template>
                                <!-- <p>Thứ tự ưu tiên/ Priority: {{item.Priority === 'W' ? 'Khẩn cấp/ Urgent' : 'Thường quy'}}</p> -->
                                <!-- <p v-if="item.Reason">Lý do/ Reason: {{item.Reason}}</p> -->
                                <p v-if="item.AdditionalInformation">Yêu cầu/ Requirement: {{item.AdditionalInformation}}</p>
                                <div v-if="item.Comments">Ghi chú/ Doctor's Note: {{item.Comments}}</div>
                              </div>
                              <div><span style="margin-top: 10px" class="square-text hidden-text">xx</span></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </template>
                </tbody>
                <tfoot>
                  <tr>
                    <td>
                      <table width="100%">
                        <tr>
                          <td width="100%">
                          </td>
                          <td>
                            <div class="text-center no-wrap"><b>Bác sĩ ra chỉ định/ Ordering Doctor</b></div>
                            <div class="text-center no-wrap"><i>(Ký và ghi rõ họ tên/ Full name and Signature)</i></div>
                            <br/>
                            <br/><br/>
                            <div class="text-center no-wrap"><b>{{User.Fullname}}</b></div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" :class="{'disabled': noValidate}" class="btn btn-block v-yellow-btn" @click="print()">{{__t('In các dịch vụ đã chọn')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
const MODAL_WIDTH = 970
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=no',
    'scrollbars=yes'
  ],
  styles: [
    process.env.API_URL + '/Content/print-page.css'
  ]
}
export default {
  name: 'PrintByCharge',
  props: ['fulldata'],
  mixins: [],
  data () {
    return {
      Types: ['Dịch vụ xét nghiệm', 'Dịch vụ CĐHA', 'Dịch vụ chung'],
      modalWidth: MODAL_WIDTH,
      DetailData: null,
      GENDER: constants.GENDERS,
      Items: [],
      Grouped: [],
      data: null,
      Site: {},
      Customer: {},
      User: {},
      chargeData: {}
    }
  },
  components: {
    VueBarcode
  },
  computed: {
    noValidate: function () {
      return !this.Items.find(e => e.Selected)
    },
    formated: function () {
      return _.orderBy(
        this.Items.filter(e => e.Selected),
        ['Sorted'], ['desc']
      )
    }
  },
  mounted () {
    EventBus.$on('openPrintPopup', this.open)
    this.Customer = this.fulldata.Customer
  },
  beforeDestroy () {
    EventBus.$off('openPrintPopup')
  },
  methods: {
    setIndex (item) {
      item.Indexed = new Date().getTime()
      item.Sorted = (item.Priority === 'W' ? 'B' : 'A') + item.Indexed
    },
    open (data, Site, User, chargeData) {
      this.Site = Site
      this.User = User
      this.data = this.cloneObj(data)
      this.chargeData = chargeData
      this.Items = []
      var arr = _.orderBy(this.Items.concat(this.data.Items.filter(e => e.Status && e.Status === 'Placed').map((e) => {
        e.Selected = true
        e.Indexed = new Date().getTime()
        e.Sorted = (e.Priority === 'W' ? 'B' : 'A') + e.Indexed
        return e
      })), ['Sorted'], ['desc']).reduce((r, a) => {
        r[a.ServiceCode] = r[a.ServiceCode] || []
        r[a.ServiceCode].push(a)
        return r
      }, Object.create(null))
      console.log(arr)
      this.Items = Object.keys(arr).map(e => {
        return {
          ...arr[e][0], Qty: arr[e].length
        }
      })
      setTimeout(() => {
        this.$modal.show('ChargePopupPrint')
      }, 100)
    },
    close () {
      this.$modal.hide('ChargePopupPrint')
      this.data = null
      this.Items = []
    },
    print () {
      this.$htmlToPaper('print-charge', false, '')
      setTimeout(() => {
        this.close()
      }, 1000)
    },
    $htmlToPapexr (el, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
              @page {
                margin: 10mm;
              }
            </style>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `)
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    }
  }
}
</script>
