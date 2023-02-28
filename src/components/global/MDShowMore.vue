<template>
<tr v-if="data.showBtn" :class="{'view-full': data.view}">
  <td class="text-center" :colspan="colspan" style="padding-top: 0">
    <button @click="showMore(data)" class="btn v-green-btn v-bottom-btn btn-swit-icon">
      <span class="span-down-cion">{{__t('Mở rộng')}}</span>
      <span class="span-up-cion">{{__t('Thu gọn')}}</span>
    </button>
  </td>
</tr>
</template>

<script>
export default {
  name: 'MDShowMore',
  props: ['data', 'colspan'],
  methods: {
    showMore (data) {
      data.view = !data.view
    }
  }
}
</script>

<style lang="stylus" scoped></style>
