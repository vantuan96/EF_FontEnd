<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot="title">
      {{ __label(Form) }}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt }}</span>
    </template>
    <template slot="content" v-if="hasData">
      <div class="v-tab">
        <ul id="" class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass('Part1')">
            <a @click="type = 'Part1'">{{__t('Người lớn')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Part2')">
            <a @click="type = 'Part2'">{{__t('Sản phụ')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Part3')">
            <a @click="type = 'Part3'">{{__t('Sơ sinh')}}</a>
          </li>
        </ul>
      </div>
    </template>
    <template slot='content' v-if="hasData">
      <Part1 v-if="type === 'Part1'" :viewonly="viewonly = true"/>
      <Part2 v-if="type === 'Part2'" :viewonly="viewonly = true"/>
      <Part3 v-if="type === 'Part3'" :viewonly="viewonly = true"/>
    </template>
  </Vcollapse>
</template>
<script>
import Part1 from '@/pages/IPD/VitalSigns/AdultVitalSigns/View'
import Part2 from '@/pages/IPD/VitalSigns/PregnantVitalSigns/View'
import Part3 from '@/pages/IPD/VitalSigns/NeonatalVitalSigns/View'

export default {
  name: 'VitalSignsView',
  props: ['VisitId', 'VisitType', 'Form'],
  mixins: [],
  data () {
    return {
      hasData: false,
      type: 'Part1',
      visitType: 'IPD'
    }
  },
  components: {
    Part1,
    Part2,
    Part3
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
