<template>
  <div class="v-suggest">
    <input type="text" v-model.trim="text" @input="search" :placeholder="placeholder" :disabled="disabled" ref="input"
      @keydown="processControl"
      @blur="close"
      @focus="open">
    <div class="sg-clear"
      @click="clear"
      v-show="text"
      v-if="!disabled">
      <span>×</span>
    </div>
    <dropdown ref="drop" :re-open="true" :animated="true" @show-change="showChange">
      <ul class="sg-results" :style="{width: width+'px'}" ref="list" >
        <li v-for="(row,index) in list" :key="index"
          :class="{'sg-results__row':true, 'sg-over':highlight === index}"
          @mouseenter="highlight = index"
          @mouseleave="highlight = -1"
          @click="selectItem(row)"
          v-html="getRow(row)"
          ></li>
      </ul>
    </dropdown>
  </div>
</template>
<script>
import data from './mixins/data'
import methods from './mixins/methods'
export default {
  name: 'v-suggest',
  mixins: [data, methods],
  mounted () {
    this.list = this.data
  }
}
</script>
