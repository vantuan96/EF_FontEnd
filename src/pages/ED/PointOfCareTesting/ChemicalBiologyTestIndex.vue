<template>
  <div class="main-content">
    <div class="v-tab v-tab-2" v-if="List.length">
      <ul v-if="Version && Version === 1" class="nav nav-tabs" role="tablist">
        <li :data="item" :key="index" v-for="(item ,index) in List">
          <router-link :to="{name: _VisitType + 'ChemicalBiologyTest', params: { Id: $route.params.Id, Item: item.Id }}">
            {{__t(item.Label)}} {{item.Index}}<template v-if="item.ViName"> - {{__label(item)}}</template>
          </router-link>
        </li>
        <li>
          <a @click="go2NewForm()" class="add-btn-active"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm xét nghiệm')}}</a>
        </li>
      </ul>
      <!-- Version-2 -->
      <ul v-else style="flex-wrap: wrap" class="nav nav-tabs flex-container" role="tablist">
        <li :data="item" :key="index" v-for="(item ,index) in List">
          <router-link :to="{name: _VisitType + 'ChemicalBiologyTestV2', params: { Id: $route.params.Id, Item: item.Id }}">
            {{item.Label}}
            <div>{{item.CreatedAt}}</div>
            <div>
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
              <br v-else-if="item.CreatedBy === ''">
            </div>
          </router-link>
        </li>
        <li class="text-center flex-container no-border" v-if="!IsLocked">
          <a v-if="checkRole" @click="go2NewForm()" class="add-btn-active full-h">
            <div><i class="fa fa-plus" aria-hidden="true"></i></div>
            <div>{{__t('Thêm xét nghiệm')}}</div>
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <transition name="page" mode="out-in">
          <router-view :IsLocked="IsLocked" :Version="Version"/>
        </transition>
      </div>
    </div>
    <div class="text-center" v-else>
      <h2 class="text-center">{{__label({ViName: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+', EnName: 'Point of care testing - Chemistry Catridge CHEM8+'})}}</h2>
      <NewForm @createForm="go2NewForm" :IsLocked="IsLocked" :TitleForm="''"/>
      <!-- <h4>{{__t('PointOfCareTesting.no_information_CHEM8+')}}</h4>
      <div v-if="!IsLocked"><button v-if="checkRole" class="btn btn-green" @click="go2NewForm()"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm xét nghiệm')}}</button></div> -->
    </div>
  </div>
</template>
<script>
/*
 * The home index page.
 */
import EDPointOfCareTesting from '@/services/ED/EDPointOfCareTesting'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'ChemicalBiologyTestList',
  mixins: [MixinForm],
  data () {
    return {
      List: true,
      Version: 2,
      createVersion: 4,
      IsLocked: false,
      FormCode: 'A03_039_080322_V'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.getData()
  },
  watch: {
    $route (to, from) {
      this.getData()
    }
  },
  computed: {
    checkRole () {
      if (this._VisitType === 'IPD') {
        return this.hasRole('IPOCT6')
      } else {
        return this.hasRole('EPOCT6')
      }
    }
  },
  methods: {
    go2NewForm () {
      this.$modal.show('dialog', {
        title: this.$t('Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+'),
        text: this.$t('Tạo mới Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+<p>Máy: iSTAT</p>'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('InitialAssessment.btn-confirm'),
            class: 'btn',
            handler: () => {
              this.create()
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.$t('InitialAssessment.btn-cancel'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    create () {
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ChemicalBiologyTest/Create/' + `${this.FormCode}/` + this.$route.params.Id + '/' + `${this.createVersion}`, {}).then(response => {
        if (this.Version && this.Version === 1) {
          this.$router.push({name: this._VisitType + 'ChemicalBiologyTest', params: {Id: this.$route.params.Id, Item: response.Id}})
        } else {
          this.$router.push({name: this._VisitType + 'ChemicalBiologyTestV2', params: {Id: this.$route.params.Id, Item: response.Id}})
        }
        this.reload()
      })
    },
    getData () {
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ChemicalBiologyTest/' + `${this.FormCode}/` + this.$route.params.Id).then(async response => {
        if (this._VisitType === 'IPD') {
          this.IsLocked = response.IsLocked
        }
        this.Version = await parseInt(response.Version)
        console.log('newEDPointOfCareTesting ~ this.Version', this.Version)
        if (this.Version >= 13) {
          this.createVersion = 4
        } else if (this.Version < 13 && this.Version > 1) {
          this.createVersion = 2
        } else {
          this.createVersion = 1
        }
        console.log('newEDPointOfCareTesting ~ createVersion', this.createVersion)
        if (this.Version === 1) {
          let List = response.Datas.map((e, i) => {
            return {
              Id: e.Id,
              Label: 'Lần',
              Index: (i + 1)
            }
          })
          this.List = List
          if (this.$route.name === this._VisitType + 'ChemicalBiologyTestList') {
            this.$router.push({name: this._VisitType + 'ChemicalBiologyTest', params: {Id: this.$route.params.Id, Item: List[List.length - 1].Id}})
          }
        } else {
          let List = response.Datas.map((e, i) => {
            return {
              Id: e.Id,
              Label: this.__t('Lần') + ' ' + (i + 1),
              ViName: this.__t('Lần') + ' ' + (i + 1),
              EnName: this.__t('Lần') + ' ' + (i + 1),
              CreatedAt: moment(e.CreatedAt).format('HH:mm DD/MM/YYYY'),
              CreatedBy: e.CreatedBy
            }
          })
          this.List = List
          if (this.$route.name === this._VisitType + 'ChemicalBiologyTestList') {
            this.$router.push({name: this._VisitType + 'ChemicalBiologyTestV2', params: {Id: this.$route.params.Id, Item: List[List.length - 1].Id}})
          }
        }
      }).catch(e => {
        if (e.status === 404) {
          this._401ResponseError(e)
        }
      })
    }
  }
}
</script>
