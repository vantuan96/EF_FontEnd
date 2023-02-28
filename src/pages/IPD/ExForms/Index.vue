<template>
  <div id="ExForms-Page" class="main-content disable_ccp">
    <h2 class="text-center cap mrb30 fw600">{{__t('label')}}</h2>
    <template v-if="loaded">
      <div class="v-tab v-tab-2" v-if="List.length">
        <template>
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx">
              <router-link class="no-border" :to="{name:'IPDExFormsItem', params: { Id: _VisitId, Item: item.Id }}">
                <div class="box-info-item">
                  <div>{{__t('Phiếu')}} {{index + 1}}</div>
                  <div><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></div>
                  <div>{{item.CreatedAt | formatDateWithoutSecon}}</div>
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="!IsLocked">
              <a  @click="confirmPopup()" class="add-btn-active no-border" style="height: 71px;padding-top: 13px;">
                <div class="box-info-item">
                  <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                  <div>{{__t('Thêm phiếu')}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view :IsLocked="IsLocked"/>
            </transition>
          </div>
        </template>
      </div>
      <div class="text-center" v-else>
        <h4>{{__t('Chưa có thông tin !')}}</h4>
        <button class="btn v-yellow-btn" v-if="!IsLocked" @click="confirmPopup()">{{__t('Tạo mới')}}</button>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
     <div>
      <p>A03_116_200520_V</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
// import ClinicalBreastExamNote from '@/services/OPD/ClinicalBreastExamNote'
import Item from './Item.vue'

export default {
  name: 'ExForms',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      loaded: false,
      List: [],
      IsLocked: false
    }
  },
  components: {
    Item
  },
  mounted () {
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
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
    // lấy dữ liệu visitID
    getData () {
      // new ClinicalBreastExamNote().find('OPD/' + this._VisitId + '?hidemsg=' + true).then(res => {
      //   this.loaded = true
      //   // lấy danh sách
      //   this.List = res.Datas
      //   // lấy thông tin khoá 24h
      //   this.IsLocked = res.is_block_after_24h
      //   if (res.Datas.length > 0 && !this.$route.params.Item) {
      //     // đẩy bắn sang items mới nhất
      //     this.$router.push(
      //       {
      //         name: 'IPDExFormsItem',
      //         params: { Id: this._VisitId, Item: res.Datas[res.Datas.length - 1].Id }
      //       }
      //     )
      //   }
      // }).catch((e) => {
      //   console.log(e)
      //   this.loaded = true
      // })
    },
    // xác nhận tạo mới
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Tạo phiếu ...'),
        text: this.$t('Bạn có chắc chắn tạo ...?'),
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
    // tạo mới form
    handleCreate () {
      // new ClinicalBreastExamNote().update('Create/' + 'OPD/' + this._VisitId).then(res => {
      //   this.toastedSuccess()
      //   this.$router.push(
      //     {
      //       name: 'IPDExFormsItem',
      //       params: { Id: this._VisitId, Item: res.Id }
      //     }
      //   )
      // }).catch(e => {
      //   console.log(e)
      // })
    }
  }
}
</script>
<style scoped>
  .flex-containerx {
    margin-right: 0px!important;
  }
</style>
