<template>
  <div class="inline">
    <span :data="item" :key="index + ' - '+ i + item.Code" v-for="(item,index) in value.Items" ><b>{{__label(item)}}</b><i v-if="item.Note"> ({{item.Note}})</i>: <span class="fake-input disable">{{item.Value || 'N/A'}}</span> </span>
  </div>
</template>
<script>
export default {
  name: 'MdInputTextView',
  props: ['value'],
  value () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
