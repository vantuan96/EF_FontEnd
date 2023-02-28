<template>
  <div class="main-content">
      <h1 class="text-center form-title">{{__t("Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện")}}</h1>
    <template v-if="loaded">
    <!-- boxTab -->
      <div class="v-tab v-tab-2" v-if="List.length">
        <template>
          <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx no-border" :class="activeClass(item.Id)">
              <router-link class="no-border" :to="{name:`${_VisitType}ExternalTransportationAssessmentItem`, params: { Id: _VisitId, Item: item.Id }}">
                <div class="box-info-item">
                  <div><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></div>
                  <div>{{item.CreatedAt | formatDateTime}}</div>
                  <div>{{__t('Phiếu')}} {{index + 1}}</div>
                </div>
              </router-link>
            </li>
            <li class="text-center flex-container no-border" v-if="!IsLocked">
              <a @click="confirmPopup()" class="add-btn-active no-border">
                <div class="box-info-item">
                  <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                  <div>{{__t('Thêm phiếu')}}</div>
                </div>
              </a>
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
        <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
        <!-- <h4>{{__t("Chưa có bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện")}}</h4>
        <button class="btn v-yellow-btn" v-if="!IsLocked" @click="confirmPopup()">{{__t('Tạo mới')}}</button> -->
      </div>
    </template>
    <div v-else class="loading-text"><v-loading /></div>
  </div>
</template>
<script>
import MixinForm from '@/mixins/form.js'
import ExternalTransportationAssessment from '@/services/IPD/ExternalTransportationAssessment'
export default {
  name: 'ExternalTransportationAssessmentIndexE',
  props: ['VisitId'],
  mixins: [MixinForm],
  data () {
    return {
      List: [],
      IsLocked: false,
      loaded: false,
      viewOnly: false
    }
  },
  mounted () {
    this.getList()
  },
  computed: {
    formId () {
      return this.$route.params.Item || ''
    }
  },
  methods: {
    getList () {
      new ExternalTransportationAssessment({}, this._VisitType)
        .find('List/' + this._VisitId)
        .then((response) => {
          this.List = response.EIOExternalTransportationAssessments
          if (response.EIOExternalTransportationAssessments.length > 0 && !this.$route.params.Item) {
            this.formId = response.EIOExternalTransportationAssessments[response.EIOExternalTransportationAssessments.length - 1].Id
          }
          this.IsLocked = response.IsLocked
          if (response.IsLocked) {
            this.viewOnly = true
          }
          if (response.EIOExternalTransportationAssessments.length > 0 && !this.$route.params.Item) {
            this.$router.push({name: `${this._VisitType}ExternalTransportationAssessmentItem`, params: { Id: this._VisitId, Item: response.EIOExternalTransportationAssessments[response.EIOExternalTransportationAssessments.length - 1].Id }})
          }
          this.loaded = true
        }).catch((e) => {
          if (e.data !== undefined) {
            this.IsLocked = e.data.IsLocked
            this.loaded = true
          } else {
            this.loaded = true
          }
        })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t(
          'Tạo mới bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện?'
        ),
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
    create () {
      new ExternalTransportationAssessment({}, this._VisitType)
        .update('Create/' + this._VisitId, {})
        .then((res) => {
          this.toastedSuccess()
          this.$router.push({name: `${this._VisitType}ExternalTransportationAssessmentItem`, params: { Id: this._VisitId, Item: res.Id }})
        })
        .catch((e) => {
        })
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-content {
  li {
    a {
      height: 85px;
      .box-info-item {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        justify-content: space-around;
      }
    }
  }
}
</style>
