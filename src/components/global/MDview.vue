<template>
  <div>
    <template :data="item" v-for="(item, index) in data">
      <template v-if="item.hasDifferent && !item.IsReadOnly">
      <span class="log-label" :key="index" v-if="checkString(item.DataType, 'Radio') && item.Value">
        {{__label(item)}}
      </span>
      <span class="log-label" :key="index" v-if="checkString(item.DataType, 'Select') || checkString(item.DataType, 'AutoComplete')">
        <v-select v-if="item.Value" v-model="item.Value" :items="JSONParse(item.Data) || []"/>
        <span v-else>NA</span>
        <!-- {{JSONParse(item.Data) || []}} -->
      </span>
      <span :key="index" v-if="checkString(item.DataType, 'CheckBox')">
        {{__label(item)}}: {{item.Value ? '&#9745;' : '&#9744;'}}
      </span>
      <span class="log-label" :key="index" v-if="checkString(item.DataType, 'RadioBox')">
        {{__label(item)}}: {{item.Value ? 'Có' : 'Không'}}
      </span>
      <span :key="index" v-if="checkString(item.DataType, 'Text') || checkString(item.DataType, 'DateTime')">
        <template v-if="item.EnName !== 'Translate here'">{{__label(item)}}: </template> {{item.Value || 'N/A'}}
      </span>
      <span :key="index" v-if="checkString(item.DataType, 'ICD10')">
        {{__label(item)}}: {{getICD10(item.Value) || 'N/A'}}
      </span>
      <span :key="index" v-if="checkString(item.DataType, '_Exception') || checkString(item.DataType, 'label')">
        <div v-html="item.Value"></div>
      </span>
      <!-- {{item.Value || 'N/A'}} -->
      <!-- {{item.DataType}} -->
      </template>
    </template>
  </div>
</template>
<script>
import VSelect from '@/components/VSelectDisplay.vue'
export default {
  name: 'MdView',
  props: ['data', 'isFirst'],
  components: {VSelect},
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
  }
}
</script>
