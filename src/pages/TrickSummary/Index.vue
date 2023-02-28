<template>
  <div class="main-content" id="TrickSummaryPage">
    <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Tóm tắt thủ thuật ')}}</b></h2>
    <div v-if="loaded">
      <div>
        <div v-if="Lists != null && Lists.length > 0" class="v-tab v-tab-2">
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item, index) in Lists" class="text-center flex-containerx no-border" style="margin-right: 0px;">
              <router-link @click="selectTab()" class="no-border" :to="{name: _VisitType + 'TrickSummaryItem', params: { Id: $route.params.Id, Item: item.Id }}">
                <div>
                  {{__t(item.Label)}}
                  {{__t(item.Index)}}
                </div>
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''"/>
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="isShowButtonCreate">
              <a @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;">
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm phiếu')}}</div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <!-- <Item /> -->
            <transition name="page" mode="out-in">
              <router-view :viewOnly="viewOnly"/>
            </transition>
          </div>
        </div>
        <div v-else class="text-center p20">
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có Tóm tắt thủ thuật ')}}</p>
          <button v-if="isShowButtonCreate && (hasRole('OPDPSV22A01084') || hasRole('IPDPSV22A01084') || hasRole('EDPSV22A01084') || hasRole('EOCPSV22A01084'))" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
          <!-- <button v-if="isShowButtonCreate" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
     <!-- <div>
      <p class="mt-10">A01_084_050919_V</p>
    </div>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div> -->
  </div>
</template>

<script>
// import Logs from '@/components/Logs.vue'
import TrickSummary from '@/services/TrickSummary'
import Item from './Item.vue'
import moment from 'moment'
export default {
  name: 'TrickSummaryList',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType'],
  mixins: [],
  components: {
    Item
  },
  data () {
    return {
      timeLog: [],
      hiddenLog: false,
      IsLocked: false,
      Lists: null,
      loaded: false,
      isShowButtonCreate: true,
      formId: ''
    }
  },
  computed: {},
  mounted () {
    this.getData()
  },
  methods: {
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    },
    getData (isNewForm) {
      this.loaded = false
      new TrickSummary({}, this._VisitType).find('GetListItemsByVisitId/' + this._VisitId + '?hidemsg=' + true).then(response => {
        if (response.ListItems) {
          this.setHiddenLog()
        }
        this.IsLocked = response.IsLocked
        console.log(response, 'response receive')
        this.timeLog = [moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdateBy]
        this.loaded = true
        console.log(this.loaded, 'loaded')
        if (this._VisitType === 'IPD') {
          console.log(this._VisitType, 'day la visit TYPE')
          // need has role check
          if (this.hasRole('IPDPSV22A01084') || this.hasRole('IPDPSV23A01084')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        } else if (this._VisitType === 'ED') {
          if (this.hasRole('EDPSV22A01084') || this.hasRole('EDPSV23A01084')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        } else if (this._VisitType === 'EOC') {
          if (this.hasRole('EOCPSV22A01084') || this.hasRole('EOCPSV23A01084')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        } else if (this._VisitType === 'OPD') {
          if (this.hasRole('OPDPSV22A01084') || this.hasRole('OPDPSV23A01084')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        } else {
          // nothing
        }
        // check lock
        if (this.IsLocked) {
          this.isShowButtonCreate = false
        }
        // add name form
        if (response.Count !== 0) {
          console.log('go to add name form')
          console.log(this.$route.params, 'route')
          this.Lists = response.ListItems.map((e, i) => {
            return {
              Id: e.Id,
              Index: i + 1,
              Label: this.$t('Phiếu'),
              CreatedAt: moment(e.CreateAt).format('HH:mm DD/MM/YYYY'),
              CreatedBy: e.CreateBy
            }
          })
        } else {
          this.Lists = null
        }
        // navigate router
        if (this.$route.params.Item && !isNewForm) {
          console.log('bcd')
          // nothing
        } else {
          console.log('navigate router')
          this.$router.push({name: this._VisitType + 'TrickSummaryItem', params: {Id: this.$route.params.Id, Item: this.Lists[this.Lists.length - 1].Id}})
        }
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        if (this.IsLocked === true) {
          this.isShowButtonCreate = false
        }
        this.loaded = true
      })
    },
    create () {
      new TrickSummary({}, this._VisitType).update('/Create/' + this._VisitId).then(response => {
        console.log(response, 'abcss')
        // this.$router.push({name: this._VisitType + 'TrickSummaryItem', params: {Id: this.$route.params.Id, Item: response.Id}})
        this.getData(true)
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Tóm tắt thủ thuật'),
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
    selectTab () {
      if (this.edited) {
        this.$modal.show('dialog', {
          title: this.__t('Cảnh báo'),
          text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý'),
              class: 'btn',
              handler: () => {
                this.$emit('closed')
                this.$modal.hide('MasterDataPopup')
                this.$modal.hide('dialog')
                // this.getLastHistory()
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        // this.getLastHistory()
      }
    }
  }
}
</script>

<style>

</style>
