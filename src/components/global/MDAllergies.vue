<template>
  <div class="group-radio flex-center" v-if="value">
    <template :data="item"  v-for="(item, index) in value.Items">
      <span :key="index + item.Code" v-if="item.DataType === 'Radio'" @click="onChange()">
        <input :class="'highlight-no-radio-' + index" type="checkbox" :id="item.Code + 'radio-' + index" v-model="item.Value">
        <label :for="item.Code + 'radio-' + index" @click="checkbox2Radio(value.Items, item)">{{__label(item)}}</label>
      </span>
      <template v-else-if="item.DataType === 'Select' && value.Items[1].Value">
        <b :key="index + 'se' + item.Code" class="no-wrap">{{__label(item)}}:</b>
        <allergies-select :key="index" v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)"/>
      </template>
      <template v-else-if="item.DataType === 'Text' && value.Items[1].Value">
        <b :key="index + 'text' + item.Code" class="no-wrap" v-if="value.Items[1].Value">{{__label(item)}}:</b>
        <textarea-autosize style="flex-grow: 1;" :key="index" :placeholder="__t('Nhập')" :code="value.Items[0].Code" class="form-control" v-model="item.Value"/>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MDAllergies',
  props: ['value'],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  data () {
    return {
      highlightCode: [
        'IPDIAAUREASDIS',
        'IPDIAAUCOLOCYA'
      ]
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    onChange () {
      this.$emit('onChange', this.value)
    }
  }
}
</script>
