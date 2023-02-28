<template>
  <div class="main-content" id="Prescription-Result-page">
    <div class="search-group box" v-if="Customer">
      <div class="row">
        <div class="col-md-12" style="text-transform: uppercase; color: #337AB7; font-weight: bold; font-size: 16px;">
          {{ Customer.Fullname || '' }} <VipIcon :data="Customer" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>PID: </label> {{ Customer.PID }}
        </div>
        <div class="col-md-6">
          <label>{{__t('Dân tộc')}}: </label> {{ Customer.Fork }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>{{__t('Ngày sinh')}}: </label> {{ Customer.DateOfBirth }}
        </div>
        <div class="col-md-6">
          <label>{{__t('Nghề nghiệp')}}: </label> {{ Customer.Job }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>{{__t('Giới tính')}}: </label> {{ __t(GENDER[Customer.Gender]) }}
        </div>
        <div class="col-md-6">
          <label>{{__t('Số điện thoại')}}: </label> {{ Customer.Phone }}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>{{__t('Quốc tịch')}}: </label> {{ Customer.Nationality }}
        </div>
        <div class="col-md-6">
          <label>{{__t('Địa chỉ')}}: </label> {{ Customer.Address }}
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <v-loading />
    </div>
    <template v-if="Data">
      <div id="Prescription-Detail" class="mb-15">
        <b>{{__t('Ngày kê đơn')}}:</b> {{Data[0].CreatedDate | formatDate}} <b class="ml-15">{{__t('Số tiếp nhận')}}:</b> {{Data[0].VisitCode}}  <b class="ml-15">{{__t('Mã đơn thuốc')}}:</b> {{Data[0].PrescriptionCode}} <b class="ml-15">{{__t('Bs kê đơn')}}:</b> <ad-Info v-if="Data[0].PrescriberAD" :ad="Data[0].PrescriberAD" /> <b class="ml-15">{{__t('Chuyên khoa khám')}}:</b> {{Data[0].LocationName}}
      </div>
      <div id="Prescription-Detail-list">
        <b class="pr-10 no-wrap">{{__t('Loại đơn thuốc')}}: </b>
        <span v-if="isMulti"><input @change="check($event)"  type="checkbox" name="checkAll" v-model="checkAll">{{__t('Tất cả')}}</span>
        <span :key="index" :data="value" v-for="(value, name, index) in GroupTypes" class="pl-5" v-if="hasData(name)">
          <input type="checkbox" @change="check($event)" name="checkedType" v-model="checkedType[index]"> {{__t(value)}}
        </span>
        <div class="flex-box flex-center mt-15">
          <b class="pr-10 no-wrap">{{__t('Thứ tự sắp xếp')}}: </b>
          <div>
            <select class="form-control" v-model="DetailData.SortBy">
              <option :value="'1'">{{__t("Sắp xếp theo thứ tự ra đơn của bác sĩ")}}</option>
              <option :value="'2'">{{__t("Sắp xếp theo thứ tự đường dùng")}}</option>
            </select>
          </div>
        </div>
        <div style="text-align: end;">
          <div v-if="DetailData.VisitCodeViMessage !== ''"><i style="color: red">{{__t(DetailData.MedicationInfo.VisitCodeMessage)}}</i></div>
          <div v-if="DetailData.HeightViMessage !== ''"><i style="color: red">{{__t(DetailData.MedicationInfo.HeightMessage)}}</i></div>
          <div v-if="DetailData.WeightViMessage !== ''"><i style="color: red">{{__t(DetailData.MedicationInfo.WeightMessage)}}</i></div>
          <div v-if="DetailData.DiagnosisViMessage !== ''"><i style="color: red">{{__t(DetailData.MedicationInfo.DiagnosisMessage)}}</i></div>
          <div v-if="DetailData.DiagnosisViMessage !== ''"><i style="color: red">{{__t(DetailData.MedicationInfo.AllergyMessage)}}</i></div>
        </div>
        <div id="printMe">
          <div :key="index + 'x'" :data="value" v-for="(value, name, index) in GroupTypes" v-if="hasDataAndChecked(name)" class="p-15 prescription-print">
            <Printer :DetailData="DetailData" :customer="Customer" :data="Groups[name]" :type="name"/>
          </div>
        </div>
        <div id="note-footer" class="only-print-page">
          <div class="text-center" style="color: red"><span><b>Chú ý:</b><i> Để được sắp xếp lịch hẹn khám, quý khách đặt hẹn với tổng đài trước khi đến bệnh viện.</i></span></div>
          <div class="text-center" style="color: red"><span><b>Note:</b><i> To schedule an appointment, please contact our call center to book before coming to the hospital.</i></span></div>
          <table width="100%">
            <tr>
              <td class="text-center" width="50%" style="vertical-align: top;color: red">
                <span style="font-size: 12px !important;"><b>Nhà thuốc Bệnh viện Vinmec:</b><br> Tư vấn sử dụng thuốc an toàn, hiệu quả <br> Cung cấp thuốc đảm bảo chất lượng - Giá thuốc cạnh tranh</span>
              </td>
              <td class="text-center" style="vertical-align: top;color: red">
                <span style="font-size: 12px !important;"><b>Vinmec pharmacy:</b><br>Implementing safe and effective medication counselling service<br>Providing high quality medicines with competitive price</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <FloatBlock>
        <template slot='buttons'>
          <div class="col-md-6 col-sm-6">
            <div class="form-group"></div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="form-group">
              <button class="btn v-yellow-btn pull-right long-btn hvr-ripple-out btn-block" v-shortkey="['ctrl', 'p']" @shortkey="print()" type="button" @click="print()"><i class="fa fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </template>
    <div v-else class="text-center">
      <v-loading />
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import Prescription from '@/services/Prescription'
import CustomerApi from '@/services/CustomerApi'
import Printer from './Print'
import constants from '@/constants'
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=no',
    'scrollbars=yes',
    'width=200'
  ],
  styles: [
  ]
}
export default {
  /**
   * The name of the page.
   */
  name: 'Prescription-Detail',
  data () {
    return {
      DetailData: {
      },
      Data: null,
      Customer: null,
      Detail: {},
      loaded: false,
      Groups: {},
      checkedType: [true, true, true, true],
      checkAll: true,
      GroupTypes: {
        'A': 'Thuốc thông thường',
        'N': 'Thuốc gây nghiện',
        'H': 'Thuốc hướng thần',
        'TP': 'Thực phẩm chức năng'
      },
      GENDER: constants.GENDER,
      DiagnosisFromViHC: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Printer
  },
  watch: {
    // checkAll: {
    //   handler () {
    //     this.checkedType = this.checkedType.map(e => {
    //       return this.checkAll
    //     })
    //   },
    //   deep: true
    // }
  },
  mounted () {
    this.getData()
  },
  computed: {
    isMulti: function () {
      return true
    }
  },
  methods: {
    print () {
      var footertext = document.getElementById('note-footer')
      this.$htmlToPaper('printMe', true, footertext.innerHTML)
    },
    $htmlToPaper (el, footer = true, footertext, cb = () => true) {
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
                size: A4 !important;
                margin-left: 10mm !important;
                margin-right: 10mm !important;
                margin-bottom: 5mm !important;
                margin-top: 10mm !important;
              }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext : ''}
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext : ''}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    hasData (key) {
      return this.Groups[key] && this.Groups[key].length > 0
    },
    hasDataAndChecked (key) {
      return this.Groups[key] && this.Groups[key].length > 0 && (this.checkAll || (key === 'A' && this.checkedType[0]) || (key === 'N' && this.checkedType[1]) || (key === 'H' && this.checkedType[2]) || (key === 'TP' && this.checkedType[3]))
    },
    check (e) {
      const {name, checked} = e.target
      if (name === 'checkAll') {
        this.checkedType = this.checkedType.map(e => {
          return checked
        })
      }
      if (name === 'checkedType') {
        if (!checked) this.checkAll = false
      }
    },
    async getData () {
      await this.getCustomer()
      this.getPrescription()
    },
    async getCustomer () {
      await new CustomerApi({IsGetAgeByMonth: true})
        .find(this.$route.params.PID)
        .then(response => {
          this.Customer = response
        }).catch(e => {
          this.loaded = true
        })
    },
    getPrescription () {
      new Prescription(this.$route.query)
        .find('Detail/' + this.$route.params.PrescriptionId + '/' + this.$route.params.VisitType)
        .then(response => {
          this.DetailData = {...response, SortBy: 1}
          this.Data = response.ListPharmacies
          this.Diagnosi = response.MedicationInfo.CustomerMedicationInfo.DiagnosisInfo
          this.DiagnosisFromViHC = response.MedicationInfo.CustomerMedicationInfo.DiagnosisFromViHC
          this.Groups = response.ListPharmacies.reduce(function (r, a) {
            r[a.DType] = r[a.DType] || []
            r[a.DType].push(a)
            return r
          }, Object.create(null))
          this.loaded = true
        }).catch(e => {
          this.loaded = true
        })
    }
  }
}
</script>
