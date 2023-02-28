<template>
  <span @dblclick="copyToClipboard">
    {{PID || noPidmsg}}
  </span>
</template>
<script>
export default {
  name: 'Pid',
  props: ['PID', 'noPidmsg'],
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    copyToClipboard () {
      if (!this.PID) return false
      const el = document.createElement('textarea')
      el.value = this.PID
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.toastedInfo('Đã copy')
    }
  }
}
</script>
