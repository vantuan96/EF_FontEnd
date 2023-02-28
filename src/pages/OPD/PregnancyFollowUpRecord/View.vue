<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot="title">
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : getFTime(Form.UpdatedAt)}}</span>
    </template>
    <template slot="content" v-if="hasData">
      <div class="v-tab">
        <ul id="" class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass('ObstetricInformation')">
            <a @click="type = 'ObstetricInformation'">{{__t('Thông tin sản khoa')}}</a>
          </li>
          <li role="presentation" :class="activeClass('ThePregnancyCheckupProcess')">
            <a @click="type = 'ThePregnancyCheckupProcess'">{{__t('Quá trình khám thai')}}</a>
          </li>
        </ul>
      </div>
    </template>
    <template slot='content' v-if="hasData">
      <ObstetricInformation v-if="type === 'ObstetricInformation'" :viewOnly="true" :VisitId="VisitId" :VisitType="_VisitType"/>
      <ThePregnancyCheckupProcess v-if="type === 'ThePregnancyCheckupProcess'" :viewOnly="true" :VisitId="VisitId" :VisitType="_VisitType"/>
    </template>
  </Vcollapse>
</template>
<script>
import ObstetricInformation from './Item1'
import ThePregnancyCheckupProcess from './Item2'

export default {
  name: 'OPDPregnancyFollowUpRecord',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'ObstetricInformation',
      visitType: 'OPD'
    }
  },
  components: {
    ThePregnancyCheckupProcess,
    ObstetricInformation
  },
  mounted () {
    this.visitType = this._VisitType
  },
  watch: {
    type: {
      handler (val) {
        this.type = val
      }
    }
  },
  methods: {
    getData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    },
    activeClass (link) {
      return link === this.type ? 'active' : ''
    }
  }
}
</script>
