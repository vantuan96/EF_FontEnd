<template>
  <div class="v-context-menu2">
    <a @click="open" href="javascript:void(0);">
      <span class="glyphicon glyphicon glyphicon-th-list"></span> {{title || __t('Thư viện')}}
    </a>
    <modal :name="'list-modal-' + MODELID" transition="pop-out" :height="modalHeight" :scrollable="true" :width="modalWidth">
      <div class="fill-height-or-more">
        <div class="sxtable">
          <treeselect
            name="demo"
            :multiple="multiple"
            :clearable="clearable"
            :searchable="searchable"
            :disabled="disabled"
            :open-on-click="openOnClick"
            :open-on-focus="openOnFocus"
            :clear-on-select="clearOnSelect"
            :close-on-select="closeOnSelect"
            :always-open="alwaysOpen"
            :append-to-body="appendToBody"
            :sort-value-by="sortValueBy"
            :options="options"
            v-model="value"
            :max-height="9999999"
            :limit="5"
            :value-consists-of="valueConsistsOf"
            :disable-fuzzy-matching="true"
            :placeholder="__t('Gõ để tìm kiếm')"
            >
            <!-- <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName }" :class="labelClassName">
              {{ node.raw.customLabel ? node.raw.customLabel : ''}}
            </label> -->
          </treeselect>
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
import Treeselect from '@riophae/vue-treeselect-master'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import MasterDatas from '@/services/MasterDatas'
const MODAL_WIDTH = 1028
const modelId = new Date().getTime()
// 'GENRELI' thư viện lời dặn bác sĩ
export default {
  name: 'RecommendationLib',
  props: ['title', 'mdCode', 'defaultValue'],
  components: { Treeselect },
  data () {
    return {
      MODELID: modelId,
      valueConsistsOf: 'LEAF_PRIORITY',
      sortValueBy: 'ORDER_SELECTED',
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
      clearOnSelect: true,
      closeOnSelect: false,
      alwaysOpen: true,
      appendToBody: false,
      rtl: false,
      value: [],
      options: [],
      searchNested: true,
      mapcode: {},
      mapObjCode: {},
      flatArr: []
    }
  },
  created () {
    // this.options = this.changeAlias('Tieengs Việt có dấu @&@&@&,>??//**')
    this.MODELID = this.makeid(18)
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.modalHeight = window.innerHeight * 80 / 100
    // this.getMd()
  },
  computed: {
  },
  methods: {
    setDefaultValue () {
      this.value = []
      // if (this.defaultValue) {
      //   this.value = this.defaultValue.split('\n').map(e => utils.cleanSearchKey(this.trim_(e, '-'), '-')).filter(f => f && this.mapcode[f])
      // } else {
      //   this.value = []
      // }
    },
    select () {
      this.$emit('copy', this.mappingValue())
      this.close()
    },
    mappingValue () {
      if (!this.value) return null
      if (['GENTCTBL', 'IPDKBCCTK'].includes(this.mdCode)) {
        return this.option2Level()
      } else if (['IPDKBCCNDK', 'GENTCTBL2', 'KHCSDTCD101021', 'LOIDAN061021', 'KHCSDTPP101021', 'KHCSDTXNTD101021', 'KHCSDTCSDD101021', 'KHCSDTGDSK101021', 'KHCSDTNVRV101021', 'KHCSDTTL101021'].includes(this.mdCode)) {
        return this.option3Level()
      } else {
        console.log(this.value)
        return this.value.map(e => {
          return this.mapcode[e] ? this.trim_('- ' + this.mapcode[e]) : ''
        }).filter(e => e)
      }
    },
    option2Level () {
      var selected = this.value.map(e => {
        return e
      })
      var mdvalue = []
      this.options.forEach(op => {
        var hasSelected = op.children.filter(e => {
          return selected.includes(e.id)
        }).map(e => '- ' + e.label)
        if (hasSelected.length) {
          mdvalue.push('\n' + op.label + ':')
          mdvalue = mdvalue.concat(hasSelected)
        }
      })
      return mdvalue
    },
    option3Level () {
      var selected = this.value
      var mdvalue = []
      selected.forEach(item => {
        var obj = this.mapObjCode[item]
        var hasData = mdvalue.find(e => e.Code === item)
        if (!hasData) {
          mdvalue.push(obj)
          var parrent = obj.parrent
          if (parrent && !mdvalue.find(e => e.Code === parrent.Code)) {
            mdvalue.push(parrent)
            var grand = parrent.parrent
            if (grand && !mdvalue.find(e => e.Code === grand.Code)) {
              mdvalue.push(grand)
            }
          }
        }
      })
      return mdvalue.sort((a, b) => (a.Order > b.Order) ? 1 : -1).map(e => {
        if (e.Level === 1) return '\n' + this.__label(e) + ':'
        if (e.Level === 2) return ' - ' + this.__label(e)
        if (e.Level === 3) return '   + ' + this.__label(e)
      })
    },
    close () {
      this.$modal.hide('list-modal-' + this.MODELID)
    },
    open () {
      this.getMd()
    },
    getMd () {
      new MasterDatas({Form: this.mdCode || 'GENRELI'})
        .all()
        .then(response => {
          var locale = this.$i18n.locale
          this.options = response.map(e => {
            var parrentCode = e.Code
            var lv1Lb = locale === 'vi' ? e.ViName : e.EnName
            if (!e.Items || e.Items.length === 0) {
              this.$set(this.mapcode, e.Code, lv1Lb)
              return {
                id: parrentCode,
                label: lv1Lb
              }
            }
            return {
              id: parrentCode,
              label: lv1Lb,
              children: e.Items.map(item => {
                var lb = locale === 'vi' ? item.ViName : item.EnName
                this.$set(this.mapcode, item.Code, lb)
                item.parrent = e
                this.$set(this.mapObjCode, item.Code, item)
                if (!item.Items || item.Items.length === 0) {
                  return {
                    id: item.Code,
                    label: lb
                  }
                }
                return {
                  id: item.Code,
                  label: lb,
                  children: (!item.Items || item.Items.length === 0) ? null : item.Items.map(itemlv2 => {
                    var lblv2 = locale === 'vi' ? itemlv2.ViName : itemlv2.EnName
                    this.$set(this.mapcode, itemlv2.Code, lblv2)
                    itemlv2.parrent = item
                    this.$set(this.mapObjCode, itemlv2.Code, itemlv2)
                    return {
                      id: itemlv2.Code,
                      label: lblv2
                    }
                  })
                }
              })
            }
          })
          this.setDefaultValue()
          this.$modal.show('list-modal-' + this.MODELID)
        })
    },
    setRole (e) {
      e.stopPropagation()
    }
  }
}
</script>
