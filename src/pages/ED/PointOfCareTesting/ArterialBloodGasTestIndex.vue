<template>
  <div class="main-content">
    <div class="v-tab v-tab-2" v-if="List.length">
      <ul v-if="this.Version && Version === 1" class="nav nav-tabs" role="tablist">
        <li :data="item" :key="index" v-for="(item ,index) in List">
          <router-link :to="{name: _VisitType + 'ArterialBloodGasTest', params: { Id: $route.params.Id, Item: item.Id }}">
            {{__t(item.Label)}} {{item.Index}}<template v-if="item.ViName"> - {{__label(item)}}</template>
          </router-link>
        </li>
        <li>
          <a v-if="!IsLocked" @click="go2NewForm()" class="add-btn-active"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm xét nghiệm')}}</a>
        </li>
      </ul>
      <!-- Version-2 -->
      <ul v-else class="nav nav-tabs flex-container" role="tablist">
        <li :data="item" :key="index" v-for="(item ,index) in List">
          <router-link :to="{name: _VisitType + 'ArterialBloodGasTestV2', params: { Id: $route.params.Id, Item: item.Id }}">
            {{item.Label}}
            <div>{{item.CreatedAt}}</div>
            <div>
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
              <br v-else-if="item.CreatedBy === ''">
            </div>
          </router-link>
        </li>
        <li class="text-center flex-container no-border" v-if="!IsLocked">
          <a v-if="checkRole" @click="go2NewForm()" class="add-btn-active full-h ">
            <div><i class="fa fa-plus" aria-hidden="true"></i></div>
            <div>{{__t('Thêm xét nghiệm')}}</div>
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <transition name="page" mode="out-in">
          <router-view :IsLocked="IsLocked"/>
        </transition>
      </div>
    </div>
    <div class="text-center" v-else>
      <h4>{{__t('PointOfCareTesting.no_information_CG4+')}}</h4>
      <div v-if="!IsLocked"><button v-if="checkRole" class="btn btn-green" @click="go2NewForm()"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm xét nghiệm')}}</button></div>
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
  /*
   * The name of the page.
   */
  name: 'ArterialBloodGasTestList',
  mixins: [MixinForm],
  props: ['VisitType'],
  data () {
    return {
      List: true,
      IsLocked: false,
      Version: null
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
        return this.hasRole('TAOXNTC')
      } else {
        return this.hasRole('EPOCT4')
      }
    }
  },
  methods: {
    go2NewForm () {
      this.$modal.show('dialog', {
        title: this.$t('Xét nghiệm tại chỗ - Khí máu Cartridge CG4+'),
        text: this.$t('Tạo mới Xét nghiệm tại chỗ - Khí máu Cartridge CG4+<p>Máy: iSTAT</p>'),
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
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ArterialBloodGasTest/create/' + this.$route.params.Id, {}).then(response => {
        if (this.Version && this.Version === 1) {
          this.$router.push({name: this._VisitType + 'ArterialBloodGasTest', params: {Id: this.$route.params.Id, Item: response.Id}})
        } else {
          this.$router.push({name: this._VisitType + 'ArterialBloodGasTestV2', params: {Id: this.$route.params.Id, Item: response.Id}})
        }
        this.reload()
      })
    },
    getData () {
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ArterialBloodGasTest/' + this.$route.params.Id).then(response => {
        if (this._VisitType === 'IPD') {
          this.IsLocked = response.IsLocked
        }
        this.Version = response.Version
        if (this.Version && this.Version === 1) {
          let List = response.response.map((e, i) => {
            return {
              Id: e,
              Label: 'Lần',
              Index: (i + 1)
            }
          })
          this.List = List
          if (this.$route.name === this._VisitType + 'ArterialBloodGasTestList') {
            this.$router.push({name: this._VisitType + 'ArterialBloodGasTest', params: {Id: this.$route.params.Id, Item: List[List.length - 1].Id}})
          }
        } else {
          let List = response.forms.map((e, i) => {
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
          if (this.$route.name === this._VisitType + 'ArterialBloodGasTestList') {
            this.$router.push({name: this._VisitType + 'ArterialBloodGasTestV2', params: {Id: this.$route.params.Id, Item: List[List.length - 1].Id}})
          }
        }
      })
    }
  }
}
</script>
