<template>
  <div>
    <span v-if="!hasData"><button class="btn-sync-data btn" @click="takeInfo">{{this.$t('Lấy thông tin theo Username')}} {{tmpSearch}}</button></span>
    <v-select :class="{'readonly': readonly}" :readonly="readonly" @input="emit" :multiple="!single" v-model="query" :filterable="false" :options="Users" @search="onSearch" :placeholder="placeholder">
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
  name: 'UserAdV3',
  props: ['value', 'field', 'position', 'hasTitle', 'placeholder', 'readonly', 'single'],
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
    if (this.value) {
      this.query = {
        code: '',
        label: this.value,
        Username: '',
        Fullname: ''
      }
    }
    // if (this.value) {
    //   this.Users = this.value.filter(e => e)
    //   if (this.single) {
    //     this.query = this.value[0]
    //   } else {
    //     this.query = this.value
    //   }
    // }
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
    takeInfo () {
      new UserInfo({username: this.tmpSearch}).all().then(res => {
        this.Users = res.map(e => {
          console.log(e, 'check e')
          this.value = e.Fullname + ` (${e.Username})`
          this.query = {
            code: '',
            label: this.value,
            Username: '',
            Fullname: ''
          }
          this.hasData = true
        })
      }).catch(e => {
        if (e.data.ViMessage === 'User không tồn tại' || e.data.EnMessage === 'User is NOT found') {
          this.tmpSearch = ''
          this.toastedError(this.$t('User không tồn tại'))
        }
      })
    },
    emit () {
      setTimeout(() => {
        console.log(this.field, typeof this.query, 'check field')
        this.$emit('input', this.query ? (this.field ? this.query[this.field] : this.query.label) : null)
        this.$emit('onSelect', this.query)
        // this.$emit('input', this.query ? this.query.map(e => { return e.label }) : null)
        // this.$emit('onSelect', this.query ? this.query.map(e => { return e.label }) : null)
      }, 100)
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
