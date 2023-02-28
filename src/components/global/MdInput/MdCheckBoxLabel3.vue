<template>
  <div class="MdCheckBoxLabel big-box-table-1" v-if="data">
    <template>
      <div class="mini-box-table1" :style="widthMiniBox ? widthMiniBox : 'min-width: 33.29%;'" v-if="index !== noneDex" v-for="(e, index) in data.Items" :key="index">
        <div v-if="!reverse" class="flex-box flex-center">
          <span class="v-checkbox" align="center">
            <input @change="handleChange" type="checkbox" :disabled="readonly ? true : false" :id="data.Code + '-' + index" :name="data.Code + '-' + index" v-model="data.Items[index].Value">
            <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data.Code + '-' + index"></label>
          </span>
          <div v-if="!t2" :style="hideWidthLabel ? hideWidthLabel[index] : 'min-width: 150px;'">{{__label(data.Items[index])}}</div>
          <div v-else :style="hideWidthLabel ? hideWidthLabel[index] : 'min-width: 150px;'">{{__t2(data.Items[index].ViName)}}</div>
        </div>
        <div v-else class="flex-box align-center space-between mrr40">
          <div v-if="!t2" style="min-width: 100px;">{{__label(data.Items[index])}}</div>
          <div v-else style="min-width: 100px;">{{__t2(data.Items[index].ViName)}}</div>
          <span class="v-checkbox" align="center">
            <input @change="handleChange" type="checkbox" :disabled="readonly ? true : false" :id="data.Code + '-' + index" :name="data.Code + '-' + index" v-model="data.Items[index].Value">
            <label :style="`cursor: ${readonly ? 'context-menu' : null};`" :for="data.Code + '-' + index"></label>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MdCheckBoxLabel3',
  props: ['data', 'readonly', 'reverse', 'noneDex', 'widthMiniBox', 'hideWidthLabel', 't2'],
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
      display: inline-block;
      height: 41.2px;
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
