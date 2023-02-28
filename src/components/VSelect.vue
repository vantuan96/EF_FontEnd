<template>
  <div v-if="readonly" :class="unsetWidth ? 'text-center' : null">
    {{selected.map(e => e.label).join(',')}}
  </div>
  <div v-else-if="isConfirmedCheck" :class="unsetWidth ? 'text-center' : null">
    <p v-if="isConfirmedCheck" class="fake-input disable full-width" style="margin: 0">{{selected.map(e => e.label).join(',')}}</p>
  </div>
  <div v-else-if="isCheckVSelect" :class="unsetWidth ? 'text-center' : null">
    <p v-if="isCheckVSelect" class="fake-input disable" style="margin: 0; width:354px;">{{selected.map(e => e.label).join(',')}}</p>
  </div>
  <div v-else class="btn-group v-select-box" :class="{'no-multi': !multi, 'full-width': fullwidth}">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="setFocus" :style="styleSelect">
      <!-- {{selected || placeholder || '--Chọn--'}} -->
      <template v-if="selected && selected.length">
        <span class="tag-label" :class="unsetWidth ? 'text-center' : null" :key="index" :value="item.value" v-for="(item, index) in selected">{{__tran(item)}}</span>
      </template>
      <span class="placeholder-label tag-label" v-else-if="placeholder">{{placeholder}}</span>
      <span class="placeholder-label" v-else>--{{__t('Chọn')}}--</span>
      <span v-if="selected && selected.length && !disabeleclear" class="glyphicon glyphicon glyphicon-remove" @click="clearAll()"></span>
      <span v-else-if="showGlyphicon" class="glyphicon glyphicon-chevron-down"></span>
      <span v-if="selected && selected.length === 0 && !showGlyphicon" class="glyphicon glyphicon-chevron-down"></span>
    </button>
    <ul class="dropdown-menu" :class="unsetWidth ? 'unsetWidth' : null">
      <li v-if="search" class="v-search-input">
        <input :id="code" class="form-control" ref="searchInput" v-model="searchQuery" />
      </li>
      <li :class="{'active': isSelected(option)}" @click="setOption(option)" :key="index" :value="option.value" v-for="(option, index) in filtere"><a>{{__tran(option)}}</a></li>
      <!-- <li v-if="selected" @click="removeOption()"><a>Bỏ chọn</a></li> -->
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
import utils from '../utils'
export default {
  name: 'v-select',
  props: ['value', 'items', 'placeholder', 'multi', 'sty', 'search', 'disabeleclear', 'traned', 'readonly', 'unsetWidth', 'isConfirmedCheck', 'styleSelect', 'showGlyphicon', 'code', 'isCheckVSelect', 'fullwidth'],
  data () {
    return {
      selected: [],
      searchQuery: '',
      options: []
    }
  },
  watch: {
    value: function (val) {
      if (typeof val === 'object') {
        this.selected = val || []
      } else {
        var find = _.find(this.items, {value: val})
        this.selected = find ? [find] : []
      }
    },
    items: function (val) {
      this.init()
    }
  },
  created () {
    this.init()
  },
  computed: {
    displayLable: function () {
      return this.selected
    },
    filtere: function () {
      if (!this.searchQuery) return this.options
      let cleanedSearchKey = utils.cleanSearchKey(this.searchQuery)
      return this.options.filter((item) => {
        return (item.searchableValue.indexOf(cleanedSearchKey) > -1)
      })
    }
  },
  methods: {
    __tran (item) {
      let locale = this.$i18n.locale
      if (locale === 'en' && item.EnLabel) return item.EnLabel
      return this.__t(item.label)
    },
    init () {
      this.selected = []
      this.options = []
      this.items.forEach(element => {
        if (typeof this.value === 'object') {
          this.selected = this.value
        } else {
          if (element.value === this.value) {
            if (!this.multi) {
              this.selected = [{
                value: element.value,
                label: element.label,
                vilabel: element.vilabel,
                enlabel: element.enlabel,
                selected: true
              }]
            } else {
              this.selected.push({
                value: element.value,
                label: element.label,
                vilabel: element.vilabel,
                enlabel: element.enlabel,
                selected: true
              })
            }
          }
        }
        this.options.push({
          value: element.value,
          label: element.label,
          vilabel: element.vilabel,
          enlabel: element.enlabel,
          searchableValue: utils.cleanSearchKey(element.label),
          selected: false,
          ...element
        })
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
      if (!this.multi) {
        var selected = this.selected.length && this.selected[0] ? this.selected[0].value : ''
        this.$emit('change', selected)
        this.$emit('onSelect', this.selected.length && this.selected[0] ? this.selected[0] : {})
        this.$emit('input', selected)
        this.$emit('onChange', selected)
      } else {
        this.$emit('change', this.selected)
        this.$emit('onChange', this.selected)
        this.$emit('input', this.selected)
      }
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
<style scoped>
.unsetWidth {
  text-align: center!important;
  min-width: unset!important;
}
</style>
