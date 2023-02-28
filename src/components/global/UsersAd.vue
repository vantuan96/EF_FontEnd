<template>
  <div>
    <v-select @input="emit" :multiple="true" v-model="query" :filterable="false" :options="Users" @search="onSearch" :placeholder="placeholder || __t('Nhập tên để tìm kiếm')"
      style="background-color: #fff; min-width: 200px;" :style="styleUserAd">
      <template slot="no-options">
        {{__t('Gõ để tìm người dùng...')}}
      </template>
    </v-select>
  </div>
</template>
<script>
import Users from '@/services/Users'
import _ from 'lodash'
import utils from '@/utils.js'
export default {
  name: 'UsersAd',
  props: ['value', 'placeholder', 'field', 'styleUserAd'],
  data () {
    return {
      suggestions: [],
      query: '',
      Users: []
    }
  },
  components: {
  },
  created () {
    this.query = this.value
    // if (this.query) {
    //   new Users({search: this.query}).all().then(res => {
    //     if (res.length === 1) {
    //       this.query = {
    //         code: res[0].Id,
    //         label: res[0].FullShort ? utils.shortenName(res[0].FullShort) : res[0].Username,
    //         Username: res[0].Username
    //       }
    //     }
    //   })
    // }
  },
  computed: {
  },
  watch: {
    query: function (val) {
      this.$emit('input', this.query ? this.query.map(e => { return e.code }) : null)
    }
  },
  methods: {
    clear () {
      this.query = []
    },
    emit () {
      setTimeout(() => {
        this.$emit('input', this.query ? this.query.map(e => { return e.code }) : null)
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new Users({search: search}).all().then(res => {
        console.log(res, 'check res usersad')
        vm.Users = res.map(e => {
          return {
            code: vm.field ? e[vm.field] : e.Id,
            label: e.FullShort ? (utils.shortenName(e.FullShort) + ` (${e.Username})`) : e.Username,
            Username: e.Username
          }
        })
      })
    }, 350)
  }
}
</script>
