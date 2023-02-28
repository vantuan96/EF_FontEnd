<template>
  <div class="main-content SummaryOf15DayTreatment disable_ccp5" id="SummaryOf15DayTreatment-page">
    <template v-if="loaded">
      <h1 class="text-center fw600">{{ __t("Biên bản") }}</h1>
      <h4 class="text-center mrb10">({{ __t("Biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu") }})</h4>
      <br>
      <div class="v-tab v-tab-2" v-if="List.length">
        <template>
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx no-border" :class="activeClass(item.Id)">
              <router-link class="no-border" :to="{name:'IPDCoordinatingWithThePatientItem', params: { Id: $route.params.Id, Item: item.Id }}">
                <div class="box-info-item">
                  <div><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></div>
                  <div>{{item.CreatedAt | formatDateHourMinutesDDMMYYY}}</div>
                  <div>{{__t('Phiếu')}} {{index + 1}}</div>
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="!IsLocked && hasRole('STILLBIRTHPOST')">
              <a  @click="confirmPopup()" class="add-btn-active no-border">
                <div class="box-info-item">
                  <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                  <div>{{__t('Thêm phiếu')}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view/>
            </transition>
          </div>
        </template>
      </div>
      <div class="text-center" v-else>
        <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
        <!-- <h4>{{__t('HospitalDischargeTable.labelNull')}}</h4>
        <button class="btn v-yellow-btn" v-if="!IsLocked && condition==='Doctor' && hasRole('STILLBIRTHPOST')" @click="confirmPopup()">{{__t('Tạo mới')}}</button> -->
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import CoordinatingWithThePatientService from '@/services/IPD/CoronaryIntervention/CoordinatingWithThePatient'
export default {
  name: 'CoronaryIntervention',
  data () {
    return {
      Id: this._VisitId,
      tableId: this.$route.params.Item,
      data: {},
      List: [],
      hasNew: false,
      IsLocked: false,
      DataSubmit: null,
      loaded: false,
      formCode: 'A01_152_100122_VE'
    }
  },
  mixins: [MixinForm, MixinMasterData],
  props: ['VisitId'],
  components: {
  },
  created () {
    this.getData()
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    }
  },
  methods: {
    getData () {
      this.loaded = false
      new CoordinatingWithThePatientService().find(this.formCode + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.List = response.Datas
        this.IsLocked = response.IsLocked
        console.log('data', this.Lisst)
        if (response.Datas.length > 0 && !this.$route.params.Item) {
          this.$router.push({name: 'IPDCoordinatingWithThePatientItem', params: { Id: this._VisitId, Item: response.Datas[response.Datas.length - 1].Id }})
        }
        this.loaded = true
      }).catch(() => {
        this.loaded = true
      })
    },
    handleCreate () {
      new CoordinatingWithThePatientService().update('/Create/' + this.formCode + '/' + this._VisitId).then(res => {
        this.toastedSuccess()
        this.$router.push({name: 'IPDCoordinatingWithThePatientItem', params: { Id: this._VisitId, Item: res.Id }})
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('women.createThai'),
        text: this.$t('women.isCreateThai'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  },
  mounted () {
    $('.disable_ccp5' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  }
}
</script>
<style lang="stylus" scoped>
.main-content {
  li {
    a {
      height: 70px;
      .box-info-item {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        justify-content: space-around;
      }
    }
  }
}
</style>
