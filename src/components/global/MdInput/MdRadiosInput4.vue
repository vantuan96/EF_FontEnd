<template>
  <!-- <MDRadioView v-if="readonly" :data="value.Items" :noneDex="noneDex" /> -->
  <div v-if="readonly" class="group-radio" :class="fullWidth ? 'full-width' : null" :id="value.Code">
    <template v-if="checkNull() && showNa">
      <b class="el-radio-view disable">
        N/A
      </b>
    </template>
    <template v-else v-for="(item, index) in value.Items">
      <template v-if="vcheckbox && index !== noneDex && (!indexs || indexs.includes(index))">
        <span class="v-checkbox" style="display: flex!important;align-items: center!important;" align="center" :key="index">
          <input type="checkbox" :disabled="true" :id="item.Code + '-' + index" :name="item.Code + '-' + index" v-model="item.Value">
          <label :style="`cursor: context-menu;`" :for="item.Code + '-' + index"></label>
          <span v-if="songngu && !hidelabel" class="white-space" :class="{'md-radio-label' : wrap}">{{Vi(item)}}/ <i>{{En(item)}}</i></span>
          <span v-else-if="!hidelabel" class="white-space" :class="{'md-radio-label' : wrap}">{{__label(item)}}</span>
        </span>
      </template>
      <template v-else>
        <span class="no-wrap" :key="index" v-if="item.DataType === 'Radio'">
          <template v-if="hasData">
            <b class="el-radio-view" :class="viewmrb ? 'mrb10' : ''" v-if="item.Value && index !== noneDex && (!indexs || indexs.includes(index)) && songngu">
              {{Vi(item)}}/ <i>{{En(item)}}</i>
            </b>
            <b class="el-radio-view" :class="viewmrb ? 'mrb10' : ''" v-else-if="item.Value && index !== noneDex && (!indexs || indexs.includes(index))">
              {{__label(item)}}
            </b>
          </template>
          <b class="el-radio-view disable" v-else>
            N/A
          </b>
        </span>
        <span class="no-wrap" :key="index" v-if="item.DataType === 'Checkbox'">
          <template v-if="hasData2">
            <b class="el-radio-view" :class="viewmrb ? 'mrb10' : ''" v-if="item.Value && index !== noneDex && (!indexs || indexs.includes(index)) && songngu">
              {{Vi(item)}}/ <i>{{En(item)}}</i>
            </b>
            <b class="el-radio-view" :class="viewmrb ? 'mrb10' : ''" v-else-if="item.Value && index !== noneDex && (!indexs || indexs.includes(index))">
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
  <div v-else class="group-radio" :class="fullWidth ? 'full-width' : null" :id="value.Code">
    <template v-for="(item, index) in value.Items">
      <span class="v-checkbox" style="display: flex!important;align-items: center!important;"
        :style="mrr ? `margin-right:${mrr}px` : null"
        :data="item"
        :key="index"
        v-if="vcheckbox && index !== noneDex && (!indexs || indexs.includes(index))"
        :class="fullWidth ? 'mrr10' : null"
        >
        <input @change="handleChange(item.Value)" :disabled="disabled" type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!disabled" @click="checkbox2Radio5(value.Items, value.Items[index], miniRadio)" :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code"></label>
        <label v-else :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code"></label>
        <span v-if="!hidelabel && songngu" class="white-space" :class="{'md-radio-label' : wrap}">{{Vi(item)}}/ <i>{{En(item)}}</i></span>
        <span v-else-if="!hidelabel" class="white-space" :class="{'md-radio-label' : wrap}">{{__label(item)}}</span>
      </span>
      <span
        :style="mrr ? `margin-right:${mrr}px` : null"
        :data="item"
        :key="index" v-else-if="index !== noneDex && (!indexs || indexs.includes(index))"
        :class="fullWidth ? 'mrr10' : null"
        >
        <input @change="handleChange(item.Value)" :disabled="disabled" type="checkbox" :id="'radio-' + item.Code" v-model="item.Value">
        <label v-if="!disabled && songngu" @click="checkbox2Radio5(value.Items, value.Items[index], miniRadio)" :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code">{{Vi(item)}}/ <i>{{En(item)}}</i></label>
        <label v-else-if="!disabled" @click="checkbox2Radio5(value.Items, value.Items[index], miniRadio)" :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code">{{__label(item)}}</label>
        <label v-else :style="width ? `width:${width}px` : null" :for="'radio-' + item.Code">{{__label(item)}}</label>
      </span>
    </template>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MdRadiosInput4',
  props: ['value', 'readonly', 'noneDex', 'fullWidth', 'width', 'mrr', 'indexs', 'miniRadio', 'disabled', 'vcheckbox', 'hidelabel', 'songngu', 'viewmrb', 'showNa', 'wrap'],
  watch: {
  },
  methods: {
    handleChange (val) {
      this.$emit('change', val)
    },
    hasData: function () {
      return this.data.find(e => (e.Value && this.checkString(e.DataType, (this.DataType || 'Radio'))))
    },
    hasData2: function () {
      return this.data.find(e => (e.Value && this.checkString(e.DataType, (this.DataType || 'Checkbox'))))
    },
    Vi (data) {
      if (data) {
        return data.ViName
      }
      return ''
    },
    En (data) {
      if (data) {
        return data.EnName
      }
      return ''
    },
    checkNull () {
      let isNull = true
      if (this.value) {
        this.value.Items.forEach((elm, index) => {
          if (index !== this.noneDex && (!this.indexs || this.indexs.includes(index))) {
            if (elm.Value) {
              isNull = false
            }
          }
        })
      }
      return isNull
    }
  }
}
</script>
<style scoped>
.md-radio-label {
  white-space: unset!important;
  text-align: left;
}
</style>
