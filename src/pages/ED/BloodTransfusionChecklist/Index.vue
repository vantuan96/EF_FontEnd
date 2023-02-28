<template>
  <div class="disable_ccp">
    <div class="main-content" id="InitialAssessment-page" v-if="hasData">
      <h1 class="text-center">{{__t('Phiếu truyền máu')}}</h1>
      <div class="v-tab v-tab-2" v-if="List.length">
        <template>
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx no-border">
              <router-link class="no-border" :to="{name: _VisitType + 'BloodTransfusionChecklistItem', params: { Id: $route.params.Id, Item: item.Id }}">
                <div>{{__t(item.Label)}} {{item.Index}}</div>
                <div>{{item.CreatedAt}}</div>
                <div>
                  <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                  <br v-else-if="item.CreatedBy === ''">
                </div>
              </router-link>
            </li>
            <li v-if="!IsLocked" class="text-center flex-container no-border">
              <a v-if="getRole()" @click="confirmPopup()" class="add-btn-active no-border" style="height:70px">
                <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm phiếu')}}</div>
              </a>
              <!-- <a @click="go2NewForm()" class="add-btn-active"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm phiếu')}}</a> -->
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
      <div v-if="IsLocked" style="color: red;" class="italic">
        <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
      </div>
      <div v-else>
        <h4>{{showMessage || __t('Chưa có phiếu truyền máu')}}</h4>
        <button class="btn btn-green" v-if="!IsLocked && isCreate && getRole()" @click="confirmPopup()"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm phiếu')}}</button></div>
      </div>
    </div>
    <div v-else><v-loading/></div>
  </div>
</template>
<script>
import BloodTransfusionChecklist from '@/services/ED/BloodTransfusionChecklist'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'BloodTransfusionChecklistIndex',
  data () {
    return {
      Id: this.$route.params.Id,
      hasData: false,
      data: {},
      List: [],
      hasNew: false,
      IsLocked: false,
      isCreate: true,
      showMessage: ''
    }
  },
  mixins: [MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
  },
  created () {
    this.getData()
  },
  computed: {
  },
  methods: {
    getRole () {
      return this._VisitType === 'IPD' ? this.hasRole('IBLTC1') : this.hasRole('EBLTC1')
    },
    getData (isNewForm) {
      new BloodTransfusionChecklist({}, this._VisitType).find(this.$route.params.Id).then(response => {
        if (response.Datas.length > 0) {
          let List = response.Datas.map((e, i) => {
            return {
              Id: e.Id,
              Index: i + 1,
              Label: this.$t('Phiếu'),
              CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
              CreatedBy: e.CreatedBy
            }
          })
          this.List = List
          if (this.$route.params.Item && !isNewForm) {
            // nothing
          } else {
            this.$router.push({name: this._VisitType + 'BloodTransfusionChecklistItem', params: {Id: this.$route.params.Id, Item: List[List.length - 1].Id}})
          }
        }
        this.isCreate = response.IsExistBrsac
        if (!response.IsExistBrsac) {
          let locale = this.$i18n.locale
          if (locale === 'vi') {
            this.showMessage = 'Xin vui lòng hoàn thiện Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu!'
          } else {
            this.showMessage = 'Please complete the Schedule, provide and confirm the execution of blood - Blood Products!'
          }
        }
        this.hasData = true
      }).catch(e => {
        this.hasData = true
        this.IsLocked = e.data.IsLocked
      })
    },
    create () {
      new BloodTransfusionChecklist({}, this._VisitType).update('Create/' + this.$route.params.Id, {}).then(response => {
        if (response.ViMessage) {
          this.alert('Lỗi', response.ViMessage)
        } else {
          this.getData(true)
          this.hasNew = true
        }
      }).catch(e => {
        // this.back()
        this.errorPopup(e)
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Thêm phiếu truyền máu'),
        text: this.$t('Bạn có chắc chắn thêm phiếu truyền máu mới?'),
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
    },
    errorPopup (e) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Có lỗi xảy ra'),
        text: this.__t(e.data.ViMessage),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
