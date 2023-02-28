<template>
  <div class="row">
    <div class="col-md-12" v-if="value">
      <div class="form-group">
        <label v-if="!hidelabel">{{__label(value)}}<i class="unit-label" v-if="value.Note"> {{value.Note}}</i>:</label>
        <slot></slot>
        <div :value="item" :key="index + '-' + item.Code"  v-for="(item, index) in value.Items">
          <div v-if="defaultLib">
            <recommendation-lib :mdCode="defaultLib" :title="__t('Mở thư viện tham khảo')" @copy="copyOPDOENRFU" :defaultValue="item.Value" />
          </div>
          <div v-if="item.Data"><list-select @select="selectedValue" :name="item.Code" :data="item.Data" :defaultValue="item.Value" :title="__t('Tham khảo thông tin khám bình thường')" /></div>
          <textarea-autosize :data-code="item.Code" :id="item.Code" :value="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MdInputText',
  props: ['value', 'hidelabel', 'defaultLib'],
  mixins: [],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  value () {
    return {
    }
  },
  created () {
  },
  methods: {
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.value.Items[0].Value
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(this.trim_(e, '\n'))) input = (input || '') + '\n' + e
      })
      input = this.trim_(input, '\n')
      this.value.Items[0].Value = input
    },
    selectedValue (selectedValue, name) {
      if (!selectedValue) return
      var item = this.value.Items.find(e => e.Code === name)
      if (item) {
        var input = item.Value
        var inputValue = input ? input.split('\n') : []
        selectedValue.forEach(e => {
          if (!inputValue.includes(e)) input = (input || '') + '\n' + e
        })
        input = this.trim_(input, '\n')
        item.Value = input
      }
    }
  }
}
</script>
