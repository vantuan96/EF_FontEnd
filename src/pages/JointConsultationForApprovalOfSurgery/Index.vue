<template>
  <div class="main-content" id="StandingOrderForRetailService-page">
    <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Biên bản hội chẩn thông qua mổ')}}</b></h2>
    <br/>
    <div v-if="loaded">
      <div v-if="Lists">
        <div v-if="Lists.length > 0" class="v-tab v-tab-2">
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" style="margin-right: 0px">
              <router-link class="no-border" :to="{ name: `${_VisitType}JointConsultationForApprovalOfSurgeryItem`, params: { Id: $route.params.Id, Item: item.Id }}">
                <div>
                  {{__t(item.Label)}}
                  {{index + 1}}
                </div>
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="!IsLocked">
              <a v-if="getRole()" @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;" >
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm phiếu')}}</div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view :viewOnly="viewOnly" :VisitId="_VisitId" :VisitType="_VisitType" :formId="formId"/>
            </transition>
          </div>
        </div>
        <div class="text-center" v-else>
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có Biên bản hội chẩn thông qua mổ')}}</p>
          <button class="btn btn-warning" @click="confirmPopup" v-if="!IsLocked && getRole()">{{__t('Tạo mới')}}</button> -->
        </div>
        <logs v-if="DataSubmit && !viewOnly" :EdId="this.$route.params.Id" :Type="VisitTypeGroupCode + '/JointConsultationForApprovalOfSurgeryItem'" />
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import VDateTimesPicker from '@/components/VDateTimePicker.vue'
// import DischargeInformation from '@/services/ED/DischargeInformation'
// import SignificantMedications from '@/components/ED/SignificantMedications.vue'
import JointConsultationForApprovalOfSurgery from '@/services/JointConsultationForApprovalOfSurgery'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import moment from 'moment'
import Logs from '@/components/Logs.vue'
import Print from './Print.vue'
import Customer from '@/services/IPD/Customer'
import EventBus from '@/lib/eventBus'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDJointConsultationForApprovalOfSurgery',
  props: ['viewOnly', 'VisitId', 'VisitType', 'formId'],
  data () {
    return {
      DataSubmit: null,
      user: {},
      AntibioticsTreatmentBefore: null,
      Kind: null,
      SyncData: {},
      CDHA: null,
      loaded: false,
      IsLocked: false,
      hasCDHA: [],
      popupTitle: '',
      VisitTypeGroupCode: 'ED',
      Customer: null,
      Lists: null
    }
  },
  mixins: [MixinForm, MixinMasterData],
  mounted () {
    EventBus.$on('emitFormCodeJoinConsultation', this.getFormCode)
    this.getData()
  },
  components: {
    VDateTimesPicker, VSelect, Logs, Print
  },
  computed: {
    checkFormCode () {
      return this._VisitType === 'OPD' ? 'A01_059_090822_VE' : 'A01_059_050919_VE'
    }
  },
  methods: {
    getRole () {
      if (this._VisitType === 'IPD') {
        return this.hasRole('IJCFA1')
      } else if (this._VisitType === 'ED') {
        return this.hasRole('EJCFA1')
      } else {
        return this.hasRole('OPDJCFA1')
      }
    },
    getData () {
      new JointConsultationForApprovalOfSurgery({}, this._VisitType).find(this.checkFormCode + '/' + this.$route.params.Id).then(response => {
        this._VisitType === 'IPD' ? this.IsLocked = response.IsLocked : this.IsLocked = response.IsLocked24h
        this.Lists = response.Datas.map((e, i) => {
          return {
            Id: e.Id,
            Label: this.$t('Phiếu'),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
            Version: e.Version,
            CreatedBy: e.CreatedBy
          }
        })
        if (response.Datas.length > 0 && !this.$route.params.Item) {
          this.$router.push({name: `${this._VisitType}JointConsultationForApprovalOfSurgeryItem`, params: { Id: this.$route.params.Id, Item: response.Datas[response.Datas.length - 1].Id }})
        }
        this.loaded = true
      }).catch(e => {
        // this.back()
      })
    },
    create () {
      new JointConsultationForApprovalOfSurgery({}, this._VisitType).update(this._VisitId + this.checkFormCode + '/' + this.$route.params.Id, {}, '/Create/').then(response => {
        this.toastedSuccess()
        this.$router.push({name: `${this._VisitType}JointConsultationForApprovalOfSurgeryItem`, params: { Id: this.$route.params.Id, Item: response.Id }})
        this.getData()
      }).catch(e => {
        // this.back()
        console.log(e)
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Biên bản hội chẩn thông qua mổ?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
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
    },
    getCustomer () {
      this.loaded = false
      new Customer({noLoading: true}).find(this.$route.params.Id).then(response => {
        this.Customer = response
        this.loaded = true
      })
    }
  }
}
</script>
