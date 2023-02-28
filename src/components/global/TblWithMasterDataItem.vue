<template>
  <tr v-if="loaded && !print" :style="viewOnly ? 'cursor: default' : ''">
    <td :width="widthTD ? widthTD[index] : {}" :key="index" v-for="(item, index) in md.Items" v-if="!indexs || indexs.includes(index)" style="position: relative;">
      <template v-if="index === 0 && !viewOnly">
        <button @click="remove" class="btn-pos-left"><i aria-hidden="true" class="fa fa-trash"></i></button>
      </template>
      <input
        class="form-control"
        v-model="item.Value"
        :placeholder="__t('Nhập')"
        v-if="item.DataType === 'Text' && !item.Note"
        :readonly="viewOnly"
      />
      <!-- Tên thuốc -->
      <template v-if="item.DataType === 'getTenThuoc'">
        <medication v-model="item.Value" :readonly="viewOnly" />
      </template>
      <!-- Đường dùng -->
      <template v-if="item.DataType === 'getDuongDung'">
        <medication-route v-model="item.Value" :readonly="viewOnly"/>
      </template>
      <div v-if="item.DataType === 'AutoIncrease'"></div>
      <MDText v-if="item.DataType === 'TextArea'" :readonly="viewOnly" rows="1" :placeholder="__t('Nhập')" v-model="item.Value" />
      <VNumberInput v-if="item.DataType === 'Year'" :getyear="true" :readonly="viewOnly" class="input-para" v-model="item.Value" :placeholder="'YYYY'"/>
      <VNumberInput v-if="item.DataType === 'NumberDecimal'" :readonly="viewOnly" :decimal="true" v-model="item.Value" :placeholder="'Nhập'"/>
      <div class="text-center" v-if="item.DataType === 'Checkbox'">
        <span class="v-checkbox" align="center">
          <input type="checkbox" :disabled="viewOnly" :id="item.Code + indexRow + '-' + index" :name="item.Code + indexRow + '-' + index" v-model="item.Value">
          <label :style="`cursor: ${viewOnly ? 'context-menu' : null};`" :for="item.Code + indexRow + '-' + index"></label>
        </span>
      </div>
      <div class="text-center" v-if="item.DataType === 'Radio'">
        <span class="v-checkbox" align="center">
          <input type="checkbox" :disabled="viewOnly" :id="item.Code + indexRow + '-' + index" :name="item.Code + indexRow + '-' + index" v-model="item.Value">
          <label :style="`cursor: ${viewOnly ? 'context-menu' : null};`" :for="item.Code + indexRow + '-' + index" @click="checkbox2Radio4(md.Items, item)"></label>
        </span>
      </div>
      <div v-if="!item.DataType">
        <v-date-time-picker v-if="!viewOnly" :type="formatTime ? 'date' : ''" :hideTooltip="true" v-model="item.Value" :format="formatTime ? formatTime :vDateTimeFormat"/>
        <p v-else class="fake-input disable full-width" style="margin: 0">{{item.Value || 'N/A'}}</p>
      </div>
      <div v-if="item.DataType === 'Text' && item.Note === 'getUser'">
        <VNameCD
          :hideLabel="true"
          :readonly="viewOnly"
          :data="item"
          :hideCd="true"
          v-model="item.Value"
          widthLabel="min-width: 122px;"/>
      </div>
      <div v-if="item.DataType === 'RadioGroup' || item.Code === 'IPDSANTBL16'">
        <div class="group-radio full-width" :id="item.Code">
          <span class="mrr10" v-if="viewOnly">
            <b class="el-radio-view" v-if="item.Value">
              {{__t(getName(item.Value, item.Code))}}
            </b>
            <b class="el-radio-view disable" v-else>
              N/A
            </b>
          </span>
          <template v-for="(e, dex) in item.Data" v-else>
            <span :data="e" :key="dex" class="mrr10">
              <input type="radio" :id="index + 'radio-mdc' + dex + '-' + indexRow" :name="index + 'radio-mdc' + '-' + indexRow" :value="e.Value" v-model="item.Value">
              <label class="fw100" :for="index + 'radio-mdc' + dex + '-' + indexRow" @click="handleChange(e.Value)">{{__t(e.Label)}}</label>
            </span>
          </template>
      </div>
      </div>
      <div v-if="item.Note === 'getCreatedAt'">
        <ad-Info v-if="item.Value" :ad="item.Value" />
      </div>
    </td>
  </tr>
  <tr v-else-if="loaded && print" :class="ontop ? 'on-top' : ''">
    <td :width="widthTD ? widthTD[index] : {}" :class="(item.DataType === 'Checkbox' || item.DataType === 'Radio') ? 'text-center' : null" :key="index" v-for="(item, index) in md.Items" v-if="!indexs || indexs.includes(index)" style="position: relative;">
      <p v-if="item.DataType === 'Text' && item.Note !== 'getUser'">{{item.Value}}</p>
      <VTich v-if="item.DataType === 'Checkbox'" v-model="item.Value" />
      <VTich v-if="item.DataType === 'Radio'" v-model="item.Value" />
      <div v-if="item.DataType === 'AutoIncrease'">{{indexRow + 1}}</div>
      <div v-if="item.DataType === 'Year'">{{item.Value}}</div>
      <div v-if="!item.DataType">
        <p>{{item.Value}}</p>
      </div>
      <div v-if="item.DataType === 'TextArea'">
        <p>{{item.Value}}</p>
      </div>
      <div v-if="item.DataType === 'Text' && item.Note === 'getUser'">
        <div class="word-break">{{item.Value}}</div>
      </div>
      <div v-if="item.DataType === 'RadioGroup' || item.Code === 'IPDSANTBL16'">
        <template v-for="(e, dex) in item.Data">
          <span :data="e" :key="dex">
            <p v-if="e.Value === item.Value">{{e.Label + '/ '}}<i>{{__t5(e.Label)}}</i></p>
          </span>
        </template>
      </div>
    </td>
  </tr>
