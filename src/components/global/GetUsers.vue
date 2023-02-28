<template><span class="getUsers">{{Users}}</span></template>
<script>
import Users from '@/services/Users'
export default {
  name: 'getUsers',
  props: ['listUser'],
  mixins: [],
  data () {
    return {
      Users: ''
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    listUser: function (listUser) {
      this.listUser = listUser
      this.getData()
    }
  },
  methods: {
    getData () {
      if (!this.listUser) return
      this.listUser = this.listUser.trim()
      new Users({Usernames: [this.listUser]}).all().then(res => {
        if (res && res.length === 0) {
          this.Users = this.listUser
        } else if (res && res.length > 0) {
          this.Users = res.map(e => {
            console.log(res, 'check res')
            if (e.FullShort === null) {
              e.FullShort = 'null'
            }
            return e.FullShort
          }).join(', ')
        } else {
          this.Users = this.listUser
        }
      })
    }
  }
}
</script>
<style scoped>
.mrb3 {
  margin-bottom: 3px;
}
</style>
