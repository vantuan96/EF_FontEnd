<template>
  <v-select @input="emit" :multiple="false" v-model="query" :filterable="false" :options="Users" @search="onSearch" :placeholder="__t('Nhập tên để tìm kiếm')"
    style="background-color: #fff; min-width: 200px;">
    <template slot="no-options">
      {{__t('Gõ để tìm người dùng...')}}
    </template>
  </v-select>
</template>
<script>
import Users from '@/services/Users'
import _ from 'lodash'
export default {
  name: 'UserAd',
  props: ['value', 'field', 'position', 'hasTitle'],
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
    if (this.query) {
      var query = {search: this.query}
      if (this.field === 'Id') {
        query = {Id: this.query}
      } else {
        query.Username = this.query
      }
      new Users(query).all().then(res => {
        if (res.length === 1) {
          this.query = {
            code: res[0].Id,
            // Title: res[0].Title,
            label: (res[0].FullShort || res[0].Fullname) + ' (' + (res[0].Username) + ')' + ((this.hasTitle && res[0].Title) ? ` - ${res[0].Title}` : ''),
            Username: res[0].Username,
            Fullname: res[0].Fullname
          }
          this.Users = [this.query]
        }
      })
    }
  },
  computed: {
  },
  watch: {
    query: function (val) {
      this.emit()
    }
  },
  methods: {
    clear () {
      this.query = []
    },
    emit () {
      setTimeout(() => {
        this.$emit('input', this.query ? (this.field ? this.query[this.field] : this.query.Username) : null)
        this.$emit('onSelect', this.query)
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      var data = {search: search}
      if (vm.position) {
        data.Position = vm.position
      }
      new Users(data).all().then(res => {
        vm.Users = res.map(e => {
          return {
            Id: e.Id,
            code: e.Id,
            label: e.Fullname + ((vm.hasTitle && e.Title) ? ` - ${e.Title}` : ''),
            Username: e.Username,
            Title: e.Title,
            Fullname: e.Fullname
          }
        })
      })
    }, 350)
  }
}
</script>
