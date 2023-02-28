<template>
  <div class="main-content" id="FallRiskScreening">
    <div v-if="loaded">
      <div class="v-tab">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation">
            <router-link :to="{name: 'ED-etr', params: { Id: $route.params.Id }, query: {tab: 'tab1'}}">
              {{__t('ETR.phan_loai_cap_cuu_benh_nhan')}}
            </router-link>
          </li>
          <li role="presentation" class="active">
            <router-link :to="{name: 'EDInitialAssessmentFallRiskScreening', params: { Id: $route.params.Id }}">
              {{__t('ETR.sang_loc_nga')}}
            </router-link>
          </li>
          <li role="presentation">
            <router-link :to="{name: 'ED-etr', params: { Id: $route.params.Id }, query: {tab: 'tab3'}}">
              {{__t('Y lệnh miệng')}}
            </router-link>
          </li>
          <li role="presentation">
            <router-link :to="{name: 'ED-AssessmentForRetailServicePatient', params: { Id: $route.params.Id }}">
              {{__t('Đánh giá NB dịch vụ lẻ')}}
            </router-link>
          </li>
        </ul>
      </div>
      <template v-if="Lists.length > 0">
        <div class="v-tab v-tab-2">
          <ul v-if="!checkShowAddForm" class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" :class="activeClass(item.Id)" style="margin-right: 0px">
              <router-link class="no-border" :to="{name: _VisitType + 'InitialAssessmentFallRiskScreeningItem', params: { Id: $route.params.Id, Item: item.Id }}">
                {{item.Label}}
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </router-link>
            </li>
            <li v-if="hasRole('TAOSLN')" class="text-center flex-container no-border">
              <a  v-if="!IsLocked" @click="createPopup()" class="add-btn-active no-border" style="height: 70px;" >
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('ETR.them_luot')}}</div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view :ViewOnly="IsLocked"/>
            </transition>
          </div>
        </div>
      </template>
      <div v-else class="text-center p20">
        <div v-if="hasErrForm">Có lỗi xảy ra!</div>
        <div v-else>
          <p>{{__t('Chưa có Phiếu sàng lọc nguy cơ ngã')}}</p>
          <div v-if="hasRole('TAOSLN')">
          <!-- <div> -->
            <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button>
          </div>
        </div>
      </div>
      <div v-if="DataSubmit.length === 0" class="mt-10">
        <p>{{FormCode}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import FallRiskScreening from '@/services/ED/FallRiskScreening'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import Form from './ItemV2.vue'
import moment from 'moment'
export default {
  name: 'EDInitialAssessmentFallRiskScreening',
  mixins: [MixinForm, MixinMasterData],
  props: ['ViewOnly', 'VisitId', 'VisitType'],
  components: {
    Form
  },
  data () {
    return {
      DataSubmit: {},
      loaded: false,
      IsLocked: false,
      checkShowAddForm: false,
      Lists: [],
      FormCode: 'A02_007_220321_VE'
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      new FallRiskScreening({hidemsg: true}, this._VisitType).find('All/' + this._VisitId).then(response => {
        this.DataSubmit = response
        this.checkShowAddForm = response.some(item => item.Version === 1)
        this.Lists = response.map((e, i) => {
          return {
            Id: e.Id,
            Label: this.__t('ETR.luot') + ' ' + (i + 1),
            ViName: this.__t('ETR.luot') + ' ' + (i + 1),
            EnName: this.__t('ETR.luot') + ' ' + (i + 1),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
            Version: e.Version,
            CreatedBy: e.CreatedBy
          }
        })
        if (response.length > 0 && !this.$route.params.Item) {
          this.$router.push({name: this._VisitType + 'InitialAssessmentFallRiskScreeningItem', params: { Id: this._VisitId, Item: response[response.length - 1].Id }})
        }
        this.loaded = true
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
        this.loaded = true
      })
    },
    create () {
      new FallRiskScreening().update('/Create/' + this._VisitId).then(response => {
        this.toastedSuccess()
        this.$router.push({name: this._VisitType + 'InitialAssessmentFallRiskScreeningItem', params: { Id: this._VisitId, Item: response.Id }})
      })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Phiếu sàng lọc nguy cơ ngã'),
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
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
