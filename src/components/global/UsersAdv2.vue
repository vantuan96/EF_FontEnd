<template>
  <div>
    <v-select @input="emit" :multiple="true" v-model="selected" :filterable="false" :options="Users" @search="onSearch" :placeholder="placeholder || __t('Nhập tên để tìm kiếm')"
      style="background-color: #fff; min-width: 200px;">
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
  name: 'UsersAdv2',
  props: ['value', 'placeholder'],
  data () {
    return {
      suggestions: [],
      selected: [],
      Users: []
    }
  },
  components: {
  },
  created () {
    this.selected = (this.value || []).map(e => {
      return {
        ...e,
        code: e.Id,
        label: e.FullShort ? utils.shortenName(e.FullShort) : e.Username,
        Username: e.Username
      }
    })
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
    query: function () {
      this.$emit('input', this.selected)
    }
  },
  methods: {
    clear () {
      this.query = []
    },
    emit () {
      setTimeout(() => {
        this.$emit('input', this.selected)
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new Users({search: search}).all().then(res => {
        vm.Users = res.map(e => {
          return {
            ...e,
            code: e.Id,
            label: e.FullShort ? utils.shortenName(e.FullShort) : e.Username,
            Username: e.Username
          }
        })
      })
    }, 350)
  }
}
</script>
