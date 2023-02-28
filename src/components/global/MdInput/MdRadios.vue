<template>
  <div v-if="readonly" class="group-radio" :id="value.Code">
    <!-- <template>
      <b class="el-radio-view disable">
        N/A
      </b>
    </template> -->
    <template v-for="(item, index) in value.Items">
      <template v-if="vcheckbox && (!indexs || indexs.includes(index))">
        <span class="v-checkbox" style="display: flex!important;align-items: center!important;" align="center" :key="index">
          <input type="checkbox" :disabled="true" :id="item.Code + '-' + index" :name="item.Code + '-' + index" v-model="item.Value">
          <label :style="`cursor: context-menu;`" :for="item.Code + '-' + index"></label>
          <span v-if="!hidelabel" class="white-space">{{__label(item)}}</span>
        </span>
      </template>
      <template v-else>
        <span class="no-wrap" :key="index" v-if="item.DataType === 'Radio'">
          <template v-if="hasData">
            <b class="el-radio-view" :class="viewmrb ? 'mrb10' : ''" v-if="item.Value && (!indexs || indexs.includes(index))">
              {{__label(item)}}
            </b>
          </template>
          <b class="el-radio-view disable" v-else>
            N/A
          </b>
        </span>
        <span class="no-wrap" :key="index" v-if="item.DataType === 'Checkbox'">
          <template v-if="hasData2">
            <b class="el-radio-view" :class="viewmrb ? 'mrb10' : ''" v-if="item.Value && (!indexs || indexs.includes(index))">
              {{__label(item)}}
            </b>
          </template>
          <b class="el-radio-view disable" v-else>
            N/A
          </b>
        </span>
      </template>
    </template>
  </div>
  <div v-else class="group-radio" :id="value.Code">
    <template v-for="(item, index) in value.Items">
      <span class="v-checkbox" style="display: flex!important;align-items: center!important;"
        :style="mrr ? `margin-right:${mrr}px` : null"
        :data="item"
        :key="index"
        v-if="vcheckbox && (!indexs || indexs.includes(index))"
        >
        <input @change="handleChange(item.Value)" :disabled="disabled" type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!disabled" @click="checkbox2Radio5(value.Items, value.Items[index], miniRadio)" :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code"></label>
        <label v-else :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code"></label>
        <span v-if="!hidelabel" class="white-space">{{__label(item)}}</span>
      </span>
      <span
        :style="mrr ? `margin-right:${mrr}px` : null"
        :data="item"
        :key="index" v-else-if="(!indexs || indexs.includes(index))"
        >
        <input @change="handleChange(item.Value)" :disabled="disabled" type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!disabled" @click="checkbox2Radio5(value.Items, value.Items[index], miniRadio)" :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code">{{__label(item)}}</label>
        <label v-else :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code">{{__label(item)}}</label>
      </span>
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MdRadios',
  props: ['value', 'readonly', 'indexs', 'vcheckbox', 'hidelabel', 'width', 'disabled', 'miniRadio'],
  watch: {
    // value: function (val) {
    //   this.$emit('input', this.value)
    // }
  },
  methods: {
    hasData: function () {
      return this.data.find(e => (e.Value && this.checkString(e.DataType, 'Radio')))
    },
    hasData2: function () {
      return this.data.find(e => (e.Value && this.checkString(e.DataType, 'Checkbox')))
    }
  }
}
</script>
