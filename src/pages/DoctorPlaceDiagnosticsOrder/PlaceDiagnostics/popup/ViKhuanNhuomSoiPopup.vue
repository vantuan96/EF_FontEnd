<template>
  <div>
    <basepopup name="ViKhuanNhuomSoi" width="965px" :isShowFooter="false" :clickToClose="false">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{titlePopup}}</h3>
      </div>
      <div style="min-height:500px">
        <template v-if="loaded">
          <div class="text-center" v-if="IsNew">
            <h4>{{__t('Chưa có thông tin !')}}</h4>
          </div>
          <template v-else>
            <div class="red italic mrb20">{{__t('Chỉ người tạo phiếu được chỉnh sửa nội dung và không được chỉnh sửa nếu dịch vụ đã thực hiện!')}}</div>
            <template v-if="form && form.MicrobiologyDto">
              <div class="flex-box flex-center">
                <label class="text-left no-wrap mr-10 lb-w2" required>{{__t('Loại mẫu')}}:</label>
                <div id="STypeGroupID" class="input-group mr-5" style="flex-grow: 1">
                  <v-select :readonly="readonly" :fullwidth="true" :styleSelect="'width: 100%;'" v-model="form.MicrobiologyDto.STypeGroupID" :items="TypeGroupList" />
                </div>
                <div class="input-group mr-5" :class="getClassError()" style="flex-grow: 1">
                  <v-select :readonly="readonly" :fullwidth="true" :styleSelect="'width: 100%;'" v-model="form.MicrobiologyDto.STypeID" :items="STypeIDList" />
                </div>
                <div>
                  <p class="fake-input disable">{{form.MicrobiologyDto.STypeID ? getSTypeIDName(form.MicrobiologyDto.STypeID) : ''}}</p>
                </div>
              </div>
              <div class="flex-box flex-center mt-10 mb-10">
                <label v-if="hasValidate002" class="text-left no-wrap mr-10 lb-w2" required>{{__t('Phân tầng kháng sinh')}}:</label>
                <label v-else class="text-left no-wrap mr-10 lb-w2">{{__t('Phân tầng kháng sinh')}}:</label>
                <div class="input-group mr-5 full-width" id="Stratified">
                  <v-select :readonly="readonly" :fullwidth="true" :styleSelect="'width: 100%;'" v-model="form.MicrobiologyDto.Stratified" :items="GroupList" />
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
          </template>
        </template>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
      <div slot="footer">
        <div class="flex align-center space-between" style="padding: 10px 0px;">
          <button type="button" class="btn btn-block v-white-btn mrr10" :style="{'width: 240px': !readonly}" @click="handleClose()">{{__t('Đóng')}}</button>
          <button v-if="!readonly" type="button" class="btn btn-block v-yellow-btn full-width" style="margin-top: 0px;" @click="handleSubmit()">{{__t('Đồng ý')}}</button>
        </div>
      </div>
    </basepopup>
  </div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import $ from 'jquery'
export default {
  name: 'ViKhuanNhuomSoiPopup',
  props: ['Id', 'Type', 'dataRow', 'readonly', 'titlePopup', 'ServiceCode', 'IsNew'],
  mixins: [MixinPlaceDiagnostics, MixinMasterData],
  data () {
    return {
      loaded: false,
      TYPEGROUPLIST: null,
      rawObj: {},
      showGuild: false,
      form: {},
      GroupList: [
        {label: 'Nhóm 1', value: '01'},
        {label: 'Nhóm 2', value: '02'},
        {label: 'Nhóm 3', value: '03'}
      ]
    }
  },
  watch: {
    dataRow (val) {
      if (val) {
        this.getData()
      }
    }
  },
  components: {
    VDateTimePicker, VSelect
  },
  mounted () {
    this.getData()
    this.getTypeGroupList()
  },
  computed: {
    STypeIDList () {
      if (this.form.MicrobiologyDto.STypeGroupID === null) return []
      return ((this.TypeGroupList.find(e => this.form.MicrobiologyDto.STypeGroupID && e.value === this.form.MicrobiologyDto.STypeGroupID) || {}).Items || []).map(e => {
        return {
          label: e.Code + ' - ' + e.ViName,
          value: e.Code,
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
            value: e.Code,
            Items: e.Items
          }
        })
      }
      return [...new Set(arr.concat(md))]
    },
    noValidate: function () {
      var item001 = (localStorage.getItem('MICROBIOLOGY_SERVICE_01') || '').split(',')
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item001.includes(this.ServiceCode) && (!this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID)) {
        return true
      }
      if (item002.includes(this.ServiceCode) && (!this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified)) {
        return true
      }
      return false
    },
    noValidate001: function () {
      var item001 = (localStorage.getItem('MICROBIOLOGY_SERVICE_01') || '').split(',')
      if (item001.includes(this.ServiceCode)) {
        return true
      }
      return false
      // !this.form.Microbiology || !this.form.Microbiology.STypeGroupID || !this.form.Microbiology.STypeID || !this.form.Microbiology.Stratified
    },
    hasValidate002: function () {
      console.log('aaa', localStorage.getItem('MICROBIOLOGY_SERVICE_02'))
      var item002 = (localStorage.getItem('MICROBIOLOGY_SERVICE_02') || '').split(',')
      if (item002.includes(this.ServiceCode)) {
        return true
      }
      return false
    }
  },
  methods: {
    async getData () {
      let newItem = this.cloneObj(this.dataRow)
      this.form = newItem
      this.loaded = true
    },
    handleClose () {
      this.$modal.hide('ViKhuanNhuomSoi')
    },
    getTypeGroupList () {
      if (this.TYPEGROUPLIST) return
      this.getRawMasterDatas({Form: 'Microbiology'}, (data) => {
        this.TYPEGROUPLIST = data
      })
    },
    handleSubmit () {
      this.handleClearData()
      this.validateForm()
      let data = {
        form: this.form,
        Id: this.Id,
        Type: this.Type
      }
      this.$emit('handleUpdate', data)
      this.showGuild = false
    },
    getSTypeIDName (val) {
      let name = ''
      this.STypeIDList.find(e => {
        if (e.value === val) {
          name = e.name
        }
      })
      return name
    },
    handleClearData () {
      if (!this.form.MicrobiologyDto.STypeGroupID) {
        this.form.MicrobiologyDto.STypeID = ''
      }
    },
    // validate form
    validateForm () {
      let errors = []
      if (!this.form.MicrobiologyDto.STypeGroupID) {
        const obj = {
          ViName: 'Loại mẫu',
          EnName: 'Type of specimen',
          Code: 'STypeGroupID'
        }
        errors.push(obj)
      }
      if (!this.form.MicrobiologyDto.Stratified && this.hasValidate002) {
        const obj = {
          ViName: 'Phân tầng kháng sinh',
          EnName: 'Antibiotic stratification',
          Code: 'Stratified'
        }
        errors.push(obj)
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    getClassError () {
      console.log($('#STypeGroupID').className)
      return ''
    }
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red!important;
}
.lb-w2 {
  min-width: 160px!important;
}
</style>
