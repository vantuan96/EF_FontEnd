<template>
  <div class="main-content" id="JointConsultationGroupMinutesPage">
    <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Biên bản hội chẩn')}}</b></h2>
    <div v-if="loaded">
      <div v-if="Lists">
        <div v-if="Lists.length > 0" class="v-tab v-tab-2">
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border">
              <router-link class="no-border" :to="{name: _VisitType + 'JointConsultationGroupMinutesItem', params: { Id: $route.params.Id, Item: item.Id }}">
                {{item.Label}}
                <div>{{item.CreatedAt}}</div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="!IsLocked">
              <a  @click="confirmPopup()" class="add-btn-active no-border" >
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm phiếu')}}</div>
              </a>
              <!-- <a @click="go2NewForm()" class="add-btn-active"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm phiếu')}}</a> -->
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <!-- <router-view :viewOnly="IsLocked" /> -->
              <router-view />
            </transition>
          </div>
        </div>
        <div v-else class="text-center p20">
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có biên bản hội chẩn')}}</p>
          <button class="btn btn-warning" @click="confirmPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <p>A01_057_050919_VE</p>
  </div>
</template>
<script>
import JointConsultationGroupMinutes from '@/services/JointConsultationGroupMinutes'
import JointConsultationGroupMinutesChecked from '@/services/JointConsultationGroupMinutesChecked'
import moment from 'moment'
export default {
  name: 'JointConsultationGroupMinutesList',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType'],
  mixins: [],
  components: {},
  data () {
    return {
      Lists: null,
      IsLocked: false,
      loaded: false
    }
  },
  computed: {
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData (isNewForm) {
      this.loaded = false
      if (this._VisitType === 'IPD' || this._VisitType === 'OPD') {
        new JointConsultationGroupMinutesChecked({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
          this.IsLocked = this._VisitType === 'IPD' ? response.IsLocked : response.IsLocked24h
          this.loaded = true
        }).catch(e => {
          this.loaded = true
        })
      }
      new JointConsultationGroupMinutes({}, this._VisitType).find('List/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.loaded = true
        this.Lists = response.map((e, i) => {
          return {
            Id: e.Id,
            Label: this.__t('Phiếu') + ' ' + (i + 1),
            ViName: this.__t('Phiếu') + ' ' + (i + 1),
            EnName: this.__t('Phiếu') + ' ' + (i + 1),
            CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY')
          }
        })
        if (this.$route.params.Item && !isNewForm) {
          // nothing
        } else {
          this.$router.push({name: this._VisitType + 'JointConsultationGroupMinutesItem', params: {Id: this.$route.params.Id, Item: this.Lists[this.Lists.length - 1].Id}})
        }
      }).catch(e => {
        this.loaded = true
      })
    },
    creat () {
      new JointConsultationGroupMinutes({}, this._VisitType).update(this._VisitId, {}, '/Create/').then(response => {
        this.getData(true)
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới biên bản hội chẩn?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
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
