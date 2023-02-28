<template>
  <div>
    <div class="v-select" v-if="readonly">
      <div class="vs__selected-options" v-if="multiple">
        <span :key="index" class="selected-tag" v-for="(option, index) in query">
          <b class="mgr">{{ option.label }} </b><template v-if="!hideAd">(<AdInfo :ad="option.code" />)</template>
        </span>
      </div>
      <div class="vs__selected-options" v-else>
        <span class="selected-tag" v-if="query">
          <div class="mgr">{{ query.label }} <template v-if="!hideAd">(<AdInfo :ad="query.code" />)</template></div>
        </span>
      </div>
    </div>
    <v-select v-else @input="emit" :multiple="multiple" v-model="query" :filterable="false" :options="users" @search="onSearch" :placeholder="__t('Nhập tên để tìm kiếm')"
      style="background-color: #fff; min-width: 200px;">
      <template slot="no-options">
        {{__t('Gõ để tìm người dùng...')}}
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="mgr">{{ option.label }} <template v-if="!hideAd">(<AdInfo :ad="option.code" />)</template></div>
      </template>
      <template slot="option" slot-scope="option">
        <b class="mgr">{{ option.label }}</b> <template v-if="!hideAd">({{option.code}})</template>
      </template>
    </v-select>
  </div>
</template>
<script>
import Users from '@/services/Users'
import _ from 'lodash'
// import utils from '@/utils.js'
export default {
  name: 'UsersSelect',
  props: ['value', 'multiple', 'readonly', 'hideAd'],
  data () {
    return {
      suggestions: [],
      query: '',
      users: []
    }
  },
  components: {
  },
  created () {
    if (this.multiple) {
      this.query = this.value.map(e => {
        return {
          code: e.Username,
          Username: e.Username,
          label: e.FullShort || e.Fullname || e.Username,
          Id: e.Id,
          Fullname: e.FullShort || e.Fullname || e.Username,
          Title: e.Title || ''
        }
      }).filter(e => e.Id)
      this.users = this.query
    } else {
      if (this.value && this.value.Id) {
        this.query = {
          code: this.value.Username,
          label: this.value.FullShort || this.value.Fullname || this.value.Username,
          Id: this.value.Id,
          Fullname: this.value.FullShort || this.value.Fullname || this.value.Username,
          Username: this.value.Username,
          Title: this.value.Title || ''
        }
        this.users = [this.query]
      }
    }
  },
  computed: {
  },
  watch: {
    // query: function (val) {
    //   this.$emit('input', this.query ? this.query.map(e => { return e.code }) : null)
    // }
  },
  methods: {
    clear () {
      this.query = []
    },
    emit () {
      setTimeout(() => {
        this.$emit('input', this.query)
      }, 100)
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new Users({search: search}).all().then(res => {
        vm.users = res.map(e => {
          return {
            code: e.Username,
            Username: e.Username,
            label: e.FullShort || e.Fullname || e.Username,
            Id: e.Id,
            Fullname: e.FullShort || e.Fullname || e.Username,
            Title: e.Title
          }
        })
      })
    }, 350)
  }
}
</script>
