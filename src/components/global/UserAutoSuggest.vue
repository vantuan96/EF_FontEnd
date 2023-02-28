<template>
  <vue-autosuggest
    v-model="query"
    :suggestions="suggestions"
    @closed="close"
    @input="fetchResults"
    @selected="selectHandler"
    :input-props="{id:'autosuggest__input', class: 'form-control', placeholder: (placeholder || '')}">
  </vue-autosuggest>
</template>
<script>
import Users from '@/services/Users'
export default {
  name: 'UserAutoSuggest',
  props: ['value', 'placeholder', 'position', 'getUserName', 'getTitle'],
  data () {
    return {
      suggestions: [{data: []}],
      query: '',
      default: [],
      userData: {}
    }
  },
  components: {
    // VAuto
  },
  created () {
    this.query = this.value
    if (this.value) this.suggestions = [{data: [this.query]}]
  },
  computed: {
  },
  watch: {
    value (val) {
      this.query = val
      if (this.value) this.suggestions = [{data: [this.query]}]
    }
  },
  methods: {
    close () {
      setTimeout(() => {
        this.$emit('input', this.query)
      }, 100)
    },
    selectHandler (item, e) {
      console.log(item)
      // this.$emit('input', item.item)
      if (this.getUserName) {
        this.query = this.userData
      } else {
        this.query = item.item
      }
    },
    fetchResults () {
      clearTimeout(this.timeout)
      this.$emit('input', this.query)
      this.timeout = setTimeout(() => {
        if (!this.query) return false
        var data = {search: this.query}
        if (this.position !== 'ALL') {
          data.Position = this.position || 'Doctor'
        }
        data.noLoading = true
        new Users(data).all().then(response => {
          var data = response.map(e => {
            if (e.Title) {
              this.$emit('pushTitle', e.Title)
            }
            if (this.getUserName) {
              this.userData = e
            }
            let str = ''
            if (this.getTitle) {
              if (e.FullShort) {
                str = e.FullShort
              } else if (!e.FullShort && e.Fullname) {
                str = e.Fullname
              }
              if (e.Title) {
                if (str) {
                  str += ' - '
                }
                str += e.Title
              }
            } else {
              str = e.FullShort + ` (${e.Username})` || e.Fullname
            }
            return str
          }).filter(f => f)
          this.suggestions = [{data: data}]
        })
      }, 350)
    }
  }
}
</script>
