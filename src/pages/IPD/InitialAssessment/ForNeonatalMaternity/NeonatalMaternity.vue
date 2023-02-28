<template>
  <div :class="!checkInfoVersion ? 'box box-table' : ''">
    <div class="flex-box flex-center padding-1z5 mt-10" style="flex-flow: row wrap;" v-if="!checkInfoVersion">
      <b class="mr-5 ml-5">{{__t('Nội dung đánh giá')}}:</b>
      <div class="group-tab flex">
        <div v-for="(type, index) in Types" :key="index">
          <router-link :to="{name: type.RouteName, params: { Id: $route.params.Id }}">
            <label @click="Type = type.Value">{{__t(type.Label)}}</label>
          </router-link>
        </div>
      </div>
    </div>
    <div class="v-tab v-tab-2" v-else-if="checkInfoVersion && List.length > 0 && checkSpecial === 'A01_035_050919_V'">
      <template>
        <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
          <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx no-border" style="margin-right: 0px !important">
            <router-link class="no-border" :to="{name:'IPDNeonatalMaternityV2', params: { Id: $route.params.Id, Item: item.Id, NewbornCustomerId:item.NewbornCustomer.Id}}">
              <div>{{__t('Sơ sinh')}} {{index + 1}} {{item.NewbornCustomer.FullName ? ' - ' + item.NewbornCustomer.FullName : ''}}</div>
            </router-link>
          </li>
          <li class="text-center flex-container no-border">
            <a v-if="checkSpecial === 'A01_035_050919_V' && !IsLocked" @click="confirmPopup()" class="add-btn-active no-border">
              <div class="box-info-item flex align-center">
                <div class="mrr5"><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div>{{__t('Thêm sơ sinh')}}</div>
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
    <div class="v-tab v-tab-2" v-else-if="checkInfoVersion && dataNewBorn && checkSpecial !== 'A01_035_050919_V'">
      <template>
        <ul class="nav nav-tabs flex-containerx no-border" style="display: none" role="tablist">
          <li class="text-center flex-containerx no-border">
            <router-link class="no-border" :to="{name:'IPDNeonatalMaternityV2', params: { Id: $route.params.Id, Item: dataNewBorn.ID, NewbornCustomerId: '1' }}">
              <div>Sơ sinh 1 </div>
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page1" mode="out-in1">
            <router-view/>
          </transition>
        </div>
      </template>
    </div>
    <div class="text-center mt-20" v-else-if="checkInfoVersion && List.length === 0 && checkSpecial === 'A01_035_050919_V' || checkInfoVersion && !dataNewBorn && checkSpecial !== 'A01_035_050919_V'">
        <p>{{__t('Chưa có đánh giá ban đầu cho trẻ vừa sinh')}}</p>
        <div>
          <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    <div v-if="!checkInfoVersion">
      <router-view/>
    </div>
  </div>
</template>
<script>
import InitialAssessment from '@/services/IPD/InitialAssessment'
import EIOService from '@/services/IPD/EIOService'
import EventBus from '@/lib/eventBus'
import MixinForm from '@/mixins/form.js'
export default {
  name: 'IPDInitialAssessmentNeonatalMaternity',
  mixins: [MixinForm],
  data () {
    return {
      Types: [
        {
          Label: 'Đánh giá chung',
          Value: 1,
          RouteName: 'IPDInitialAssessmentForNeonatalMaternity'
        },
        {
          Label: 'Ngay sau sinh',
          Value: 2,
          RouteName: 'IPDInitialAssessmentForAdmissionAssessment'
        },
        {
          Label: 'Trong 2h sau sinh',
          Value: 3,
          RouteName: 'IPDInitialAssessmentForUterineLife2Hours'
        }
      ],
      Type: 1,
      List: [],
      ListNewBorn: [{
        SpecialtyEnName: 'SpecialtyEnName'
      }],
      checkInfoVersion: false,
      checkSpecial: '',
      dataNewBorn: {},
      checkUpdate: false,
      IsLocked: false
    }
  },
  mounted () {
    EventBus.$on('UpdateListSoSinh', this.handleTest)
    EventBus.$on('UpdateInfoCustomer', this.handleUpdateInfo)
    this.getTypeOfSpecial()
  },
  methods: {
    handleUpdateInfo () {
      this.checkUpdate = true
      this.getDataWomen()
    },
    handleTest () {
      this.getTypeOfSpecial()
    },
    getTypeOfSpecial () {
      new InitialAssessment().find('ForNeonatalMaternityV2/InforVersion/' + this._VisitId).then(response => {
        this.checkInfoVersion = response.IsNewVisit
        this.checkSpecial = response.MedicalRecordCode
        if (this.checkSpecial === 'A01_035_050919_V') {
          this.getDataWomen()
        } else if (this.checkSpecial === 'A01_038_050919_V') {
          this.getDataNewBorn()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDataNewBorn () {
      new InitialAssessment().find('ForNeonatalMaternityV2/A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity').then(response => {
        this.dataNewBorn = response
        this.$router.push({name: 'IPDNeonatalMaternityV2', params: { Id: this._VisitId, Item: response.ID, NewbornCustomerId: '1' }})
      }).catch(err => {
        console.log(err)
        this.dataNewBorn = null
      })
    },
    getDataWomen () {
      new InitialAssessment().find('ForNeonatalMaternityV2/GetList/' + this._VisitId).then(response => {
        this.List = response.Forms
        this.IsLocked = response.IsLocked
        if (!this.checkUpdate) {
          if (response.Forms.length > 0 && !this.$route.params.Item) {
            this.$router.push({name: 'IPDNeonatalMaternityV2', params: { Id: this._VisitId, Item: response.Forms[response.Forms.length - 1].Id, NewbornCustomerId: response.Forms[response.Forms.length - 1].NewbornCustomer.Id }})
          }
        }
      }).catch(err => {
        console.log(err)
        this.List = []
      })
    },
    handleCreateForNewborn () {
      new InitialAssessment().update('ForNeonatalMaternityV2/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/' + 'ForNeonatalMaternity').then(response => {
        this.toastedSuccess()
        this.reload()
      })
    },
    handleCreateForWomen () {
      new EIOService().update('ContraintNewbornAndPregnantWoman/Created/' + this._VisitId + '/' + 'IPD/' + 'A02_016_050919_VE_ForNeonatalMaternity_Obstetrics').then(res => {
        this.handleCreateItemForWomen(res.Id)
      })
    },
    handleCreateItemForWomen (id) {
      new InitialAssessment().update('ForNeonatalMaternityV2/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/' + 'ForNeonatalMaternity_Obstetrics' + '/' + id).then(response => {
        this.toastedSuccess()
        this.$router.push({name: 'IPDNeonatalMaternityV2', params: { Id: this.$route.params.Id, Item: response.Id, NewbornCustomerId: id }})
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ban đầu trẻ vừa sinh *?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              if (this.checkSpecial === 'A01_035_050919_V') {
                this.handleCreateForWomen()
              } else if (this.checkSpecial === 'A01_038_050919_V') {
                this.handleCreateForNewborn()
              }
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
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
<style scoped>
  .nav-tabs {
    margin-right: 0px;
  }
</style>
