<template>
  <div class="main-content" id="ProcedureSummaryPage">
    <!-- <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Phiếu phẫu thuật/thủ thuật')}}</b></h2> -->
    <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Tóm tắt phẫu thuật')}}</b></h2>
    <div v-if="loaded">
      <!-- <div> -->
        <div v-if="Lists && Lists.length > 0" class="v-tab v-tab-2">
          <!-- Version 3 -->
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item"  :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" style="margin-right: 0px;">
              <router-link @click="selectTab()" class="no-border" :to="{name: _VisitType + 'SurgeryAndProcedureSummaryItem', params: { Id: $route.params.Id, Item: item.Id, Version: item.Version }}">
                <div>
                {{__t(item.Label)}}
                {{item.Index}}
                </div>
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="hasRole('IPDSAPSV3C') || hasRole('EDSAPSV3C') || hasRole('EOCSAPSV3C') || hasRole('OPDSAPSV3C')">
              <a v-if="!IsLocked" @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;" >
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm phiếu')}}</div>
              </a>
            </li>
          </ul>
          <!-- Version 2 -->
          <!-- <ul v-else class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item"  :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" style="margin-right: 0px;">
              <router-link @click="selectTab()" class="no-border" :to="{name: _VisitType + 'ProcedureSummaryItem', params: { Id: $route.params.Id, Item: item.Id }}">
                <div>
                {{__t(item.Label)}}
                {{item.Index}}
                </div>
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="isShowButtonCreate">
              <a  @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;" >
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm phiếu')}}</div>
              </a>
            </li>
          </ul> -->
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view :viewOnly="IsLocked"/>
              <!-- <router-view :viewOnly="false"/> -->
            </transition>
          </div>
        </div>
        <!-- <div v-else class="text-center p20" v-show="isShowButtonCreate"> -->
        <div v-else class="text-center p20">
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có thông tin')}}</p>
          <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
        </div>
      <!-- </div> -->
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
// import ProcedureSummary from '@/services/ProcedureSummary'
import ProcedureSummaryCheck from '@/services/ProcedureSummaryCheck'
import SurgeryAndProcedureSummaryV3 from '@/services/SurgeryAndProcedureSummaryV3'
import moment from 'moment'
export default {
  name: 'ProcedureSummaryList',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType'],
  mixins: [],
  components: {},
  data () {
    return {
      IsLocked: false,
      // IsLocked: true,
      Lists: null,
      loaded: false,
      // loaded: true,
      isShowButtonCreate: false,
      // isShowButtonCreate: true,
      // Version: '2'
      Version: '3'
    }
  },
  computed: {
  },
  mounted () {
    this.getData()
    console.log('222')
  },
  methods: {
    async getData (isNewForm) {
      this.loaded = false
      if (this._VisitType === 'IPD') {
        await new ProcedureSummaryCheck({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
          console.log('loaded 1')
          this.IsLocked = response.IsLocked
          // this.loaded = true
        })
      } else {
        await new SurgeryAndProcedureSummaryV3({}, this._VisitType).find('Infor/' + this._VisitId + '?hidemsg=' + true).then(response => {
          this.IsLocked = response
          // this.loaded = true
        })
      }
      // if (this.Version === '3') {
      new SurgeryAndProcedureSummaryV3({}, this._VisitType).find('GetListItemsByVisitId/' + this._VisitId + '?hidemsg=' + true).then(response => {
        console.log('loaded 2')
        this.loaded = true
        if (this._VisitType === 'IPD') {
          if (this.hasRole('IPDSAPSV3C')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
            this.enableEdit = false
          }
        } else if (this._VisitType === 'ED') {
          if (this.hasRole('EDSAPSV3C')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        } else if (this._VisitType === 'EOC') {
          if (this.hasRole('EOCSAPSV3C')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        } else {
          if (this.hasRole('OPDSAPSV3C')) {
            this.isShowButtonCreate = true
          } else {
            this.isShowButtonCreate = false
          }
        }
        if (this.IsLocked) {
          this.isShowButtonCreate = false
        }
        if (response.Count !== 0) {
          this.Lists = response.ListItems.map((e, i) => {
            return {
              Id: e.Id,
              Index: i + 1,
              Label: this.$t('Phiếu'),
              // Label: this.__t('Phiếu') + ' ' + (i + 1),
              // ViName: this.__t('Phiếu') + ' ' + (i + 1),
              // EnName: this.__t('Phiếu') + ' ' + (i + 1),
              CreatedAt: moment(e.CreateAt).format('HH:mm DD/MM/YYYY'),
              Version: e.Version,
              CreatedBy: e.CreateBy
            }
          })
        } else {
          this.Lists = null
        }
        if (this.$route.params.Item && !isNewForm) {
          // nothing
        } else {
          this.$router.push({name: this._VisitType + 'SurgeryAndProcedureSummaryItem', params: {Id: this.$route.params.Id, Item: this.Lists[this.Lists.length - 1].Id, Version: this.Lists[this.Lists.length - 1].Version}})
        }
      }).catch(e => {
        this.loaded = true
      })
      // }
      //  else {
      //   new ProcedureSummary({}, this._VisitType).find('List/' + this._VisitId + '?hidemsg=' + true).then(response => {
      //     this.loaded = true
      //     if (this._VisitType === 'IPD') {
      //       if (this.hasRole('IPRSU1')) {
      //         this.isShowButtonCreate = true
      //       } else {
      //         this.enableEdit = false
      //       }
      //     } else if (this._VisitType === 'ED') {
      //       if (this.hasRole('EPRSU1')) {
      //         this.isShowButtonCreate = true
      //       }
      //     } else if (this._VisitType === 'EOC') {
      //       if (this.hasRole('EOCPRS01')) {
      //         this.isShowButtonCreate = true
      //       }
      //     } else {
      //       if (this.hasRole('OPRSU1')) {
      //         this.isShowButtonCreate = true
      //       }
      //     }
      //     if (this.IsLocked) {
      //       this.isShowButtonCreate = false
      //     }
      //     if (response.Count !== 0) {
      //       this.Lists = response.map((e, i) => {
      //         return {
      //           Id: e.Id,
      //           Index: i + 1,
      //           Label: this.$t('Phiếu'),
      //           // Label: this.__t('Phiếu') + ' ' + (i + 1),
      //           // ViName: this.__t('Phiếu') + ' ' + (i + 1),
      //           // EnName: this.__t('Phiếu') + ' ' + (i + 1),
      //           CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
      //           Version: e.Version,
      //           CreatedBy: e.CreatedBy
      //         }
      //       })
      //     } else {
      //       this.Lists = null
      //     }
      //     if (this.$route.params.Item && !isNewForm) {
      //       // nothing
      //     } else {
      //       this.$router.push({name: this._VisitType + 'ProcedureSummaryItem', params: {Id: this.$route.params.Id, Item: this.Lists[this.Lists.length - 1].Id, Version: this.Lists[this.Lists.length - 1].Version}})
      //     }
      //   }).catch(e => {
      //     this.loaded = true
      //   })
      // }
    },
    create () {
      // new ProcedureSummary({}, this._VisitType).update(this._VisitId, {}, 'Create/').then(response => {
      //   this.getData(true)
      // }).catch(e => {
      //   // this.back()
      // })
      new SurgeryAndProcedureSummaryV3({}, this._VisitType).update(this._VisitId, {}, 'Create/').then(response => {
        this.Version = response.Version
        this.$router.push({name: this._VisitType + 'SurgeryAndProcedureSummaryItem', params: {Id: this.$route.params.Id, Item: response.Id, Version: response.Version}})
        // this.getData(true)
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Tóm tắt phẫu thuật'),
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
