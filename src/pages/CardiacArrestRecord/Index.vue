<template>
  <div class="main-content" id="CardiacArrestRecord-page" v-if="loaded">
    <h1 class="text-center form-title">{{__t('Bảng hồi sinh tim phổi')}}</h1>
    <div class="v-tab" v-if="hasData">
      <template v-if="data.Version === 1">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass(type + 'CardiacArrestRecordForm')">
          <router-link :to="{name: type + 'CardiacArrestRecordForm', params: { Id: this.$route.params.Id, FormId: data.Id }}">
            {{__t('Thông tin hồi sinh tim phổi')}}<br/>
          </router-link>
        </li>
        <li role="presentation" :class="activeClass(type + 'CardiacArrestRecordTable')">
          <router-link :to="{name: type + 'CardiacArrestRecordTable', params: { Id: this.$route.params.Id, FormId: data.Id }}">
            {{__t('Bảng hồi sinh tim phổi')}}<br/>
          </router-link>
        </li>
      </ul>
      <div class="tab-content">
        <transition name="page" mode="out-in">
          <router-view :formdata="data" v-if="data" :VisitType="type"/>
        </transition>
      </div>
      </template>
      <template v-if="data.Version === 2">
        <CardiacArrestRecordV2 :readonly="readonly" :formdata="data" v-if="data" :VisitType="type"/>
      </template>
    </div>
    <div class="text-center" v-else>
      <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
      <!-- <p>{{__t('Chưa có bảng hồi sinh tim phổi')}}</p>
      <button class="btn btn-warning" @click="confirmPopup" v-if="!showbtn && !IsLocked">{{__t('Tạo mới')}}</button> -->
    </div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>
<script>
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
import CardiacArrestRecordChecked from '@/services/CardiacArrestRecordChecked'
import CardiacArrestRecordV2 from './FormV2'
export default {
  /**
   * The name of the page.
   */
  name: 'CardiacArrestRecord',
  data () {
    return {
      Id: this.$route.params.Id,
      hasData: false,
      showbtn: false,
      loaded: false,
      data: null,
      type: 'ED',
      types: {
        OPDCardiacArrestRecord: 'OPD',
        EDCardiacArrestRecordForm: 'ED',
        EDCardiacArrestRecordTable: 'ED',
        OPDCardiacArrestRecordForm: 'OPD',
        OPDCardiacArrestRecordTable: 'OPD',
        IPDCardiacArrestRecordForm: 'IPD',
        IPDCardiacArrestRecordTable: 'IPD'
      },
      IsLocked: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    CardiacArrestRecordV2
  },
  mounted () {
    this.type = this._VisitType
    this.id = 'Info/' + this.$route.params.Id
    this.getData()
  },
  computed: {
    readonly () {
      return this.data.IsLocked || this.IsLocked
    }
  },
  methods: {
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    getData () {
      if (this._VisitType === 'IPD') {
        new CardiacArrestRecordChecked(this.type).find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
          this.showbtn = response.IsLocked
          this.IsLocked = response.IsLocked
          console.log(this.showbtn)
        }).catch(e => {
          this.loaded = true
        })
      }
      new CardiacArrestRecord(this.type).find('Info/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.hasData = true
        this.loaded = true
        this.IsLocked = response.IsLocked
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
      })
    },
    create () {
      new CardiacArrestRecord(this.type).update('Create/' + this.$route.params.Id, {}).then(response => {
        this.reload()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Bảng hồi sinh tim phổi'),
        text: this.$t('Bạn có chắc tạo Bảng hồi sinh tim phổi?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
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
    }
  }
}
</script>
