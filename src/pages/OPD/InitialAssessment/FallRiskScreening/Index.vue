<template>
  <div class="main-content disable_ccp5" id="FallRiskScreening">
    <div v-if="loaded">
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
            <li v-if="hasRole('OINAS8')" class="text-center flex-container no-border">
              <a v-if="!IsLocked" @click="createPopup()" class="add-btn-active no-border" style="height: 70px;">
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('ETR.them_luot')}}</div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view/>
            </transition>
          </div>
        </div>
      </template>
      <div v-else class="text-center p20">
        <div v-if="hasErrForm">Có lỗi xảy ra!</div>
        <div v-else>
          <p>{{__t('Chưa có Phiếu sàng lọc nguy cơ ngã')}}</p>
          <div v-if="hasRole('OINAS8')">
          <!-- <div> -->
            <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button>
          </div>
        </div>
      </div>
      <div v-if="DataSubmit.Datas.length === 0" class="mt-10">
        <p>{{FormCode}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import InitialAssessment from '@/services/OPD/InitialAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import Form from './Form'
import moment from 'moment'
export default {
  name: 'OPDInitialAssessmentFallRiskScreening',
  mixins: [MixinMasterData],
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
      FormCode: 'A02_007_220321_VE'
    }
  },
  mounted () {
    $('.disable_ccp5' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    this.getData()
  },
  methods: {
    getData () {
      new InitialAssessment({hidemsg: true}, this._VisitType).find('FallRiskScreening/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.DataSubmit = response
        this.checkShowAddForm = response.Datas.some(item => item.Version === 1)
        this.IsLocked = response.IsLocked
        console.log('IsLocked', response.IsLocked)
        this.Lists = response.Datas.map((e, i) => {
          return {
            Id: e.Id,
            Label: this.__t('Lượt') + ' ' + (i + 1),
            ViName: this.__t('Lượt') + ' ' + (i + 1),
            EnName: this.__t('Lượt') + ' ' + (i + 1),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
            Version: e.Version,
            CreatedBy: e.CreatedBy
          }
        })
        if (response.Datas.length > 0 && !this.$route.params.Item) {
          this.$router.push({name: this._VisitType + 'InitialAssessmentFallRiskScreeningItem', params: { Id: this._VisitId, Item: response.Datas[response.Datas.length - 1].Id }})
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
      new InitialAssessment().update('FallRiskScreening/Create/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.toastedSuccess()
        this.$router.push({name: this._VisitType + 'InitialAssessmentFallRiskScreeningItem', params: { Id: this._VisitId, Item: response.Id }})
      })
    },
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
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
