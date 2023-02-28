<template>
  <div class="v-context-menu2">
    <a @click="open" href="javascript:void(0);">
      <span class="glyphicon glyphicon glyphicon-th-list"></span> {{title || __t('Thư viện')}}
    </a>
    <modal :name="name" transition="pop-out" :height="modalHeight" :scrollable="true" :width="modalWidth">
      <div class="fill-height-or-more">
        <div class="sxtable x-list-select">
          <treeselect
            :name="name"
            :multiple="multiple"
            :options="options"
            :always-open="alwaysOpen"
            v-model="value"
            :value-consists-of="valueConsistsOf"
            :default-expand-level="1"
            :disable-fuzzy-matching="true"
            :placeholder="__t('Gõ để tìm kiếm')"
            />
        </div>
        <div class="tFoot">
          <button type="button" class="btn btn-sm pull-left" @click="close">{{__t('Hủy')}}</button>
          <button type="button" class="btn btn-sm btn-warning" @click="select">{{__t('Chọn')}}</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
// import _ from 'lodash'
import utils from '@/utils'
import Treeselect from '@riophae/vue-treeselect-master'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import MasterDatas from '@/services/MasterDatas'
const MODAL_WIDTH = 1028
// 'GENRELI' thư viện lời dặn bác sĩ
export default {
  name: 'ListSelect',
  props: ['title', 'data', 'defaultValue', 'name', 'groupDefaultLib'],
  components: { Treeselect },
  data () {
    return {
      valueConsistsOf: 'LEAF_PRIORITY',
      countOfForm: 10,
      heightItemLi: 30,
      menuClass: '',
      menuTop: 0,
      multiple: true,
      clearable: true,
      searchable: true,
      disabled: false,
      openOnClick: false,
      openOnFocus: false,
      clearOnSelect: false,
      closeOnSelect: false,
      alwaysOpen: true,
      appendToBody: false,
      rtl: false,
      value: [],
      options: [],
      searchNested: true,
      mapcode: {},
      show: false
    }
  },
  created () {
    // this.options = this.generateOptions(2, 3)
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.modalHeight = window.innerHeight * 80 / 100
    if (this.groupDefaultLib) {
      // this.loadOptionsFromMd()
    } else {
      this.loadOptions(this.JSONParse(this.data) || [])
    }
  },
  computed: {
  },
  methods: {
    setDefaultValue () {
      this.value = []
      // if (this.defaultValue) this.value = ('\n' + this.defaultValue).split('\n-').map(e => utils.cleanSearchKey(e, '-')).filter(f => f && this.mapcode[f])
    },
    // stringToArray () {
    //   return var defaultData = (this.JSONParse(item.Data) || [])
    // },
    select () {
      this.$emit('select', this.mappingValue(), this.name)
      this.close()
    },
    mappingValue () {
      if (!this.value) return null
      return this.value.map(e => {
        return this.trim_('- ' + this.mapcode[e]) || ''
      }).filter(e => e)
    },
    close () {
      this.$modal.hide(this.name)
    },
    open () {
      if (this.groupDefaultLib) {
        this.loadOptionsFromMd()
      } else {
        this.setData()
      }
    },
    setData () {
      try {
        if (this.options && this.options[0].children.length === 1) {
          this.value = this.options[0].children.map(e => e.id)
          this.$emit('select', this.mappingValue(), this.name)
          return false
        }
      } catch (e) {
        console.log(e)
      }
      this.show = true
      this.setDefaultValue()
      this.$modal.show(this.name)
    },
    loadOptionsFromMd () {
      new MasterDatas({
        Group: this.groupDefaultLib
      }).all()
        .then(response => {
          var defaultData = response.map(element => {
            return this.$i18n.locale === 'vi' ? element.ViName : element.EnName
          })
          // this.data = JSON.stringify(defaultData)
          this.loadOptions(defaultData)
          this.setData()
        })
    },
    loadOptions (jsonData) {
      var defaultData = jsonData
      var chil = defaultData.map(id => {
        var code = utils.cleanSearchKey(id, '-')
        this.$set(this.mapcode, code, id)
        return {
          id: code,
          label: id
        }
      })
      this.options = [
        {
          id: 'root',
          label: this.__t('Chọn tất cả'),
          children: chil
        }
      ]
    },
    setRole (e) {
      e.stopPropagation()
    }
  }
}
</script>
