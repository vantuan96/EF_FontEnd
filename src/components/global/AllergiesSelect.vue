<template>
  <!-- <select class="form-control v-select" ref="selectBox" :value="value" @input="updateValue()">
    <option :key="index" :value="option.value" v-for="(option, index) in items">{{option.label}}</option>
  </select> -->
  <div class="btn-group v-select-box" :class="{'no-multi': !multi}" v-if="!view">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="setFocus">
      <!-- {{selected || placeholder || '--Chọn--'}} -->
      <template v-if="selected && selected.length">
        <span class="tag-label" :key="index" :value="item.value" v-for="(item, index) in selected">{{__t(item.label)}}</span>
      </template>
      <span class="placeholder-label tag-label" v-else-if="placeholder">{{__t(placeholder)}}</span>
      <span class="placeholder-label" v-else>--{{__t('Chọn')}}--</span>
      <span v-if="selected && selected.length" class="glyphicon glyphicon glyphicon-remove" @click="clearAll()"></span>
    </button>
    <ul class="dropdown-menu">
      <li v-if="search" class="v-search-input">
        <input class="form-control" ref="searchInput" v-model="searchQuery" />
      </li>
      <li :class="{'active': isSelected(option)}" @click="setOption(option)" :key="index" :value="option.value" v-for="(option, index) in items"><a>{{__t(option.label)}}</a></li>
      <!-- <li v-if="selected" @click="removeOption()"><a>Bỏ chọn</a></li> -->
    </ul>
  </div>
  <span v-else><template v-if="selected && selected.length">{{selectedView}}</template></span>
</template>

<script>
import _ from 'lodash'
import utils from '@/utils'
export default {
  name: 'AllergiesSelect',
  props: ['value', 'items', 'placeholder', 'multi', 'sty', 'search', 'view'],
  data () {
    return {
      selected: [],
      searchQuery: '',
      options: [],
      selectedValue: []
    }
  },
  watch: {
    value: function (val) {
    },
    items: function (val) {
    }
  },
  updated () {
  },
  created () {
    this.init()
  },
  computed: {
    filtere: function () {
      if (!this.searchQuery) return this.options
      let cleanedSearchKey = utils.cleanSearchKey(this.searchQuery)
      return this.options.filter((item) => {
        return (item.searchableValue.indexOf(cleanedSearchKey) > -1)
      })
    },
    selectedView: function () {
      var str = this.selected.map(e => {
        return e.label
      })
      return str.join(',')
    }
  },
  methods: {
    init () {
      if (this.value) {
        this.selectedValue = this.value.split(',')
      }
      this.selected = []
      this.options = []
      this.items.forEach(element => {
        this.options.push({
          value: element.value,
          label: element.label,
          vilabel: element.vilabel,
          enlabel: element.enlabel,
          searchableValue: utils.cleanSearchKey(element.label),
          selected: false
        })
        if (this.selectedValue.includes(element.value)) {
          this.selected.push({
            value: element.value,
            label: element.label,
            vilabel: element.vilabel,
            enlabel: element.enlabel,
            searchableValue: utils.cleanSearchKey(element.label),
            selected: true
          })
        }
      })
    },
    setFocus () {
      setTimeout(() => {
        if (this.search) this.$refs.searchInput.focus()
      }, 1)
    },
    setOption (item) {
      if (!this.multi) {
        this.selected = []
      }
      if (this.getIndexOfElementInArrary(this.selected, item) > -1) {
        this.removeItem(item)
      } else {
        this.selected.push(item)
      }
      this.emitData()
    },
    emitData () {
      var str = this.selected.map(e => {
        return e.value
      })
      this.$emit('input', str.join(','))
    },
    removeOption () {
      this.selected = null
      this.$emit('input', null)
    },
    removeItem (item) {
      let index = this.getIndexOfElementInArrary(this.selected, item)
      if (index > -1) this.selected.splice(index, 1)
    },
    getIndexOfElementInArrary (array, element) {
      let index = _.findIndex(array, {value: element.value})
      return index
    },
    isSelected (item) {
      return this.getIndexOfElementInArrary(this.selected, item) > -1
    },
    clearAll () {
      this.selected = []
      this.emitData()
    }
  }
}
</script>
