<template>
<div v-if="listData && listData.length">
  <div v-for="(e, index) in listData" :key="index" style="display: -webkit-inline-box;">
    <div class="mrr10 flex align-center" :style="styleCustom" v-if="(e.DataType === 'Checkbox' || e.DataType === 'Radio' || e.DataType === 'CheckBox') && index !== hideDex && (!indexs || indexs.includes(index))">
      <span v-if="gachNgang">- </span>
      <span v-if="congNgang" class="mrr5">+ </span>
      <span v-if="showLabel" class="white-space mrr5" :class="(initial && initial.includes(index)) ? 'initial' : ''">{{e.ViName}}<i v-if="t3">{{__t3(e.ViName)}}</i></span>
      <span v-if="!noneDex">{{(index + 1) + '. ' + e.ViName}}<i v-if="t3">{{__t3(e.ViName)}}</i> </span>
      <span v-if="haiCham">: </span>
      <span class="square-text" v-if="dataloaitru" :class="{'hidden-text': e.Value !== dataloaitru}">{{'&#10003;'}}</span>
      <span class="square-text" v-else :class="{'hidden-text': !e.Value}">{{'&#10003;'}}</span>
      <span v-if="showLabel2" class="white-space">{{e.ViName}}<i v-if="t3">{{__t3(e.ViName)}}</i></span>
      <span v-if="showNote" class="mrl5">{{e.Note}}</span>
    </div>
  </div>
</div>
<span v-else-if="!showData" class="square-text" :class="{'hidden-text': !value}">{{'&#10003;'}}</span>
<span v-else class="square-text" :class="{'hidden-text': !value}">{{value ||'&#10003;'}}</span>
</template>
<script>
export default {
  name: 'VTich2',
  props: [
    'value',
    'showData',
    'listData',
    'noneDex',
    'showLabel',
    'hideDex',
    'showLabel2',
    'styleCustom',
    'gachNgang',
    'haiCham',
    'indexs',
    'initial',
    'showNote',
    't3',
    'congNgang',
    'dataloaitru'
  ]
}
</script>
<style scoped>
  .square-text {
    margin: 2px 1px!important;
  }
</style>
