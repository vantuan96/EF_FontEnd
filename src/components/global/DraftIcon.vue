<template>
  <span v-if="data && data.IsDraft" style="color: #C63FB8;">(<i class="fa fa-draft" aria-hidden="true"></i><i>{{__t('Bản nháp')}}</i>)</span>
</template>
<script>
export default {
  name: 'DraftIcon',
  props: ['data']
}
</script>
