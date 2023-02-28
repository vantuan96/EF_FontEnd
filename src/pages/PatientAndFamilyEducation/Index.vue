<template>
  <div class="main-content disable_ccp" id="InitialAssessment-page">
    <h1 class="text-center">{{__t('Phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h1>
    <div v-if="!IsLocked">
      <div class="v-tab v-tab-2" v-if="List.length">
        <ul class="nav nav-tabs" role="tablist">
          <li :data="item" :key="index" v-for="(item ,index) in List">
            <router-link :to="{name: ItemViewName, params: { Id: $route.params.Id, Item: item.Id }}">
              {{__t(item.Label)}} {{item.Index}}<template v-if="item.ViName"> - {{__label(item)}}</template>
            </router-link>
          </li>
          <!-- <li v-if="!HasNewForm && !IsLocked">
            <router-link class="add-btn-active" :to="{name: ItemViewName, params: { Id: $route.params.Id, Item: 'new' }}">
              <i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm phiếu')}} 123
            </router-link>
          </li> -->
          <li v-if="!HasNewForm && !IsLocked">
            <a  @click="confirmPopup()" class="add-btn-active no-border">
              <div class="d-flex">
                <div style="    transform: translateY(3px);"><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div class="ml-5">{{__t('Thêm phiếu')}}</div>
              </div>
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </div>
      <div class="text-center" v-else>
        <h4>{{__t('Chưa có phiếu giáo dục sức khỏe cho người bệnh và thân nhân')}}</h4>
        <button v-if="!IsLocked" class="btn btn-green" @click="confirmPopup()"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm phiếu')}}</button>
      </div>
    </div>
    <div v-else>
      <ViewOnly/>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import PatientAndFamilyEducation from '@/services/PatientAndFamilyEducation'
import ViewOnly from './ViewOPD.vue'
import EIOService from '@/services/IPD/EIOService'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
// import storage from '@/lib/storage'
// import $ from 'jquery'
export default {
  /**
   * The name of the page.
   */
  name: 'PatientAndFamilyEducation',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      VisitVersion: '',
      Id: this.$route.params.Id,
      List: [],
      HasNewForm: false,
      VisitType: 'ED',
      ItemViewName: '',
      data: null,
      IsLocked: false,
      FormCode: 'A03_045_290422_VE'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ViewOnly
  },
  updated () {
  },
  async mounted () {
    // $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
    //   this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
    //   // return false
    // })
    var parrentRoute = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
    this.VisitType = parrentRoute.meta.VisitTypeGroupCode
    this.ItemViewName = this.VisitType + 'PatientAndFamilyEducationView'
    this.getVisitVersion()
    // this.getData()
    await this.getInfo()
    await this.getList()
  },
  computed: {
  },
  beforeRouteLeave (to, from, next) {
    if (to.query.plan || !this.edited) {
      next()
      return
    }
    this.$modal.show('dialog', {
      title: this.__t('Cảnh báo'),
      text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
      class: 'v-dialog v-dialog-warning',
      buttons: [
        {
          title: this.__t('Đồng ý'),
          class: 'btn',
          handler: () => {
            next()
            this.$modal.hide('dialog')
          }
        },
        {
          title: this.__t('Hủy bỏ'),
          class: 'btn bg-yellow',
          handler: () => {
            next(false)
            this.$modal.hide('dialog')
          }
        }
      ]
    })
  },
  methods: {
    getData () {
      this.loading = true
      if (this.$route.params.Item === 'new') {
        this.getNewData()
      } else {
        this.edited = false
        this.getRawMasterDatas({Form: 'PFEF'}, mdata => {
          // new PatientAndFamilyEducation({VisitType: this.VisitType}).find(`${this.FormCode}/` + this.$route.params.Id + '/' + (this.formId || this.$route.params.Id)).then(response => {
          //   this.IsLocked = response.IsLocked
          // })
        })
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        // title: this.$t('SummaryOf15DayTreatment.conFirm1'),
        // text: this.$t('SummaryOf15DayTreatment.conFirm2'),
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Phiếu giáo dục sức khỏe cho người bệnh và thân nhân'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              if (this.VisitVersion >= 10) {
                this.handleCreate()
              } else {
                this.go2NewForm()
              }
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
    handleCreate () {
      new EIOService().update('/PatientAndFamilyEducation/Created/' + this._VisitId + '/' + this.VisitType).then(res => {
        this.toastedSuccess()
        this.$router.push({name: this.ItemViewName, params: { Id: this._VisitId, Item: res.Id }})
        this.reload()
      })
    },
    async getInfo () {
      if (this.VisitType === 'IPD') {
        await new PatientAndFamilyEducation({VisitType: this.VisitType}).find('Info/' + `${this.FormCode}/` + this.$route.params.Id).then(response => {
          this.IsLocked = response.IsLocked
        })
      }
      if (this.VisitType === 'OPD') {
        await new PatientAndFamilyEducation({VisitType: this.VisitType}).find('Info/' + `${this.FormCode}/` + this.$route.params.Id).then(response => {
          this.IsLocked = response.IsLocked24h
        })
      }
    },
    getList () {
      new PatientAndFamilyEducation({VisitType: this.VisitType})
        .find(`${this.FormCode}/` + this.$route.params.Id)
        .then(response => {
          let List = response.map((e, i) => {
            return {
              Id: e.Id,
              Label: 'Lần',
              Index: (i + 1),
              ViName: e.ViName,
              EnName: e.EnName
            }
          })
          this.List = List
          if (this.$route.params.Item && this.$route.params.Item !== 'new') {
            // nothing
          } else {
            this.$router.push({name: this.ItemViewName, params: {Id: this.$route.params.Id, Item: List[List.length - 1].Id}})
          }
        })
    },
    activeClass (id) {
      return this.$route.params.Item ? 'active' : ''
    },
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.VisitVersion = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    go2NewForm () {
      this.$router.push({name: this.ItemViewName, params: {Id: this.$route.params.Id, Item: 'new'}})
      // this.reload()
      this.List.push({
        Id: '',
        Label: 'Lần ' + (this.List.length + 1)
      })
      this.HasNewForm = true
    }
  }
}
</script>
