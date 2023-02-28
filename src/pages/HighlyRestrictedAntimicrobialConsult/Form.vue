<template>
  <div class="main-content" id="HighlyRestrictedAntimicrobialConsult">
    <h2 class="text-center" v-if="!ViewOnly"><b>{{__t('Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý')}}</b></h2>
    <div v-if="loaded">
      <template v-if="Lists.length > 0">
        <div class="v-tab v-tab-2">
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" :class="activeClass(item.Id)" style="margin-right: 0px">
              <router-link class="no-border" :to="{name: _VisitType + 'HighlyRestrictedAntimicrobialConsultItem', params: { Id: $route.params.Id, Item: item.Id }}">
                {{item.Label}}
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </router-link>
            </li>
            <div v-if="hasRole('IEOHIREANCOPOST')">
              <li class="text-center flex-container no-border" v-if="!IsLocked">
                <a @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;" >
                  <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                  <div>{{__t('Thêm phiếu')}}</div>
                </a>
              </li>
            </div>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view :viewOnly="IsLocked"/>
            </transition>
          </div>
        </div>
      </template>
      <div v-else class="text-center p20">
        <div v-if="hasErrForm">Có lỗi xảy ra!</div>
        <div v-else>
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý')}}</p> -->
          <!-- <div v-if="hasRole('IEOHIREANCOPOST')">
            <button class="btn btn-warning" @click="confirmPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import Print from './Print'
import HighlyRestrictedAntimicrobialConsult from '@/services/HighlyRestrictedAntimicrobialConsult'
import MixinMasterData from '@/mixins/masterdata.js'
import Logs from '@/components/Logs.vue'
import DropFiles from '@/components/DropFiles.vue'
import SyncPrincipalTest from '@/components/SyncPrincipalTest.vue'
import ListSignificantMedications from '@/components/ListSignificantMedications.vue'
import moment from 'moment'
export default {
  name: 'HighlyRestrictedAntimicrobialConsult',
  props: ['ViewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  components: {Logs, DropFiles, SyncPrincipalTest, ListSignificantMedications, Print},
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      IsLocked: false,
      user: {},
      popupTitle: '',
      AntibioticsTreatmentBefore: null,
      FormCode: 'A01_060_120421_VE'
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    hasCreate () {
      return false
    }
  },
  methods: {
    getData () {
      new HighlyRestrictedAntimicrobialConsult({hidemsg: true}, this._VisitType).find(this.FormCode + '/' + this._VisitId).then(response => {
        this.IsLocked = response.IsLocked
        if (!response.Datas) response.Datas = []
        this.Lists = response.Datas.map((e, i) => {
          return {
            Id: e.Id,
            Label: this.__t('Phiếu') + ' ' + (i + 1),
            ViName: this.__t('Phiếu') + ' ' + (i + 1),
            EnName: this.__t('Phiếu') + ' ' + (i + 1),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
            Version: e.Version,
            CreatedBy: e.CreatedBy
          }
        })
        if (response.Datas.length > 0 && !this.$route.params.Item) {
          this.$router.push({name: this._VisitType + 'HighlyRestrictedAntimicrobialConsultItem', params: { Id: this.$route.params.Id, Item: response.Datas[response.Datas.length - 1].Id }})
        }
        this.loaded = true
      }).catch(e => {
        console.log(e.status !== 404)
        if (e.status !== 404) this.hasErrForm = true
        this.loaded = true
      })
    },
    create () {
      new HighlyRestrictedAntimicrobialConsult({}, this.getVisitGroupCode()).update(this.FormCode + '/' + this.$route.params.Id, {}, 'Create/').then(response => {
        this.toastedSuccess()
        this.$router.push({name: this._VisitType + 'HighlyRestrictedAntimicrobialConsultItem', params: { Id: this.$route.params.Id, Item: response.Id }})
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý'),
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
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
