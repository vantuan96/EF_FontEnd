<template>
  <div class="contentItem-view" >
    <div class="contentItem-view">
    <div :key="index" v-for="(item, index) in data" class="mb-5" style="text-align: left;">
      &#160;&#160;&#160;<i class="fa fa-check fa-2 green-color" aria-hidden="true"></i>{{__label(item)}}
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'ContentItem',
  props: ['ContentItemDatas', 'view'],
  data () {
    return {
      data: null,
      grouped: {}
    }
  },
  mounted () {
    this.data = this.JSONParse(this.ContentItemDatas) || []
  }
}
</script>
