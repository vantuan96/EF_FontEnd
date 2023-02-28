<template>
  <div v-if="loaded">
    <div class="v-tab v-tab-2">
      <template>
        <ul class="nav nav-tabs flex-containerx" role="tablist">
          <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx">
            <router-link class="no-border" :to="{name:`${_VisitType}A02_053_OR_201022_VITEM_${item.Id}`, params: { Id: _VisitId, Item: $route.params.ItemId}}">
              <div class="box-info-item">
                <div>{{__label(item)}}</div>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view ref="form" :readonly="readonly" :VisitId="_VisitId" :VisitType="_VisitType"/>
          </transition>
        </div>
      </template>
    </div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import VLayout from '@/layouts/Default.vue'
import FormApi from '@/services/FormAPI.js'
// import _ from 'lodash'
import {
  MDRadioGroup,
  MDCheckboxGroup,
  VCheckbox,
  MDSelectBox,
  VSelectBox,
  VText
} from '@/components/Form/Input/index.js'
export default {
  name: 'A02_053_OR_201022_VItem',
  mixins: [MixinMasterData],
  props: ['VisitType'],
  components: {
    VLayout,
    MDRadioGroup,
    VCheckbox,
    MDCheckboxGroup,
    MDSelectBox,
    VSelectBox,
    VText
  },
  data () {
    return {
      loaded: false,
      rawData: false,
      selectvalue: '1',
      text: '',
      textArea: '',
      textNumber: '',
      dataMaster: null,
      List: [
        {
          ViName: 'Bảng kiểm',
          Id: '01',
          EnName: 'Checklist'
        },
        {
          ViName: 'Đánh giá nguy cơ cháy và bỏng',
          Id: '02',
          EnName: 'Fire and burn Safety Assessment'
        }
      ]
    }
  },
  computed: {
    readonly () {
      return false
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_053_OR_201022_V_TAB11',
      hidemsg: true
    })
    this.getData()
  },
  methods: {
    getData () {
      this.APIService.GetDetail(this.$route.params.ItemId).then(res => {
        setTimeout(() => {
          if (!this.$route.meta.child && !this.$route.meta.child2) {
            this.$router.push(
              {
                name: `${this._VisitType}A02_053_OR_201022_VITEM_01_001`,
                params: { Id: this._VisitId, Item: this.$route.params.ItemId }
              }
            )
          }
          this.loaded = true
        }, 500)
      }).catch((e) => {
        console.log(e)
        if (!this.$route.meta.child) {
          this.$router.push(
            {
              name: `${this._VisitType}A02_053_OR_201022_VITEM_01_001`,
              params: { Id: this._VisitId, Item: this.$route.params.ItemId }
            }
          )
        }
        this.loaded = true
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  li {
    a {
      padding: 10px 16px!important;
      border-radius: 9px 9px 0 0!important;
    }
  }
</style>
