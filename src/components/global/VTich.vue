<template>
<div v-if="listData && listData.length">
  <template v-for="(e, index) in listData">
    <div class="mrr10 inline" :style="styleCustom" :key="index" v-if="(e.DataType === 'Checkbox' || e.DataType === 'Radio' || e.DataType === 'CheckBox') && index !== hideDex && (!indexs || indexs.includes(index))">
      <span v-if="gachNgang">- </span>
      <span v-if="showLabel && t4" :class="(initial && initial.includes(index)) ? 'initial' : ''">{{e.ViName}}<i>{{__t4(e.EnName)}}</i></span>
      <span v-else-if="showLabel" :class="(initial && initial.includes(index)) ? 'initial' : ''">{{e.ViName}}<i v-if="t3">{{__t3(e.ViName)}}</i></span>
      <span v-if="!noneDex">{{(index + 1) + '. ' + e.ViName}}<i v-if="t3">{{__t3(e.ViName)}}</i> </span>
      <span v-if="haiCham">: </span>
      <span class="square-text" :class="{'hidden-text': !e.Value}" style="margin-bottom: 5px;">{{'&#10003;'}}</span>
      <span v-if="showLabel2">{{e.ViName}}<i v-if="t3">{{__t3(e.ViName)}}</i></span>
      <span v-if="showNote" class="mrl5">{{e.Note}}</span>
    </div>
  </template>
</div>
<span v-else-if="!showData" class="square-text" style="margin-bottom: 5px;" :class="{'hidden-text': !value}">{{'&#10003;'}}</span>
<span v-else class="square-text" style="margin-bottom: 5px;" :class="{'hidden-text': !value}">{{value ||'&#10003;'}}</span>
</template>
<script>
export default {
  name: 'VTich',
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
    't4'
  ]
}
</script>
