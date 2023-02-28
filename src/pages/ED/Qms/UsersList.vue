<template>
  <div>
    {{onlyUsername ? ListUsername : ListFullname}}
  </div>
</template>
<script>
// import utils from '@/utils.js'
// utils.shortenLastAndMiddleName
export default {
  name: 'UsersList',
  props: ['data', 'onlyUsername'],
  data () {
    return {
    }
  },
  computed: {
    ListFullname: function () {
      return (this.data.map(e => {
        return ((e.FullShort || e.Fullname || e.Username || '').replace(' (VMEC-KVH-BV VMTC)', ''))
      }) || []).filter(e => e).join(', ')
    },
    ListUsername: function () {
      return (this.data.map(e => {
        return e.Username
      }) || []).filter(e => e).join(', ')
    }
  },
  created () {
  }
}
</script>
