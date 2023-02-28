<template>
  <div class="main-content" id="ComplexOutpatientCaseSummary-page">
    <h2 class="text-center" v-if="!viewOnly">{{__t('general.theo_doi_ca_benh_phuc_tap')}}</h2>
    <div class="text-note">
      <p>- {{__t('Ca bệnh ngoại trú phức tạp là những bệnh nhân có từ 2 bệnh mãn tính trở lên và được điều trị ở 2 chuyên khoa trở lên')}}</p>
      <p>- {{__t('Mẫu tóm tắt này cần được hoàn thành trong vòng 3 lần bệnh nhân đến khám ngoại trú, kể từ khi được xếp vào nhóm ca bệnh phức tạp')}}</p>
      <p>- {{__t('Khi bệnh nhân được chẩn đoán là ca bệnh phức tạp, bác sĩ khám ban đầu là người tổng kết và hoàn thành bảng tóm tắt ca bệnh, ở những lần sau, bác sĩ chuyên khoa nào có chẩn đoán mới thì bổ sung thông tin')}}</p>
    </div>
    <div class="highlighted-box v-box-allergies">
      <p>{{__t('Thông tin dị ứng')}}</p>
      <label v-if="OutpatientCaseSummaryData.Allergies">{{__t('Do điều dưỡng khai thác')}}</label>
      <vue-scrolling-table v-if="OutpatientCaseSummaryData.Allergies">
        <template slot="tbl">
          <table class="table">
            <thead>
              <tr>
                <th>{{__t('Thông tin dị ứng')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr :data="item" :key="i" v-for="(item,i) in OutpatientCaseSummaryData.Allergies">
                <td><p>{{item}}</p></td>
              </tr>
              <tr v-if="OutpatientCaseSummaryData.Allergies.length === 0">
                <td colspan="2" class="text-center">
                  {{__t('Chưa có ghi nhận')}}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-scrolling-table>
      <br/>
      <label v-if="OutpatientCaseSummaryData.HistoryOfAllergies">{{__t('Do bác sĩ khai thác')}}</label>
      <vue-scrolling-table v-if="OutpatientCaseSummaryData.HistoryOfAllergies">
        <template slot="tbl">
          <table class="table">
            <thead>
              <tr>
                <th>{{__t('Thông tin dị ứng')}}</th>
                <th>{{__t('Khoa phòng')}}</th>
                <th>{{__t('Bác sĩ')}}</th>
                <th>{{__t('Thời gian')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr :data="item" :key="i" v-for="(item,i) in OutpatientCaseSummaryData.HistoryOfAllergies">
                <td><p>{{item.HistoryOfAllergies}}</p></td>
                <td>{{__label(item)}}</td>
                <td><ad-Info :ad="item.Username" /></td>
                <td>{{item.ExaminationTime}}</td>
              </tr>
              <tr v-if="OutpatientCaseSummaryData.HistoryOfAllergies.length === 0">
                <td colspan="4" class="text-center">
                  {{__t('Chưa có ghi nhận')}}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-scrolling-table>
    </div>
    <div class="v-box-allergies">
      <p>{{__t('Thông tin chẩn đoán ICD')}}</p>
      <vue-scrolling-table v-if="OutpatientCaseSummaryData.ICDVisits">
        <template slot="tbl">
          <table class="table">
            <thead>
              <tr>
                <th class="no-wrap" width="40%">{{__t('Chẩn đoán')}}</th>
                <th width="40%">{{__t('ICD')}}</th>
                <th>{{__t('Khoa phòng')}}</th>
                <th class="no-wrap">{{__t('Bác sĩ chẩn đoán')}}</th>
                <th class="no-wrap">{{__t('Ngày giờ chẩn đoán')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr :data="item" :key="j" v-for="(item,j) in OutpatientCaseSummaryData.ICDVisits">
                <td><p>{{item.Diagnosis}}</p></td>
                <td>
                  <span :data="icd" :key="iii" v-for="(icd,iii) in item.ICDs" class="" :class="{'highlighted-text': icd.IsChronic, '': !icd.IsChronic}">
                    {{icd.Code}}<template v-if="icd.ViName"> - {{icd.ViName}}</template><template v-if="iii < (item.ICDs.length - 1)">, </template>
                  </span>
                </td>
                <td class="no-wrap">{{__label(item.Specialty)}}</td>
                <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" /></td>
                <td class="no-wrap">{{item.ExaminationDate}}</td>
              </tr>
              <tr v-if="OutpatientCaseSummaryData.ICDVisits.length === 0">
                <td colspan="4" class="text-center">
                  {{__t('Chưa có ghi nhận')}}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </vue-scrolling-table>
    </div>
    <table class="table header-table">
      <tr>
        <th rowspan="2" width="1">
          {{__t('Ngày')}}
        </th>
        <th rowspan="2" width="30%">
          {{__t('Các bệnh chính')}} <span>({{__t('bao gồm các chẩn đoán nội khoa, phẫu thuật, thủ thuật')}})</span>
        </th>
        <th colspan="4" class="text-center">{{__t('Thuốc')}}</th>
        <th rowspan="2" width="1"><div class="no-wrap">{{__t('Họ tên bác sĩ')}}</div></th>
      </tr>
      <tr>
        <th>{{__t('Tên thuốc')}}</th>
        <th>{{__t('Liều dùng')}}</th>
        <th>{{__t('Đường dùng')}}</th>
        <th>{{__t('Ngày dùng')}}</th>
      </tr>
      <template v-for="(item,i) in OutpatientCaseSummaryData.Datas">
        <tr :data="item" :key="i">
          <td :rowspan="item.rowspan">
            <div class="no-wrap">{{item.CreateAt}}</div>
          </td>
          <td :rowspan="item.rowspan">
            <p>{{item.MainDiseases}}</p>
          </td>
          <td>
            <p :class="{'vvhidden' : item.OrdersParse[0].Status === 1}">{{item.OrdersParse[0].Drug}}</p>
            <div v-if="$store.state.account.Username !== item.Username && item.OrdersParse[0].Status !== 1">
              <button  v-if="!viewOnly" @click="requestRemoveDrug(item, item.OrdersParse[0])" class="btn btn-xs v-white-btn">{{__t('Yêu cầu xóa')}}</button>
            </div>
            <div v-if="item.OrdersParse[0].User !== $store.state.account.Username && item.OrdersParse[0].Status === 1">
              <button class="btn btn-xs v-yellow-btn"  v-if="!viewOnly" @click="viewRequest(item.OrdersParse[0])">{{__t('Lý do yêu cầu xóa')}}</button>
            </div>
            <div v-if="item.OrdersParse[0].User === $store.state.account.Username && item.OrdersParse[0].Status === 1">
              <button class="btn btn-xs v-white-btn" v-if="!viewOnly" @click="removeRequest(item, item.OrdersParse[0])">{{__t('Hủy yêu cầu xóa')}}</button>
            </div>
          </td>
          <td>
            <p :class="{'vvhidden' : item.OrdersParse[0].Status === 1}">{{item.OrdersParse[0].Dosage}}</p>
          </td>
          <td>
            <p :class="{'vvhidden' : item.OrdersParse[0].Status === 1}">{{item.OrdersParse[0].Route}}</p>
          </td>
          <td>
            <p :class="{'vvhidden' : item.OrdersParse[0].Status === 1}">{{item.OrdersParse[0].UsedAt}}</p>
          </td>
          <td :rowspan="item.rowspan">
            <ad-Info :ad="item.Username" />
            <button v-if="!viewOnly && $store.state.account.Username === item.Username" @click="edit(item)" class="btn btn-default btn-block">{{__t('Sửa')}}</button>
          </td>
        </tr>
        <tr :data="order" :key="j + '-abx-' + i" v-for="(order, j) in item.OrdersParse" v-if="j > 0">
          <td>
            <p :class="{'vvhidden' : order.Status === 1}">{{order.Drug}}<p>
            <div v-if="$store.state.account.Username !== item.Username && order.Status !== 1">
              <button v-if="!viewOnly" @click="requestRemoveDrug(item, order)" class="btn btn-xs v-white-btn">{{__t('Yêu cầu xóa')}}</button>
            </div>
            <div v-if="order.User !== $store.state.account.Username && order.Status === 1">
              <button v-if="!viewOnly" class="btn btn-xs v-yellow-btn" @click="viewRequest(order)">{{__t('Lý do yêu cầu xóa')}}</button>
            </div>
            <div v-if="order.User === $store.state.account.Username && order.Status === 1">
              <button v-if="!viewOnly" class="btn btn-xs v-white-btn" @click="removeRequest(item, order)">{{__t('Hủy yêu cầu xóa')}}</button>
            </div>
          </td>
          <td>
            <p :class="{'vvhidden' : order.Status === 1}">{{order.Dosage}}</p>
          </td>
          <td>
            <p :class="{'vvhidden' : order.Status === 1}">{{order.Route}}</p>
          </td>
          <td>
            <p :class="{'vvhidden' : order.Status === 1}">{{order.UsedAt}}</p>
          </td>
        </tr>
      </template>
      <tr v-if="OutpatientCaseSummaryData.Datas.length === 0">
        <td colspan="7" class="text-center">
          {{__t('Chưa có ghi nhận')}}
        </td>
      </tr>
    </table>
    <div class="form-content-2 no-bsorder no-bg" v-if="!viewOnly">
      <div class="row">
        <div class="col-md-2">
          <button class="btn btn-block v-white-btn" @click="back()">{{__t('Quay Lại')}}</button>
        </div>
        <div class="col-md-8">
        </div>
        <div class="col-md-2">
          <button class="btn btn-block v-yellow-btn" @click="sync({})">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </div>
    <modal name="requestRemoveDrug" transition="pop-out" height="auto" :clickToClose="false" :width="450">
      <div class="box v-model-content-popup" v-if="selectedOrder">
        <div class="box-header text-center">
          <b class="text-white">{{__t('Yêu cầu xóa')}}</b>
        </div>
        <div class="box-body padding-15">
          <p><label>{{__t('Bạn có chắc chắn muốn xóa thuốc này?')}}</label></p>
          <label required>{{__t('Lý do yêu cầu xóa')}}</label>
          <textarea-autosize :class="{'error': errorInput.ContentRequestRemove}" class="form-control" rows="3" v-model="selectedOrder.ContentRequestRemove"/>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="CancelRequestRemoveDrug()">{{__t('Quay lại')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block v-yellow-btn" @click="SubmitRequestRemoveDrug()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
    <modal name="removerequestRemoveDrug" transition="pop-out" height="auto" :clickToClose="false" :width="450">
      <div class="box v-model-content-popup" v-if="selectedOrder">
        <div class="box-header text-center">
          <b class="text-white">{{__t('Yêu cầu xóa')}}</b>
        </div>
        <div class="box-body padding-15">
          <p><label>{{__t('Bạn có chắc chắn muốn xóa thuốc này?')}}</label></p>
          <label>{{__t('Lý do yêu cầu xóa')}}</label>
          <p>{{selectedOrder.ContentRequestRemove}}</p>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="$modal.hide('removerequestRemoveDrug')">{{__t('Quay lại')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block v-yellow-btn" @click="SubmitRequestRemoveDrug()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
    <modal name="viewRemoveDrug" transition="pop-out" height="auto" :clickToClose="false" :width="450">
      <div class="box v-model-content-popup" v-if="viewItem">
        <div class="box-header text-center">
          <b class="text-white">{{__t('Lý do yêu cầu xóa')}}</b>
        </div>
        <div class="box-body padding-15">
          <label>{{__t('Lý do yêu cầu xóa')}}:</label>
          <p>{{viewItem.ContentRequestRemove}}</p>
          <label>{{__t('Người yêu cầu xóa')}}: <ad-Info :ad="viewItem.User" /></label>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-12 col-md-12"><button type="button" class="btn btn-block" @click="$modal.hide('viewRemoveDrug')">{{__t('Đóng')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
    <modal name="ComplexOutpatientCaseSummaryPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          {{__t('Dữ liệu bệnh nhân')}}
        </div>
        <div class="box-body padding-15">
          <table class="table">
            <thead>
              <tr>
                <th class="v-checkbox v-checkbox-2 v-checkbox-2-2" align="center" width="1">
                  <input type="checkbox" id="checkall" name="checkall" v-model="selectAll">
                  <label for="checkall"></label>
                </th>
                <th>{{__t('Tên thuốc')}}</th>
                <th>{{__t('Liều dùng')}}</th>
                <th>{{__t('Đường dùng')}}</th>
                <th>{{__t('Ngày dùng')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr :data="item" :key="index" v-for="(item,index) in syncData.Orders" >
                <template v-if="item.manual">
                  <td class="v-checkbox v-checkbox-2 v-checkbox-2-2" align="center">
                    <input type="checkbox" :id="'OPDFRSFOPRBR-' + index" :name="'OPDFRSFOPRBR-' + index" v-model="item.selected">
                    <label :for="'OPDFRSFOPRBR-' + index"></label>
                  </td>
                  <td>
                    <medication v-model="item.Drug" />
                    <p v-if="item.User">{{__t('Yêu cầu xóa bởi')}} <b><ad-Info :ad="item.User" /></b> : {{item.ContentRequestRemove}}</p>
                  </td>
                  <td>
                    <input type="text" class="form-control" v-model="item.Dosage" :placeholder="__t('Liều/ số ngày')">
                  </td>
                  <td>
                    <medication-route v-model="item.Route"/>
                  </td>
                  <td>
                    <v-masked-input mask="11/11/1111" v-model="item.UsedAt" :placeholder="vDateFormat" class="form-control" />
                  </td>
                </template>
                <template v-else>
                  <td class="v-checkbox v-checkbox-2 v-checkbox-2-2" align="center">
                    <input type="checkbox" :id="'OPDFRSFOPRBR-' + index" :name="'OPDFRSFOPRBR-' + index" v-model="item.selected">
                    <label :for="'OPDFRSFOPRBR-' + index"></label>
                  </td>
                  <td>
                    {{item.Drug}}
                    <p v-if="item.User">{{__t('Yêu cầu xóa bởi')}} <b><ad-Info :ad="item.User" /></b> : {{item.ContentRequestRemove}}</p>
                  </td>
                  <td>
                    {{item.Dosage}}
                  </td>
                  <td>
                    {{item.Route}}
                  </td>
                  <td>
                    {{item.UsedAt}}
                  </td>
                </template>
              </tr>
              <tr>
                <td colspan="5"><button class="btn btn-block btn-info" @click="manual()">+ {{__t('Thêm mới thuốc')}}</button></td>
              </tr>
            </tbody>
          </table>
          <hr/>
          <label>{{__t('Chẩn đoán xác định')}}</label>
          <textarea-autosize class="form-control" v-model="syncData.MainDiseases"/>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('btn.huy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block v-yellow-btn" @click="submit">{{__t('Xác nhận')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import ComplexOutpatientCaseSummary from '@/services/OPD/ComplexOutpatientCaseSummary'
import MixinForm from '@/mixins/form.js'
import utils from '@/utils'
import EventBus from '@/lib/eventBus'
const MODAL_WIDTH = 980
export default {
  /**
   * The name of the page.
   */
  name: 'ComplexOutpatientCaseSummary',
  props: ['viewOnly'],
  mixins: [MixinForm],
  data () {
    return {
      DataSubmit: {
      },
      interval: null,
      modalWidth: MODAL_WIDTH,
      syncData: {
        MainDiseases: '',
        Orders: []
      },
      OutpatientCaseSummaryData: {
        Datas: [],
        Allergies: null,
        ICDVisits: null,
        HistoryOfAllergies: null
      },
      selected: [],
      requestRemoveDrugItem: null,
      selectedOrder: {
        ContentRequestRemove: ''
      },
      viewItem: null,
      errorInput: {
        ContentRequestRemove: false
      }
    }
  },
  components: {
  },
  /**
   * The components that the page can use.
   */
  // components: {MaskedInput},
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    this.interval = setInterval(() => {
      if (this.$store.state.account.CurrentPatient) {
        clearInterval(this.interval)
        this.getData()
      }
    }, 500)
  },
  watch: {
    'selectedOrder.ContentRequestRemove': function (val) {
      this.errorInput.ContentRequestRemove = val
    }
  },
  computed: {
    selectAll: {
      get: function () {
        return this.syncData.Orders ? this.syncData.Orders.filter(item => item.selected).length === this.syncData.Orders.length : false
      },
      set: function (value) {
        if (value) {
          this.syncData.Orders.forEach(function (item) {
            item.selected = true
          })
        }
      }
    }
  },
  methods: {
    removeRequest (item, order) {
      this.selectedOrder = this.cloneObj(order)
      this.selectedOrder.Status = 0
      // this.selectedOrder.ContentRequestRemove = ''
      // this.selectedOrder.User = this.$store.state.account.Username
      this.requestRemoveDrugItem = this.cloneObj(item)
      this.$modal.show('removerequestRemoveDrug')
    },
    viewRequest (item) {
      // console.log(item)
      this.viewItem = item
      this.$modal.show('viewRemoveDrug')
    },
    CancelRequestRemoveDrug () {
      this.$modal.hide('requestRemoveDrug')
      this.requestRemoveDrugItem = {
        ContentRequestRemove: '',
        Status: ''
      }
    },
    SubmitRequestRemoveDrug () {
      if (!this.selectedOrder.ContentRequestRemove) {
        this.errorInput.ContentRequestRemove = true
        return
      }
      this.errorInput.ContentRequestRemove = false
      var OrdersParse = this.requestRemoveDrugItem.OrdersParse.map(e => {
        if (e.Id === this.selectedOrder.Id) {
          return this.selectedOrder
        }
        return e
      })
      var DataSubmit = {
        VisitTypeGroupCode: this.$store.state.account.Specialty.VisitTypeGroupCode,
        VisitId: this.$route.params.Id,
        MainDiseases: this.requestRemoveDrugItem.MainDiseases,
        Orders: JSON.stringify(OrdersParse),
        Id: this.requestRemoveDrugItem.Id
      }
      new ComplexOutpatientCaseSummary().update('Update/' + this.$store.state.account.CurrentPatient, DataSubmit).then(response => {
        this.makeNoti(this.requestRemoveDrugItem.Id)
        this.CancelRequestRemoveDrug()
        this.$modal.hide('requestRemoveDrug')
        this.$modal.hide('removerequestRemoveDrug')
        this.getData()
        EventBus.$emit('updateGlobalOpd', 'thangdc in here')
        EventBus.$emit('updateGlobalEd', 'thangdc in here')
      })
    },
    makeNoti (id) {
      new ComplexOutpatientCaseSummary({notRedirect: true, hidemsg: true, hideloading: true, noLoading: true}).update('Delete/' + id, {}).then(response => {
      })
    },
    requestRemoveDrug (item, order) {
      this.selectedOrder = this.cloneObj(order)
      this.selectedOrder.Status = 1
      this.selectedOrder.ContentRequestRemove = ''
      this.selectedOrder.User = this.$store.state.account.Username
      this.requestRemoveDrugItem = this.cloneObj(item)
      this.$modal.show('requestRemoveDrug')
    },
    manual () {
      this.syncData.Orders.push({
        Id: '',
        Drug: '',
        Dosage: '',
        Route: '',
        UsedAt: '',
        manual: true,
        selected: true
      })
    },
    submit () {
      var Orders = this.syncData.Orders.filter(o => {
        return o.selected && o.Drug
        // && o.Dosage && o.Route && o.UsedAt
      }).map(e => {
        if (!e.Id) {
          e.Id = utils.makeid(80)
        }
        return e
      })
      var DataSubmit = {
        VisitTypeGroupCode: this.$store.state.account.Specialty.VisitTypeGroupCode,
        VisitId: this.$route.params.Id,
        MainDiseases: this.syncData.MainDiseases,
        Orders: JSON.stringify(Orders)
      }
      if (this.syncData.Id) {
        DataSubmit.Id = this.syncData.Id
      }
      new ComplexOutpatientCaseSummary().update(this.$store.state.account.CurrentPatient, DataSubmit).then(response => {
        this.syncData = {}
        this.$modal.hide('ComplexOutpatientCaseSummaryPopup')
        this.getData()
        EventBus.$emit('updateGlobalOpd', 'thangdc in here')
        EventBus.$emit('updateGlobalEd', 'thangdc in here')
      })
    },
    edit (item) {
      this.sync(item)
    },
    sync (item) {
      var DataSubmit = {
        VisitTypeGroupCode: item.VisitTypeGroupCode || this.$store.state.account.Specialty.VisitTypeGroupCode,
        VisitId: item.VisitId || this.$route.params.Id
      }
      if (item.Id) {
        DataSubmit.Id = item.Id
      }
      new ComplexOutpatientCaseSummary().update(this.$store.state.account.CurrentPatient, DataSubmit, 'sync/').then(response => {
        var Orders = item.OrdersParse || []
        response.Orders.forEach(item => {
          var selected = Orders.filter(e => {
            return e.Id === item.Id
          })
          item.selected = selected.length > 0
          item.manual = false
          item.ContentRequestRemove = selected.length ? selected[0].ContentRequestRemove : null
          item.User = selected.length ? selected[0].User : null
        })
        var manual = Orders.filter(e => {
          return e.manual
        })
        response.Orders = response.Orders.concat(manual)
        response.Id = item.Id
        this.syncData = response
        this.syncData.MainDiseases = item.MainDiseases || this.syncData.MainDiseases
        this.$modal.show('ComplexOutpatientCaseSummaryPopup')
      })
    },
    getData () {
      new ComplexOutpatientCaseSummary().find(this.$store.state.account.CurrentPatient).then(response => {
        response.Datas.forEach(item => {
          var Orders = this.JSONParse(item.Orders)
          item.OrdersParse = Orders.length ? Orders : [{
            Drug: '',
            Dosage: '',
            Route: '',
            UsedAt: ''
          }]
          item.rowspan = item.OrdersParse.length || 1
        })
        this.OutpatientCaseSummaryData = response
      })
    },
    close () {
      this.$modal.hide('ComplexOutpatientCaseSummaryPopup')
    }
  }
}
</script>
