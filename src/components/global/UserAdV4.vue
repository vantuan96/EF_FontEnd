<template>
  <div>
    <span v-if="!hasData"><button class="btn-sync-data btn" @click="takeInfo()">{{this.$t('Lấy thông tin theo Username')}} {{tmpSearch}}</button></span>
    <v-select :class="{'readonly': readonly}" ref='theSelect' :readonly="readonly" @input="emit" :multiple="multiple" v-model="query" :filterable="false" :options="Users" @search="onSearch" :placeholder="placeholder">
      <template slot="no-options">
        {{__t('Gõ để tìm người dùng...')}}
      </template>
    </v-select>
  </div>
</template>
<script>
import UserInfo from '@/services/UserInfo'
import Users from '@/services/Users'
import _ from 'lodash'
export default {
  name: 'UserAdV4',
  // props: ['value', 'position', 'placeholder', 'readonly'],
  props: {
    value: {
      type: Array || String,
      default: () => [] || ''
    },
    position: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      suggestions: [],
      hasData: true,
      tmpSearch: '',
      query: '',
      Users: [],
      lengthRes: '',
      data2: '',
      dataApi2: ''
    }
  },
  components: {
  },
  mounted () {},
  created () {
    this.tmpSearch = this.value
    console.log(this.value, 'ccccc')
    this.query = ''
    this.takeData()
    console.log(this.query, 'check query')
  },
  computed: {
  },
  watch: {
    query: {
      handler (a, b) {
        this.emit()
      },
      deep: true
    }
  },
  methods: {
    clear () {
      this.query = []
    },
    takeData () {
      if (!this.tmpSearch) return
      new Users({Usernames: [this.tmpSearch]}).all().then(res => {
        this.Users = res.map(e => {
          return {
            FullShort: '',
            Id: '',
            code: '',
            label: e.FullShort + ` (${e.Username})`,
            Username: e.Username,
            Title: '',
            Fullname: ''
          }
        })
        this.hasData = true
        this.tmpSearch = ''
        if ((res && res.length > 0)) {
          if (this.query && !this.query.includes('[')) {
            this.query = this.query.concat(this.Users)
            this.$refs.theSelect.onEscape()
          } else {
            this.query = this.Users
            this.$refs.theSelect.onEscape()
          }
        }
      }).catch(e => {
        if (e.data.ViMessage === 'User không tồn tại' || e.data.EnMessage === 'User is NOT found') {
          this.tmpSearch = ''
          this.toastedError(this.$t('User không tồn tại'))
        }
      })
    },
    takeInfo () {
      if (!this.tmpSearch) return
      new UserInfo({username: this.tmpSearch}).all().then(res => {
        this.Users = res.map(e => {
          return {
            FullShort: '',
            Fullname: '',
            Id: '',
            label: e.Fullname + ` (${e.Username})`,
            Title: '',
            Username: e.Username
          }
        })
        this.hasData = true
        this.tmpSearch = ''
        if (this.query) {
          this.query = this.query.concat(this.Users)
          this.$refs.theSelect.onEscape()
        } else {
          this.query = this.Users
          this.$refs.theSelect.onEscape()
        }
      }).catch(e => {
        if (e.data.ViMessage === 'User không tồn tại' || e.data.EnMessage === 'User is NOT found') {
          this.tmpSearch = ''
          this.toastedError(this.$t('User không tồn tại'))
        }
      })
    },
    emit () {
      if (!this.multiple) {
        setTimeout(() => {
          console.log('this.query 1', this.query)
          console.log('emit ~ this.query', this.query)
          this.$emit('input', this.query ? (this.query.Username ? [this.query.Username] : this.query[0].Username) : null)
          this.$emit('onSelect', this.query)
        }, 100)
      } else {
        setTimeout(() => {
          console.log('this.query 2', this.query)
          if (typeof this.query === 'string') {
            this.query = [this.query]
          }
          this.$emit('input', this.query ? this.query.map(e => { return e.Username ? e.Username : e }) : null)
          this.$emit('onSelect', this.query)
        }, 100)
      }
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      var data = {search: search}
      var data2 = {username: search}
      if (vm.position) {
        data.Position = vm.position
      }
      vm.tmpSearch = search
      new Users(data).all().then(res => {
        if (res.length === 0) {
          vm.dataApi2 = data2
          vm.lengthRes = 0
          vm.hasData = false
          vm.Users = res.map(e => {
            return {
              FullShort: '',
              Id: '',
              code: '',
              label: '',
              Username: '',
              Title: '',
              Fullname: ''
            }
          })
        } else {
          vm.hasData = true
          vm.Users = res.map(e => {
            return {
              FullShort: e.FullShort,
              Id: e.Id,
              code: e.Id,
              label: e.FullShort + ` (${e.Username})` || e.Fullname,
              Username: e.Username,
              Title: e.Title,
              Fullname: e.Fullname
            }
          })
        }
      })
    }, 350)
  }
}
</script>
<style scoped lang="stylus">
.readonly {
  cursor-pointer: none;
  background: #EEEEEE;
}
</style>
