<template>
  <div class="MdCheckBoxLabel big-box-table-1" v-if="data">
    <template>
      <div class="mini-box-table1" v-for="(e, index) in data.Items" :key="index">
        <div v-if="!reverse && e.DataType === 'Radio'" class="flex-box flex-center">
          <span class="v-checkbox" align="center">
            <input @change="handleChange" type="checkbox" :disabled="readonly ? true : false" :id="data.Code + '-' + index" :name="data.Code + '-' + index" v-model="data.Items[index].Value">
            <label :style="`cursor: ${readonly ? 'context-menu' : null};`" @click="checkbox2Radio(data.Items, data.Items[index])" :for="data.Code + '-' + index"></label>
          </span>
          <div style="min-width: 150px;">{{__label(data.Items[index])}}</div>
        </div>
        <div v-else-if="e.DataType === 'Radio'" class="flex-box align-center space-between mrr40">
          <div style="min-width: 100px;">{{__label(data.Items[index])}}</div>
          <span class="v-checkbox" align="center">
            <input @change="handleChange" type="checkbox" :disabled="readonly ? true : false" :id="data.Code + '-' + index" :name="data.Code + '-' + index" v-model="data.Items[index].Value">
            <label :style="`cursor: ${readonly ? 'context-menu' : null};`" @click="checkbox2Radio(data.Items, data.Items[index])" :for="data.Code + '-' + index"></label>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MdCheckBoxLabel2',
  props: ['data', 'readonly', 'reverse'],
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .big-box-table-1 {
    .mini-box-table1 {
      min-width: 33.29%;
      display: inline-block;
      height: 50px;
      padding: 0 auto;
    }
  }
  input[type=checkbox]:checked:disabled + label:before {
    transform: scale(1);
    background-color: #aaa!important;
    border-color: #aaa!important;
  }
  .big-box {
    .mini-box {
      width: 217px;
    }
  }
</style>
