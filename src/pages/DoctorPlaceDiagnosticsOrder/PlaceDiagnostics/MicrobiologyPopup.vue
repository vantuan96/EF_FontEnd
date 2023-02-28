<template>
  <div>
    <modal name="MicrobiologyPopup" transition="pop-out" id="MicrobiologyPopup" height="auto" :clickToClose="false" :width="modalWidth" >
      <div class="box v-model-content-popup" v-if="form">
        <div class="box-header text-center" v-if="!readonly">
          <h3 class="box-title">{{form.Code}} - {{form.ViName}}.</h3>
        </div>
        <div class="box-body padding-15" :class="{'min-height-500': !readonly}">
          <!-- <div class="red italic mrb20">{{__t('Chỉ người tạo phiếu được chỉnh sửa nội dung và không được chỉnh sửa nếu dịch vụ đã thực hiện!')}}</div> -->
          <div class="row">
            <div class="col-md-12">
              <div class="form-group" v-if="form.Microbiology">
                <template v-if="readonly">
                  <div class="flex-box flex-center">
                    <label class="text-left no-wrap mr-10 lb-w2" required>{{__t('Loại mẫu')}}:</label>
                    <div class="input-group mr-5" style="flex-grow: 1">
                      <span class="fake-input disable">{{(TypeGroupList.find(e => e.code === form.Microbiology.STypeGroupID) || {}).label}}, {{(((TypeGroupList.find(e => e.code === form.Microbiology.STypeGroupID) || {}).Items || []).find(e => form.Microbiology.STypeID === e.Code) || {}).ViName}}</span>
                    </div>
                  </div>
                  <div class="flex-box flex-center mt-10 mb-10">
                    <label class="text-left no-wrap mr-10 lb-w2" required>{{__t('Phân tầng kháng sinh')}}:</label>
                    <div class="input-group mr-5" style="flex-grow: 1">
                      <span class="fake-input disable" v-if="readonly">{{(GroupList.find(e => e.code === form.Microbiology.Stratified) || {}).label}}</span>
                      <v-select v-else v-model="form.Microbiology.Stratified" :options="GroupList" />
                    </div>
                  </div>
                </template>
                <template v-else>
                <div class="flex-box flex-center">
                  <label class="text-left no-wrap mr-10 lb-w2" required>{{__t('Loại mẫu')}}:</label>
                  <div class="input-group mr-5" style="flex-grow: 1">
                    <v-select v-model="form.Microbiology.STypeGroupID" :options="TypeGroupList" />
                  </div>
                  <div class="input-group mr-5" style="flex-grow: 1">
                    <v-select v-model="form.Microbiology.STypeID" :options="STypeIDList" />
                  </div>
                  <div>
                    <p class="fake-input disable">{{form.Microbiology.STypeID ? form.Microbiology.STypeID.name : ''}}</p>
                  </div>
                </div>
                <div class="flex-box flex-center mt-10 mb-10">
                  <label v-if="hasValidate002" class="text-left no-wrap mr-10 lb-w2" required>{{__t('Phân tầng kháng sinh')}}:</label>
                  <label v-else class="text-left no-wrap mr-10 lb-w2">{{__t('Phân tầng kháng sinh')}}:</label>
                  <div class="input-group mr-5" style="flex-grow: 1">
                    <v-select v-model="form.Microbiology.Stratified" :options="GroupList" />
                  </div>
                </div>
                </template>
                <button type="button" class="btn" @click="showGuild = !showGuild">
                  <i v-if="showGuild" aria-hidden="true" class="fa fa-angle-double-down"></i>
                  <i v-else aria-hidden="true" class="fa fa-angle-double-up"></i>
                  {{__t('Hướng dẫn chọn phân tầng kháng sinh')}}
                </button>
                <div v-if="showGuild">
                  <h4><b>{{__t('Nhóm 1 - Nhiễm khuẩn mắc phải ở cộng đồng')}}</b></h4>
                  <p class="pl-10">- {{__t('Chưa điều trị tại các cơ sở y tế')}}</p>
                  <p class="pl-10">- {{__t('Chưa dùng kháng sinh trước đó (trong vòng 90 ngày)')}}</p>
                  <p class="pl-10">- {{__t('Không có bệnh lý mạn tính kèm theo')}}</p>
                  <p class="pl-10">- {{__t('NB &#60; 60 tuổi')}}</p>
                  <h4><b>{{__t('Nhóm 2 - Nhiễm khuẩn liên quan chăm sóc y tế')}}</b></h4>
                  <p class="pl-10">- {{__t('Có điều trị ngắn hạn tại các cơ sở y tế, nhưng không có thủ thuật xâm lấn hoặc chỉ tối thiểu')}}<sup>1</sup></p>
                  <p class="pl-10">- {{__t('Có dùng kháng sinh gần đây (trong vòng 90 ngày)')}}</p>
                  <p class="pl-10">- {{__t('Có bệnh mạn tính đi kèm (tiểu đường, suy tạng...)')}}</p>
                  <p class="pl-10">- {{__t('NB > 60 tuổi')}}</p>
                  <h4><b>{{__t('Nhóm 3 - Nhiễm khuẩn mắc phải ở bệnh viện')}}</b></h4>
                  <p class="pl-10">- {{__t('Nằm viện kéo dài >= 5 ngày, đang nằm điều trị tại ICU và/hoặc có thủ thuật xâm lấn')}}</p>
                  <p class="pl-10">- {{__t('Có dùng kháng sinh phổ rộng')}}<sup>2</sup> {{__t('hoặc dùng nhiều kháng sinh gần đây (trong vòng 90 ngày)')}}</p>
                  <p class="pl-10">- {{__t('NB có bệnh lý mạn tính kèm theo: xơ nang (cystic fibrosis), bệnh lý cấu trúc phổi')}}<sup>3</sup>, {{__t('AIDS tiến triển')}}<sup>4</sup>, {{__t('giảm bạch cầu trung tính')}}<sup>5</sup>, {{__t('suy giảm miễn dịch nặng')}}<sup>6</sup></p>
                  <hr/>
                  <p class="pl-10"><i>(1): {{__t('đường truyền tĩnh mạch ngoại biên, hoặc đặt sonde tiểu')}}</i></p>
                  <p class="pl-10"><i>(2): {{__t('Piperacillin, Ticarcillin, Ertapenem, Imipenem, Meropenem, Doripenem')}}</i></p>
                  <p class="pl-10"><i>(3): {{__t('Bệnh lý cấu trúc phổi: bao gồm giãn phế quản, COPD, xơ phổi...')}}</i></p>
                  <p class="pl-10"><i>(4): {{__t('AIDS: nhiễm HIV giai đoạn lâm sàng 4 theo phân loại của WHO hoặc CD4 &#60; 200 tế bào/mm3')}}</i></p>
                  <p class="pl-10"><i>(5): {{__t('Giảm bạch cầu trung tính: số lượng bạch cầu trung tính ở máu ngoại vi &#60; 1500 tế bào/mm3')}}</i></p>
                  <p class="pl-10"><i>(6): {{__t('Suy giảm miễn dịch nặng: ví dụ do sử dụng thuốc chống thải ghép hoặc corticoid kéo dài, xạ trị hoặc điều trị hóa chất chống ung thư,...')}}</i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row text-center" v-if="readonly">
            <div class="col-sm-6 col-md-6"><button type="button"  class="btn btn-block v-yellow-btn" @click="close()">{{__t('Đồng ý')}}</button></div>
          </div>
          <div class="row" v-else>
            <div class="col-sm-3 col-md-3"><button type="button" class="btn btn-block" @click="close">{{__t('Hủy')}}</button></div>
            <!-- <div class="col-sm-3 col-md-3"><button type="button" class="btn btn-block" @click="NotUse">{{__t('Không dùng')}}</button></div> -->
            <div class="col-sm-9 col-md-9"><button type="button" :class="{'disabled': noValidate}" class="btn btn-block v-yellow-btn" @click="ok()">{{__t('Đồng ý')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import MixinMasterData from '@/mixins/masterdata.js'
import EventBus from '@/lib/eventBus'
const MODAL_WIDTH = 970
export default {
  name: 'MicrobiologyPopup',
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  props: ['readonly', 'Validate01', 'Validate02'],
  data () {
    return {
      rawObj: {},
      showGuild: false,
      form: {
      },
      TYPEGROUPLIST: null,
      modalWidth: MODAL_WIDTH,
      GroupList: [
        {label: 'Nhóm 1', code: '01'},
        {label: 'Nhóm 2', code: '02'},
        {label: 'Nhóm 3', code: '03'}
      ]
    }
  },
  components: {
  },
  computed: {
    noValidate: function () {
      var item001 = (localStorage.getItem('MICROBIOLOGY_SERVICE_01') || '').split(',')
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item001.includes(this.form.Code) && (!this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID)) {
        return true
      }
      if (item002.includes(this.form.Code) && (!this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified)) {
        return true
      }
      return false
      // !this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified
    },
    hasValidate002: function () {
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item002.includes(this.form.Code)) {
        return true
      }
      return false
      // !this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified
    },
    noValidate001: function () {
      var item001 = (localStorage.getItem('MICROBIOLOGY_SERVICE_01') || '').split(',')
      if (item001.includes(this.form.Code)) {
        return true
      }
      return false
      // !this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified
    },
    ...mapGetters({
      editItem: 'PlaceDiagnostics/getEditItem'
    }),
    STypeIDList () {
      if (this.form.Microbiology.STypeGroupID === null) return []
      return ((this.TypeGroupList.find(e => this.form.Microbiology.STypeGroupID && e.code === this.form.Microbiology.STypeGroupID.code) || {}).Items || []).map(e => {
        return {
          label: e.Code + ' - ' + e.ViName,
          code: e.Code,
          Items: e.Items,
          name: e.ViName
        }
      })
    },
    TypeGroupList () {
      var arr = []
      var md = []
      if (this.TYPEGROUPLIST) {
        md = this.TYPEGROUPLIST.map(e => {
          return {
            label: e.ViName,
            code: e.Code,
            Items: e.Items
          }
        })
      }
      return [...new Set(arr.concat(md))]
    }
  },
  watch: {
    editItem: {
      handler (a, b) {
        if (a) this.open(a)
      },
      deep: true
    },
    'form.Microbiology.STypeGroupID': {
      handler (a, b) {
        // this.form.Microbiology.STypeID = null
      },
      deep: true
    },
    form: {
      handler () {
        if (this.isFirst) {
          this.isFirst = false
        } else {
          this.edited = true
        }
      },
      deep: true
    }
  },
  created () {
    this.getTypeGroupList()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    if (this.readonly) {
      EventBus.$on('openMicrobiologyPopup', this.open)
    }
  },
  beforeDestroy () {
    if (this.readonly) {
      EventBus.$off('openMicrobiologyPopup')
    }
  },
  methods: {
    getTypeGroupList () {
      if (this.TYPEGROUPLIST) return
      this.getRawMasterDatas({Form: 'Microbiology'}, (data) => {
        this.TYPEGROUPLIST = data
      })
    },
    close () {
      if (this.edited) {
        this.$modal.show('dialog', {
          clickToClose: false,
          title: this.__t('Thông báo'),
          text: this.__t('Bạn có chắc chắn hủy các thông tin đã nhập?'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Tôi xác nhận'),
              class: 'btn btn-warning',
              handler: () => {
                this.emit()
                this.$modal.hide('dialog')
              }
            },
            {
              title: this.__t('Bỏ qua'),
              class: 'btn',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.emit()
      }
    },
    NotUse () {
      this.form.Microbiology.IsNotUse = true
      this.form.Microbiology.STypeGroupID = null
      this.form.Microbiology.STypeID = null
      this.form.Microbiology.Stratified = null
      this.form.IsOk = true
      this.update({form: this.form, type: this.form.type})
      this.$modal.hide('MicrobiologyPopup')
      this.showGuild = false
    },
    emit () {
      if (!this.readonly) {
        if (!this.form.IsOk) {
          this.remove({Id: this.form.Id, type: this.form.type})
        } else {
          this.update({form: this.rawObj, type: this.rawObj.type})
        }
      }
      this.$modal.hide('MicrobiologyPopup')
      this.showGuild = false
    },
    validateData (code) {
      var err = {}
      var item001 = (localStorage.getItem('MICROBIOLOGY_SERVICE_01') || '').split(',')
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item001.includes(code) && (!this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID)) {
        this.alert('Vui lòng lửa chọn thông tin "Loại mẫu"')
        throw err
      }
      if (item002.includes(code) && (!this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified)) {
        this.alert('Vui lòng nhập đầy đủ thông tin')
        throw err
      }
    },
    isMicrobiology (code) {
      var item001 = localStorage.getItem('MICROBIOLOGY_SERVICE_01')
      var item002 = localStorage.getItem('MICROBIOLOGY_SERVICE_02')
      var arr = (item001 || '').split(',').concat((item002 || '').split(','))
      return arr.includes(code)
    },
    ok () {
      this.validateData()
      this.form.Microbiology.IsNotUse = false
      this.form.IsOk = true
      this.update({form: this.form, type: this.form.type})
      this.$modal.hide('MicrobiologyPopup')
      this.showGuild = false
    },
    open (form) {
      var newItem = this.cloneObj(form)
      this.rawObj = this.cloneObj(form)
      if (this.isMicrobiology(newItem.Code)) {
        this.isFirst = true
        this.edited = false
        if (!newItem.Microbiology) {
          this.$set(newItem, 'Microbiology', {
            STypeGroupID: '',
            STypeID: '',
            Label: '',
            Stratified: '',
            IsNotUse: false
          })
        }
        this.form = newItem
        this.$modal.show('MicrobiologyPopup')
      }
    }
  }
}
</script>
