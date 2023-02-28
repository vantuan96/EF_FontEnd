<template>
  <v-layout>
    <div class="container">
      <section class="content">
        <div class="main-content" id="dashboard-page" v-if="Sites && Sites.length">
          <div class="setting-form">
            <div class="accordion">
              <div class="panel-group" id="accordion" role="tablist">
                <div class="panel panel-default" :data="item" :key="index" v-for="(item ,index) in Sites">
                  <div class="panel-heading" role="tab" :id="'heading-' + item.Id" @click="setSite(item.Id, $event)">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse-' + item.Id" aria-expanded="true" :aria-controls="'collapse-' + item.Id">
                        <i class="fa fa-fw fa-hospital-o"></i> {{item.Name}}
                        <i class="fa fa-fw fa-plus-square"></i>
                        <i class="fa fa-fw fa-minus-square"></i>
                      </a>
                    </h4>
                  </div>
                  <div :id="'collapse-' + item.Id" class="panel-collapse collapse" :class="{'collapsed in': item.Id === DataSubmit.SiteId}" role="tabpanel">
                    <div class="panel-body">
                      <v-select :filterable="true" :options="item.Specialities" label="Name" v-model="item.Specialty" :placeholder="__t('Chọn chuyên khoa')">
                        <template slot="no-options">
                          {{__t('Gõ để tìm ...')}}
                        </template>
                        <template slot="no-options">
                          {{__t('Gõ để tìm ...')}}
                        </template>
                      </v-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <button class="btn btn-block" @click="reset">{{__t('Hủy')}}</button>
              </div>
              <div class="col-md-8">
                <button class="btn btn-block btn-warning" @click="submit">{{__t('Chọn và lưu')}}</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="login-box">
          <div class="login-box-body text-center">
            <router-link :to="{path: '/record'}">
              <button type="button" class="btn btn-warning">
                <span class="glyphicon glyphicon-folder-open"></span>  {{__t('Kho HSBA')}}
              </button>
            </router-link>
            <router-link :to="{path: '/DoctorPlaceDiagnosticsOrder'}">
              <button type="button" class="btn btn-info">
                <i class="glyphicon glyphicon-user"></i>  {{__t('Chỉ định dịch vụ')}}
              </button>
            </router-link>
            <router-link :to="{path: '/Prescription'}">
              <button type="button" class="btn btn-success">
                <span class="glyphicon glyphicon-th-list"></span>  {{__t('Đơn thuốc')}}
              </button>
            </router-link>
            <router-link :to="{path: '/MedicationAdministrationRecord'}">
              <button type="button" class="btn">
                <span class="glyphicon glyphicon-list-alt"></span>  {{__t('Y lệnh nội trú')}}
              </button>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </v-layout>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VLayout from '@/layouts/Default.vue'
// import NProgress from 'nprogress'
import Account from '@/services/Account'
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  /**
   * The name of the page.
   */
  name: 'Dashboard',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  data () {
    return {
      DataSubmit: {
        SpecialtyId: null,
        SiteId: null
      },
      show: null
      // Sites: []
    }
  },
  computed: {
    ...mapGetters({
      Sites: 'account/getSites',
      Site: 'account/getSite',
      Specialty: 'account/getSpecialty',
      Position: 'account/getPosition'
    })
  },
  watch: {
    Site (newVal) {
      this.DataSubmit.SiteId = newVal ? newVal.Id : null
    }
  },
  created () {
    // this.Site = this.$store.state.account.Site
    // this.Specialty = this.$store.state.account.Specialty
    this.DataSubmit.SiteId = this.Site ? this.Site.Id : null
  },
  methods: {
    setSite (SiteId, event) {
      setTimeout(() => {
        if (this.DataSubmit.SiteId === SiteId) {
          this.DataSubmit.SiteId = null
          // event.stopPropagation()
        } else {
          this.DataSubmit.SiteId = SiteId
        }
      }, 100)
    },
    reset () {
      this.go2Home()
    },
    submit () {
      var site = this.Sites.find(e => e.Id === this.DataSubmit.SiteId)
      if (!site) {
        return false
      }
      this.DataSubmit.SpecialtyId = site.Specialty ? site.Specialty.Id : null
      if (this.DataSubmit.SpecialtyId) {
        new Account().ChooseSite(this.DataSubmit).then(response => {
          // if (response.Token) {
          //   Axios.defaults.headers.common.RequestVerificationToken = response.Token
          //   $('[name="__RequestVerificationToken]').val(response.Token)
          // }
          this.toastedSuccess()
          this.$store.dispatch('account/find')
          setTimeout(() => {
            // localStorage.removeItem('ROOMS')
            this.$router.push({path: '/' + site.Specialty.VisitTypeGroupCode})
            this.getMasterDataForStogate()
          }, 1000)
        })
      } else {
      }
    }
  }
}
</script>
