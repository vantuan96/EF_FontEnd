<template>
  <div class="flex align-center" v-if="!print">
    <div class="mrr20">{{__label(label)}}</div>
    <div class="mrr40"><UsersSelect2 :readonly="readonly" v-model="value2" /></div>
    <div class="flex align-center">
      <b class="mrr10" :style="widthCD[0]">{{__t('Chức danh')}}: </b>
      <input disabled style="min-height: 36px;" :style="widthCD[1]" v-model="value2.Title"/>
    </div>
  </div>
  <div class="flex align-center" v-else>
    <div class="mrr20" v-if="t3">- {{label.ViName}}<i>/ {{label.EnName}}</i>:</div>
    <div class="mrr20" v-else>- {{__label(label)}}:</div>
    <div class="mrr40">{{value2.Fullname}}</div>
    <div class="flex align-center">
      <div class="mrr10" v-if="t3">Chức danh<i>/ Titile</i>: </div>
      <div class="mrr10" v-else>{{__t('Chức danh')}}: </div>
      <div>{{value2.Title}}</div>
    </div>
  </div>
</template>
<script>
import UsersSelect2 from '@/components/UsersSelect2.vue'
export default {
  name: 'VNameCD2',
  props: ['value', 'readonly', 'label', 'widthCD', 'print', 't3'],
  components: {
    UsersSelect2
  },
  watch: {
    value (val) {
      this.value2 = val
    },
    value2 (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      value2: {
        Fullname: '',
        Id: '',
        Title: '',
        Username: '',
        code: '',
        label: ''
      }
    }
  },
  created () {
    if (this.value) {
      this.value2 = this.value
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
