<template>
  <div class="mrt10">
    <div class="v-tab v-tab-2 v-tab-3 space-between">
      <ul id="ProcedureSafetyChecklistTab" style="max-height: 82px;" class="nav nav-tabs" role="tablist">
        <li role="presentation" style="width: 25%;max-height: 82px;" :class="activeClass('ItemChild1')">
          <a @click="type = 'ItemChild1'" style="height: 100%">
            <div>{{__label({ViName: 'Trước khi gây mê/ gây tê', EnName: 'Before anesthesia'})}}</div>
            <div class="italic fw400">({{__label({ViName: 'Bác sỹ, điều dưỡng gây mê, điều dưỡng dụng cụ và chạy ngoài', EnName: 'Nurse anesthetist, anesthesiologist; scrub and circulating nurses'})}})</div>
          </a>
        </li>
        <li role="presentation" style="width: 25%;max-height: 82px;" :class="activeClass('ItemChild2')">
          <a @click="type = 'ItemChild2'" style="height: 100%">
            <div>{{__label({ViName: 'Trước khi rạch da/ thực hiện PT/TT', EnName: 'Before incision/begin of procedure'})}}</div>
            <div class="italic fw400">({{__label({ViName: 'Kíp phẫu thuật/ thủ thuật tham gia', EnName: 'Full surgical/ procedure team'})}})</div>
          </a>
        </li>
        <li role="presentation" style="width: 25%;max-height: 82px;" :class="activeClass('ItemChild3')">
          <a @click="type = 'ItemChild3'" style="height: 100%">
            <div>{{__label({ViName: 'Trong quá trình thực hiện PT/TT', EnName: 'During the surgery/procedure'})}}</div>
            <div class="italic fw400">({{__label({ViName: 'Kíp phẫu thuật/ thủ thuật tham gia', EnName: 'Full surgical/ procedure team'})}})</div>
          </a>
        </li>
        <li role="presentation" style="width: 25%;max-height: 82px;" :class="activeClass('ItemChild4')">
          <a @click="type = 'ItemChild4'" style="height: 100%">
            <div>{{__label({ViName: 'ĐTrước khi người bệnh rời phòng mổ', EnName: 'Before patient leaves operating'})}}</div>
            <div class="italic fw400">({{__label({ViName: 'Điều dưỡng, bác sĩ gây mê, bác sĩ phẫu thuật', EnName: 'Nurse, anesthetist and surgeon'})}})</div>
          </a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <component
        v-if="type in $options.components"
        v-bind:is="type"
        :VisitType="_VisitType"
        :VisitId="_VisitId"
        :readonly="readonly"/>
    </div>
  </div>
</template>

<script>
import ItemChild1 from './ItemChild1.vue'
import ItemChild2 from './ItemChild2.vue'
import ItemChild3 from './ItemChild3.vue'
import ItemChild4 from './ItemChild4.vue'
export default {
  name: 'A02_053_OR_201022_VItem01View',
  props: ['readonly', 'VisitId', 'VisitType'],
  data () {
    return {
      type: 'ItemChild1'
    }
  },
  components: {
    ItemChild1, ItemChild2, ItemChild3, ItemChild4
  },
  mounted () {
  },
  methods: {
    activeClass (link) {
      return link === this.type ? 'active' : ''
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
