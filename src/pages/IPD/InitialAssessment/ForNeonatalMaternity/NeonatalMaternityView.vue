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
          <li role="presentation" :class="activeClass('Part1')">
            <a @click="type = 'Part1'">{{__t('Đánh giá chung')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Part2')">
            <a @click="type = 'Part2'">{{__t('Ngay sau sinh')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Part3')">
            <a @click="type = 'Part3'">{{__t('Trong 2h sau sinh')}}</a>
          </li>
        </ul>
      </div>
    </template>
    <template slot='content' v-if="hasData">
      <Part1 v-if="type === 'Part1'" :viewonly="true" :VisitId="_VisitId"/>
      <Part2 v-if="type === 'Part2'" :viewonly="true" :VisitId="_VisitId"/>
      <Part3 v-if="type === 'Part3'" :viewOnly="true" :VisitId="_VisitId"/>
    </template>
  </Vcollapse>
</template>
<script>
import Part1 from '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForNeonatalMaternity'
import Part2 from '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForAdmissionAssessment'
import Part3 from '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForUterineLife2Hours'

export default {
  name: 'IPDInitialAssessmentForNeonatalMaternity',
  props: ['VisitId', 'VisitType', 'Form', 'FormV2'],
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
