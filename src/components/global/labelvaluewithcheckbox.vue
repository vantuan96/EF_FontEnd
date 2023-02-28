<template>
  <span>
    <span class="labval" v-if="type === 'Text'">
      <template v-if="label">{{label}}<i class="unit-label" v-if="note">({{note}})</i>: </template>
      <label v-if="value">{{value}}</label>
    </span>
    <template v-if="type === 'CheckBox'">
      <span v-if="value">{{__t('Không lấy được kết quả')}}</span>
    </template>
  </span>
</template>
<script>
export default {
  name: 'labelvaluewithcheckbox',
  props: ['label', 'value', 'note', 'separator', 'type'],
  mixins: [],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
