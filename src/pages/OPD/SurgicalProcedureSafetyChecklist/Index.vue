<template>
  <div class="main-content" id="SurgicalProcedureSafetyChecklist-page">
    <h1 class="text-center form-title">{{__t('Bảng kiểm an toàn phẫu thuật/thủ thuật')}}</h1>
    <div class="v-tab" v-if="hasData">
      <div v-if="IsLocked">
        <div class="v-tab">
          <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
            <li role="presentation" :class="activeClass('SignIn')">
              <a @click="type = 'SignIn'" class="link">
                {{__t('Trước khi gây mê/ gây tê')}}<br/>
                <small>{{__t('(Điều dưỡng gây mê/ phụ trách tham gia)')}}</small>
              </a>
            </li>
            <li role="presentation" :class="activeClass('TimeOut')">
              <a @click="type = 'TimeOut'" class="link">
                {{__t('Trước khi rạch da')}}<br/>
                <small>{{__t('(Kíp phẫu thuật/ thủ thuật tham gia)')}}</small>
              </a>
            </li>
            <li role="presentation" :class="activeClass('SignOut')">
              <a @click="type = 'SignOut'"  class="link">
                {{__t('Trước khi NB rời phòng phẫu thuật/thủ thuật')}}<br/>
                <small>{{__t('(Điều dưỡng, bác sĩ gây mê, bác sĩ phẫu thuật tham gia)')}}</small>
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <component v-if="type in $options.components" v-bind:is="type" :VisitType="_VisitType" :VisitId="_VisitId" :FormId="data[type]"/>
        </div>
      </div>
      <div v-else>
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass(_VisitType + 'SurgicalProcedureSafetyChecklistSignIn')">
            <router-link :to="{name: _VisitType + 'SurgicalProcedureSafetyChecklistSignIn', params: { Id: this.$route.params.Id,FormId: data.Id, ItemId: (data.SignIn || 'new') }}">
              {{__t('Trước khi gây mê/ gây tê')}}<br/>
              <small>{{__t('(Điều dưỡng gây mê/ phụ trách tham gia)')}}</small>
            </router-link>
          </li>
          <li role="presentation" :class="activeClass(_VisitType + 'SurgicalProcedureSafetyChecklistTimeOut')">
            <router-link :to="{name: _VisitType + 'SurgicalProcedureSafetyChecklistTimeOut', params: { Id: this.$route.params.Id,FormId: data.Id, ItemId: (data.TimeOut || 'new') }}">
              {{__t('Trước khi rạch da')}}<br/>
              <small>{{__t('(Kíp phẫu thuật/ thủ thuật tham gia)')}}</small>
            </router-link>
          </li>
          <li role="presentation" :class="activeClass(_VisitType + 'SurgicalProcedureSafetyChecklistSignOut')">
            <router-link :to="{name: _VisitType + 'SurgicalProcedureSafetyChecklistSignOut', params: { Id: this.$route.params.Id,FormId: data.Id, ItemId: (data.SignOut || 'new') }}">
              {{__t('Trước khi NB rời phòng phẫu thuật/thủ thuật')}}<br/>
              <small>{{__t('(Điều dưỡng, bác sĩ gây mê, bác sĩ phẫu thuật tham gia)')}}</small>
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view :formdata="2313"/>
          </transition>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>
      <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
    </div>
  </div>
</template>
<script>
import SurgicalProcedureSafetyChecklist from '@/services/SurgicalProcedureSafetyChecklist'
import SignIn from './SignInView.vue'
import TimeOut from './TimeOutView.vue'
import SignOut from './SignOutView.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'SurgicalProcedureSafetyChecklist',
  data () {
    return {
      Id: this.$route.params.Id,
      type: 'SignIn',
      types: {
        OPDJointConsultationGroupMinutes: 'OPD',
        EDJointConsultationGroupMinutes: 'ED',
        IPDJointConsultationGroupMinutes: 'IPD'
      },
      hasData: false,
      IsLocked: false,
      data: {
        SignIn: null,
        SignOut: null,
        TimeOut: null
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    SignIn,
    TimeOut,
    SignOut
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    getData () {
      this.loaded = false
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.hasData = true
        this.data = response
        this.IsLocked = response.IsLocked
        if (this.$route.name === this._VisitType + 'SurgicalProcedureSafetyChecklist') this.$router.push({name: this._VisitType + 'SurgicalProcedureSafetyChecklistSignIn', params: {Id: this.$route.params.Id, FormId: response.Id, ItemId: response.SignIn}})
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        console.log(e)
      })
    },
    creat () {
      new SurgicalProcedureSafetyChecklist({}, this._VisitType).update('Create/' + this.$route.params.Id, {}).then(response => {
        new SurgicalProcedureSafetyChecklist({}, this._VisitType).update('SignIn/Create/' + response.Id, {}).then(response => {
          this.getData()
        })
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Tạo mới Bảng kiểm an toàn phẫu thuật/thủ thuật'),
        text: this.$t('Trước khi gây mê/ gây tê'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
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
