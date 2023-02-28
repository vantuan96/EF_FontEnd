<template>
  <span v-if="data && data.IsVip" style="color: #dda80a;">(<i class="fa fa-diamond" aria-hidden="true"></i>VIP)</span>
</template>
<script>
export default {
  name: 'VipIcon',
  props: ['data']
}
</script>