</template>
<script>
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import VNameCD from '@/components/global/VNameCD.vue'
export default {
  name: 'TblWithMasterDataItem',
  props: [
    'MASTERDATA',
    'value',
    'readonly',
    'indexRow',
    'print',
    'ontop',
    'indexs',
    'formatTime',
    'checkUserEdit',
    'dontGetDate',
    'widthTD'
  ],
  components: {
    VDateTimePicker,
    VNameCD
  },
  data () {
    return {
      data: false,
      md: {},
      loaded: false,
      viewOnly: false
    }
  },
  watch: {
    md: {
      handler () {
        if (this.loaded) this.emitData()
      },
      deep: true
    },
    readonly (val) {
      if (val) {
        this.viewOnly = true
      }
    }
  },
  created () {
    this.md_ = this.cloneObj(this.MASTERDATA)
    if (this.md_.Items) {
      this.md_.Items.forEach((item) => {
        var code = item.Code
        if (item.DataType === 'RadioGroup' || item.Code === 'IPDSANTBL16') item.Data = this.JSONParse(item.Data)
        var exited = _.find(this.value, { Code: code })
        if (exited) {
          if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
            item.Value = exited.Value === 'True' || exited.Value === 'true'
          } else {
            item.Value = exited.Value
          }
          item.Id = exited.Id
        } else {
          item.Value = null
        }
        if (!item.DataType && !item.Value && !this.readonly && !this.dontGetDate) {
          item.Value = moment(new Date()).format(this.formatTime || 'HH:mm DD/MM/YYYY' || 'DD/MM/YYYY')
          setTimeout(() => {
            this.emitData()
          }, 200)
        }
        if (item.DataType === 'Text' && item.Note === 'getCreatedAt') {
          if (!item.Value) {
            item.Value = this.$store.state.account.Username
          }
        }
      })
    }
    this.md = this.md_
    setTimeout(() => {
      this.loaded = true
    }, 100)
  },
  mounted () {
    if (this.checkUserEdit) {
      setTimeout(() => {
        this.checkUserEdit2()
      }, 500)
    }
    if (this.readonly) {
      this.viewOnly = this.readonly
    }
    this.emitData()
  },
  methods: {
    remove () {
      this.$emit('onDelete')
    },
    emitData () {
      this.$emit('input', this.md.Items)
    },
    getName (number, code) {
      let name = ''
      if (number === '1') {
        name = 'Có'
      }
      if (number === '0') {
        name = 'Không'
      }
      if (number === '1' && code === 'PRFOURE57') {
        name = 'Nam'
      }
      if (number === '0' && code === 'PRFOURE57') {
        name = 'Nữ'
      }
      if (number === '1' && code === 'PMVPCTTM187') {
        name = 'Có áp dụng-1'
      }
      if (number === '0' && code === 'PMVPCTTM187') {
        name = 'Không áp dụng-1'
      }
      if (number === '2' && code === 'PMVPCTTM187') {
        name = 'Đã thực hiện-1'
      }
      return name
    },
    handleChange (val) {
      this.md.Items.find(e => {
        if (e.DataType === 'RadioGroup') {
          if (e.Value === val.toString()) {
            setTimeout(() => {
              e.Value = ''
            }, 100)
            console.log('e: ', e)
          }
        }
      })
    },
    checkUserEdit2 () {
      this.md.Items.find(e => {
        if (e.Note === 'getCreatedAt' && e.Value) {
          if (e.Value !== this.$store.state.account.Username) {
            console.log('user: ', this.$store.state.account.Username)
            this.viewOnly = true
          }
        }
      })
    }
  }
}
</script>
<style scoped>
input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #aaa!important;
  border-color: #aaa!important;
}
input[type=radio]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #aaa!important;
  border-color: #aaa!important;
}
</style>
