<template>
  <modal class="v-dialog" name="ConfirmHandoverPatientPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
    <div v-if="VisitTypeGroupCode !== 'OPDPreAnesthesia'">
      <div class="box v-model-content-popup" v-show="dataHandoverChecklist && dataHandoverChecklist.IsUseHandOverCheckList">
        <div class="box-header text-center">
          <h3 class="box-title">{{this.message}}</h3>
          <button type="button" class="btn-popup-close btn pull-right" @click="close">{{__t('btn.huy')}}</button>
        </div>
        <div class="box-body padding-15">
          <hand-over-check-list-view :VisitId="VisitId" v-if="VisitTypeGroupCode === 'ED'" />
          <hand-over-check-list-view-opd :VisitId="VisitId" v-if="VisitTypeGroupCode === 'OPD'" />
          <hand-over-check-list-view-ipd :VisitId="VisitId" v-if="VisitTypeGroupCode === 'IPD'" />
          <hand-over-check-list-view-eoc :VisitId="VisitId" v-if="VisitTypeGroupCode === 'EOC'" />
          <div class="form-group has-feedback">
            <input v-model="usr.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="usr.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
        </div>
        <div class="box-footer padding-15">
          <div class="row">
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('btn.huy')}}</button></div>
            <div class="col-sm-6 col-md-6"><button type="button" class="btn btn-block v-yellow-btn" @click="submitConfirm">{{__t('Xác nhận')}}</button></div>
          </div>
        </div>
      </div>
      <div v-show="dataHandoverChecklist && !dataHandoverChecklist.IsUseHandOverCheckList" class="dialog-content">
        <div class="dialog-c-title"><b>{{__t('Xác nhận tiếp nhận người bệnh ?')}}</b></div>
        <div v-if="dataHandoverChecklist" class="dialog-c-text" style="white-space: unset;">
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Tên người bệnh')}}:</p>
            <p>{{dataHandoverChecklist.Customer.Fullname}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">PID:</p>
            <p>{{dataHandoverChecklist.Customer.PID !== null ? dataHandoverChecklist.Customer.PID : 'Chưa đồng bộ PID'}}<i class="ml-5" v-if="dataHandoverChecklist.VisitCode">({{dataHandoverChecklist.VisitCode !== null ? dataHandoverChecklist.VisitCode : "Chưa đồng bộ visit code"}})</i><i v-else> ({{dataHandoverChecklist.Customer.VisitCode !== null ? dataHandoverChecklist.Customer.VisitCode : "Chưa đồng bộ visit code"}})</i></p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Ngày sinh')}}:</p>
            <p>{{dataHandoverChecklist.Customer.DateOfBirth | formatDate2}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Khoa chuyển')}}:</p>
            <p>{{__label(dataHandoverChecklist.HandOverUnitPhysician)}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Thời gian chuyển')}}:</p>
            <p>{{dataHandoverChecklist.HandOverTimePhysician | formatDateWithoutSecon}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mb-0 mr-5">{{__t('Bác sĩ chuyển')}}:</p>
            <ad-Info :ad="dataHandoverChecklist.HandOverPhysician.Username"/>
          </div>
        </div>
        <div class="vue-dialog">
          <p class="text-center" style="color: red;"><i>{{__t('NB không sử dụng biên bản bàn giao')}}</i></p>
          <div class="vue-dialog-buttons">
            <button class="btn" style="flex: 1 1 50%;" type="button" @click="submitConfirm">{{__t('Đồng ý ')}}</button>
            <button class="btn bg-yellow" style="flex: 1 1 50%;" @click="close">{{__t('Hủy bỏ')}}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="dialog-content">
      <div class="dialog-c-title"><b>{{__t('Xác nhận tiếp nhận người bệnh?')}}</b></div>
        <div v-if="dataHandoverChecklistFromOpd" class="dialog-c-text" style="white-space: unset;">
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Tên người bệnh')}}:</p>
            <p>{{dataHandoverChecklistFromOpd.Fullname}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">PID:</p>
            <p>{{dataHandoverChecklistFromOpd.PID !== null ? dataHandoverChecklistFromOpd.PID : 'Chưa đồng bộ PID'}}<i class="ml-5" v-if="dataHandoverChecklistFromOpd.VisitCode">({{dataHandoverChecklistFromOpd.VisitCode !== null ? dataHandoverChecklistFromOpd.VisitCode : "Chưa đồng bộ visit code"}})</i><i v-else> ({{dataHandoverChecklistFromOpd.VisitCode !== null ? dataHandoverChecklistFromOpd.VisitCode : "Chưa đồng bộ visit code"}})</i></p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Ngày sinh')}}:</p>
            <p>{{dataHandoverChecklistFromOpd.DateOfBirth}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Khoa chuyển')}}:</p>
            <p>{{dataHandoverChecklistFromOpd.HandOverUnit}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mr-5">{{__t('Thời gian chuyển')}}:</p>
            <p>{{dataHandoverChecklistFromOpd.TransferDate}}</p>
          </div>
          <div class="d-flex flex-center">
            <p class="no-wrap mb-0 mr-5">{{__t('Bác sĩ chuyển')}}:</p>
            <ad-Info :ad="dataHandoverChecklistFromOpd.HandOverPhysicianUsername"/>
          </div>
        </div>
        <div class="vue-dialog">
          <p class="text-center" style="color: red;"><i>{{__t('NB không sử dụng biên bản bàn giao')}}</i></p>
          <div class="vue-dialog-buttons">
            <button class="btn" style="flex: 1 1 50%;" type="button" @click="submitConfirm">{{__t('Đồng ý ')}}</button>
            <button class="btn bg-yellow" style="flex: 1 1 50%;" @click="close">{{__t('Hủy bỏ')}}</button>
          </div>
        </div>
      </div>
  </modal>
</template>

<script>
import OPDHandoverService from '@/services/Custome'
import HandOverCheckListView from '@/pages/ED/HandOverCheckList/View.vue'
import HandOverCheckListViewOpd from '@/pages/OPD/HandOverCheckList/View.vue'
import HandOverCheckListViewIpd from '@/pages/IPD/HandOverCheckList/View.vue'
import HandOverCheckListViewEoc from '@/pages/EOC/HandOverCheckList/View.vue'
import MixinForm from '@/mixins/form.js'
import { router } from '@/plugins/vue-router'
import EventBus from '@/lib/eventBus'

const MODAL_WIDTH = 980
const MODAL_WIDTH_SMALL = 415

export default {
  name: 'ConfirmHandoverPopup',
  props: ['pId', 'message', 'VisitTypeGroupCode', 'VisitId', 'CurrentGroup', 'hasCallBack', 'IsUseHandOverCheckList', 'dataHandoverChecklistFromOpd'],
  components: {
    HandOverCheckListView,
    HandOverCheckListViewOpd,
    HandOverCheckListViewIpd,
    HandOverCheckListViewEoc
  },
  mixins: [MixinForm],
  data () {
    return {
      usr: {
        username: null,
        password: null
      },
      modalWidth: MODAL_WIDTH,
      dataHandoverChecklist: null
    }
  },
  mounted () {
    EventBus.$on('getHandOverCheckList', this.HandOverCheckListDatas)
    this.$modal.show('ConfirmHandoverPatientPopup')
  },
  beforeDestroy () {
    EventBus.$off('getHandOverCheckList')
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    if (!this.IsUseHandOverCheckList) {
      this.modalWidth = MODAL_WIDTH_SMALL
    } else {
      this.modalWidth = MODAL_WIDTH
    }
  },
  methods: {
    HandOverCheckListDatas (e) {
      console.log(e)
      this.dataHandoverChecklist = e
      console.log(this.dataHandoverChecklist)
      // if (!this.dataHandoverChecklist.IsUseHandOverCheckList) {
      //   this.modalWidth = MODAL_WIDTH_SMALL
      // }
    },
    submitConfirm () {
      var data = this.usr
      new OPDHandoverService(`api/${this.CurrentGroup}/HandOverCheckList/Accept/`).update(this.pId, data).then(response => {
        this.toastedSuccess(this.__t('Tiếp nhận bệnh nhân thành công'))
        this.$modal.hide('ConfirmHandoverPatientPopup')
        if (router.currentRoute.name === 'ListPatientTransferOPD') {
          this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: response.Id}})
        } else if (router.currentRoute.name === 'ListPatientTransfer') {
          this.$router.push({name: 'ED-etr', params: {Id: response.Id}})
        } else if (router.currentRoute.name === 'ListPatientTransferIPD') {
          this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: response.Id}})
        }
        setTimeout(() => {
          this.reload()
        }, 1000)
      })
    },
    close () {
      if (this.hasCallBack) {
        this.$emit('close')
      } else {
        this.go2Home()
      }
    },
    confirm () {
      this.$modal.hide('Test')
    }
  }
}
</script>
<style lang="stylus" scoped>
// >>>.v--modal-box.v--modal {
//   top: 200px !important;
// }
</style>
