<template>
  <div class="main-content">
    <div v-if="loaded">
      <h1 class="text-center form-title">{{__t('THANG ĐIỂM GUSS ĐÁNH GIÁ RỐI LOẠN NUỐT CHO NGƯỜI BỆNH TẠI GIƯỜNG')}}</h1>
      <div v-if="Lists.length > 0" class="v-tab v-tab-2">
        <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
          <li :data="item" :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" :class="activeClass(item.Id)" style="margin-right: 0px">
            <router-link class="no-border" :to="{ name: 'GuggingSwallowingScreenItem', params: { Id: $route.params.Id, Item: item.Id }}">
              {{item.Label}}
              <div>{{item.CreatedAt}}</div>
              <div>
                <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                <br v-else-if="item.CreatedBy === ''">
              </div>
            </router-link>
          </li>
          <li class="text-center flex-container no-border" v-if="!IsLocked && condition === 'Nurse'">
            <a @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;" >
              <div><i class="fa fa-plus" aria-hidden="true"></i></div>
              <div>{{__t('Thêm phiếu')}}</div>
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view :viewOnly="IsLocked"/>
          </transition>
        </div>
      </div>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{___t('CHƯA CÓ THANG ĐIỂM GUSS ĐÁNH GIÁ RỐI LOẠN NUỐT CHO NGƯỜI BỆNH TẠI GIƯỜNG')}}</p>
          <button class="btn btn-warning" @click="confirmPopup" v-if="!IsLocked && condition === 'Nurse'">{{___t('Tạo mới')}}</button>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <div>
      <logs v-if="!readonly || !IsLocked" :EdId="this.$route.params.Id" :Type="'IPD/GuggingSwallowingScreen'"/>
      <p>A02_050_050919_V</p>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import Logs from '@/components/Logs.vue'
import MixinForm from '@/mixins/form.js'
import FormMixin from '../InitialAssessment/Mixi.js'
import GuggingSwallowingScreen from '@/services/IPD/GuggingSwallowingScreen'
import moment from 'moment'
export default {
  name: 'GuggingSwallowingScreenIndex',
  mixins: [MixinForm, MixinMasterData, FormMixin],
  props: ['VisitId', 'VisitType', 'readonly'],
  components: {
    Logs
  },
  data () {
    return {
      IsLocked: false,
      DataSubmit: null,
      loaded: false,
      part2Codes: ['IPDDGRLNNNBT', 'IPDDGRLNHOCO', 'IPDDGRLNHOKO', 'IPDDGRLNNNCH', 'IPDDGRLNNKND', 'IPDDGRLNCNDC', 'IPDDGRLNCNDK', 'IPDDGRLNTDGC', 'IPDDGRLNTDGK'],
      explainCode: ['IPDDGRLNTBTN', 'IPDDGRLNCNDV', 'IPDDGRLNNDVC', 'IPDDGRLNNDVB'],
      Type: 'A02_050_050919_V',
      tabId: '',
      Lists: null
    }
  },
  mounted () {
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
    create () {
      new GuggingSwallowingScreen().update('/create/' + this.Type + '/' + this.$route.params.Id).then(response => {
        this.toastedSuccess()
        this.$router.push({name: 'GuggingSwallowingScreenItem', params: { Id: this.$route.params.Id, Item: response.Id }})
      })
    },
    getData () {
      new GuggingSwallowingScreen().find('/' + this.Type + '/' + this.$route.params.Id).then(response => {
        this.IsLocked = response.IsLocked
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
          this.$router.push({name: 'GuggingSwallowingScreenItem', params: { Id: this.$route.params.Id, Item: response.Datas[response.Datas.length - 1].Id }})
        }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới THANG ĐIỂM GUSS ĐÁNH GIÁ RỐI LOẠN NUỐT CHO NGƯỜI BỆNH TẠI GIƯỜNG?'),
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
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
