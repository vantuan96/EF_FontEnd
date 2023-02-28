<template>
  <div class="row" :style="`width: ${width}!important;`">
    <div class="col-md-12" v-if="value">
      <div class="form-group">
        <p v-if="blandLabel">{{__label(value)}}<i class="unit-label" v-if="value.Note"> {{value.Note}}</i></p>
        <label v-if="!blandLabel && !hidelabel">{{__label(value)}}<i class="unit-label" v-if="value.Note"> {{value.Note}}</i></label>
        <slot></slot>
        <div :value="item" :key="index + '-' + item.Code"  v-for="(item, index) in value.Items">
          <template v-if="getFirstRow && index === 0 && index !== noneDex">
            <div v-if="showMiniLabel" class="mrb10 mrt10 fw600">{{__label(item)}}</div>
            <div v-if="defaultLib && !readonly">
              <recommendation-lib :mdCode="defaultLib" :title="__t('Mở thư viện tham khảo')" @copy="copyOPDOENRFU" :defaultValue="item.Value" />
            </div>
            <!-- <div v-if="item.Data"><list-select @select="selectedValue" :name="item.Code" :data="item.Data" :defaultValue="item.Value" :title="__t('Tham khảo thông tin khám bình thường')" /></div> -->
            <div v-if="groupDefaultLib && !readonly">
              <list-select
                @select="selectedValue"
                :name="item.Code"
                :data="item.Data"
                :defaultValue="item.Value"
                :title="__t('Mở thư viện tham khảo')"
                :groupDefaultLib="groupDefaultLib"
              />
            </div>
            <div v-if="readonly">
              <p class="fake-input disable" style="margin: 0" v-if="!item.IsReadOnly">{{item.Value || 'N/A'}}</p>
            </div>
            <div v-else>
              <input type="text" v-if="inputType === 'text'" class="form-control" :data-code="item.Code" :id="item.Code" v-model="item.Value" :placeholder="placeholder || __label(item)"/>
              <textarea-autosize v-else :data-code="item.Code" :id="item.Code" :value="item" class="form-control" rows="3" :placeholder="placeholder || __label(item)" v-model="item.Value"/>
            </div>
          </template>
          <template v-else-if="!getFirstRow && index !== noneDex">
            <div v-if="showMiniLabel" class="mrb10 mrt10 fw600">{{__label(item)}}</div>
            <div v-if="defaultLib && !readonly">
              <recommendation-lib :mdCode="defaultLib" :title="__t('Mở thư viện tham khảo')" @copy="copyOPDOENRFU" :defaultValue="item.Value" />
            </div>
            <!-- <div v-if="item.Data"><list-select @select="selectedValue" :name="item.Code" :data="item.Data" :defaultValue="item.Value" :title="__t('Tham khảo thông tin khám bình thường')" /></div> -->
            <div v-if="groupDefaultLib && !readonly">
              <list-select
                @select="selectedValue"
                :name="item.Code"
                :data="item.Data"
                :defaultValue="item.Value"
                :title="__t('Mở thư viện tham khảo')"
                :groupDefaultLib="groupDefaultLib"
              />
            </div>
            <div v-if="readonly">
              <p class="fake-input disable" style="margin: 0" v-if="!item.IsReadOnly">{{item.Value || 'N/A'}}</p>
            </div>
            <div v-else>
              <input type="text" v-if="inputType === 'text'" class="form-control" :data-code="item.Code" :id="item.Code" v-model="item.Value" :placeholder="placeholder || __label(item)"/>
              <textarea-autosize v-else :data-code="item.Code" :id="item.Code" :value="item" class="form-control" rows="3" :placeholder="placeholder || __label(item)" v-model="item.Value"/>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MdInputText',
  props: ['value', 'hidelabel', 'defaultLib', 'groupDefaultLib', 'placeholder', 'readonly', 'inputType', 'width', 'blandLabel', 'getFirstRow', 'noneDex', 'showMiniLabel'],
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
