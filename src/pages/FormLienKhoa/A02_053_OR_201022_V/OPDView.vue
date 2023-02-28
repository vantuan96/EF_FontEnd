<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? getFTime(FormV2.UpdateAt) : getFTime(Form.UpdatedAt)}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="v-tab">
        <ul id="ProcedureSafetyChecklistTab" class="nav nav-tabs" role="tablist">
          <li role="presentation" :class="activeClass('Item01')">
            <a @click="type = 'Item01'">{{__t('Bảng kiểm')}}</a>
          </li>
          <li role="presentation" :class="activeClass('Item02')">
            <a @click="type = 'Item02'">{{__t('Đánh giá nguy cơ cháy bỏng')}}</a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <component
          v-if="type in $options.components"
          v-bind:is="type" :VisitType="_VisitType"
          :VisitId="VisitId"
          :ItemId="ItemId"
          :readonly="true"/>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
import Item01 from './View/Item01.vue'
import Item02 from './View/Item02.vue'
export default {
  name: 'OPDProcedureSafetyChecklist',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  data () {
    return {
      hasData: false,
      type: 'Item01'
    }
  },
  components: {
    Item01, Item02
  },
  mounted () {
  },
  computed: {
  },
  watch: {
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
