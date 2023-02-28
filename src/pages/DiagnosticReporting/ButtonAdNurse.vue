<template>
  <div v-if="modalId && areas">
    <ad-Info :ad="data.Nurse" v-if="data.Nurse"/>
    <button v-if="data.Nurse" class="btn" type="button" @click="open()"><i aria-hidden="true" class="fa fa-hand-o-right"></i> {{__t('Sửa')}}</button>
    <button v-else class="btn" type="button" @click="open()"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('Thêm')}}</button>
    <modal :name="modalId" transition="pop-out" height="auto" :width="modalWidth" :clickToClose="false" class="modal-overflow-inherit">
      <div class="box v-model-content-popup" v-if="item">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('Thêm thông tin điều dưỡng')}}</h3>
        </div>
        <div class="box-body padding-15" :class="{'err-form': err}">
          <p><b>{{__t('Dịch vụ')}}:</b> {{item.ServiceName}} - {{item.ServiceCode}}</p>
          <p><b>{{__t('Khách hàng')}}:</b> {{item.Fullname}} - {{item.PID}}</p>
          <!-- <div class="row mb-10">
            <div class="col-sm-4 col-md-4"><label required>{{__t('Điều dưỡng')}}: </label></div>
            <div class="col-sm-8 col-md-8"  :class="{'err-form-input': !item.Nurse}"><UserAd v-model="item.Nurse" /></div>
          </div> -->
          <!-- <div class="row">
            <div class="col-sm-4 col-md-4"><label required>{{__t('Khu vực')}}: </label></div>
            <div class="col-sm-8 col-md-8"  :class="{'err-form-input': !item.Area}"><SelectInput v-if="areasOptions" v-model="item.Area" :options="areasOptions || []"/></div>
          </div> -->
          <div class="flex align-center mrb10">
            <div class="white-space mrr10" style="min-width: 100px!important;"><label required>{{__t('Điều dưỡng')}}: </label></div>
            <div :class="{'err-form-input': !item.Nurse}" style="width: 100%;"><UserAd v-model="item.Nurse" /></div>
          </div>
          <div class="flex align-center">
            <div class="white-space mrr10" style="min-width: 100px!important;"><label required>{{__t('Khu vực')}}: </label></div>
            <div :class="{'err-form-input': !item.Area}" style="width: 100%;"><SelectInput v-if="areasOptions" v-model="item.Area" :options="areasOptions || []"/></div>
          </div>
          <p v-if="err" class="err-text" style="margin-top: 5px">{{__t('Vui lòng nhập đủ thông tin!')}}</p>
        </div>
        <div class="box-footer">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block v-yellow-btn" @click="save()">{{__t('Lưu')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close()">{{__t('Hủy')}}</button></div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import SelectInput from '@/components/SelectInput.vue'
import UsersSelectV2 from '@/components/UsersSelectV2.vue'
import DiagnosticReporting from '@/services/DiagnosticReporting'
const MODAL_WIDTH = 560
export default {
  name: 'ButtonAdNurse',
  components: {
    SelectInput, UsersSelectV2
  },
  mixins: [MixinMasterData],
  props: ['data', 'areas'],
  data () {
    return {
      Datas: false,
      modalId: null,
      modalWidth: MODAL_WIDTH,
      areasOptions: null,
      valTest: 'thaovv',
      item: null,
      err: false
    }
  },
  created () {
    this.areasOptions = this.areas.filter(e => e.Clinic === this.data.HospitalCode || e.Clinic === this.data.SiteCode).map(e => {
      return {
        label: e.ViName,
        value: e.Code,
        EnLabel: e.EnName,
        code: e.Code
      }
    })
    this.modalId = this.makeid(18) + '-modalAdNurse'
  },
  computed: {
  },
  methods: {
    validateData () {
      this.err = false
      if (!this.item.Nurse || !this.item.Area) {
        this.err = true
      }
    },
    save () {
      this.validateData()
      if (this.err) return false
      new DiagnosticReporting().AddMurse(this.item.ChargeItemId, this.item).then(() => {
        this.data.Nurse = this.item.Nurse
        this.data.Area = this.item.Area
        this.close()
        this.toastedSuccess()
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    },
    open () {
      this.item = this.cloneObj(this.data)
      this.err = false
      this.$modal.show(this.modalId)
    },
    close () {
      this.$modal.hide(this.modalId)
      this.item = null
    }
  }
}
</script>
