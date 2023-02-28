
<template>
  <div class="display-inline-flex" :class="right ? 'mini-box-right' : null">
    <template v-if="text && text !== 'N/A'">
      <template v-if="defaultlength && (defaultlength - str.length > 0)">
        <span class="square-text hidden-text" :key="index + 'x'" v-for="(char, index) in (defaultlength - str.length)">0</span>
      </template>
      <span class="square-text" :key="index" v-for="(char, index) in str">{{char}}</span>
    </template>
    <template v-else>
      <template v-if="defaultlength">
        <span class="square-text hidden-text" :key="index" v-for="(char, index) in defaultlength">0</span>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'CharWithSquare',
  props: ['text', 'defaultlength', 'right'],
  data () {
    return {
    }
  },
  computed: {
    str () {
      var t = this.text || ''
      return this.trim_(this.trim_(t + '', ' '))
    }
  },
  created () {
  }
}
</script>
