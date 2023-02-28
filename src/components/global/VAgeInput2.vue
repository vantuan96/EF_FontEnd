<template>
<div>
  <div v-if="print">
    <CharWithSquare :text="value2.replace(/[^\w\s]/gi, '')" :defaultlength="defaultlength" />
    <div class="float-right" v-if="showAge"><CharWithSquare :text="age" :defaultlength="2"  /></div>
  </div>
  <div v-if="getyear" class="form-group">
    <div class="flex-box flex-center">
      <div class="mrr5" :class="boldLb ? 'fw600' : null">{{__label(label)}}:</div>
      <div class="flex align-center">
        <VNumberInput class="mrr5" style="display: inline-block;width: 150px;margin-right: 0px;" :getyear="getyear" :readonly="readonly" v-model="value2" :placeholder="'YYYY'" @change="handleChangeYear"/>
        <template v-if="!readonly">
          <div style="display: inline-block;background-color: #eee" :class="error ? 'input-error' : ''">
            <VNumberInput style="display: inline-block;width: 65px;" @change="handleChangeAge" :maxlength="3" v-model="age2" :placeholder="__t('nhập')"/>
            <span class="mrr5">{{__t('tuổi')}}</span>
          </div>
          <div class="mrl5 text-error box-error" :class="error ? 'show-box-error' : ''">
            <div>{{__label(msg)}}</div>
          </div>
        </template>
        <div v-else class="input-group-addon" style="background-color: #eee;display: inline!important;width: 62px;height: 31px;padding-top: 9px;">{{age2}} {{__t('tuổi')}}</div>
      </div>
    </div>
  </div>
  <span v-if="getage">{{(age2 && age2 !== 'N/A') ? age2 : ''}}</span>
  <div v-if="!print && !getage && !getyear" class="form-group">
    <div class="flex-box flex-center">
      <div class="mrr5" :class="boldLb ? 'fw600' : null">{{__label(label)}}:</div>
      <div class="input-group" :style="width ? null : 'flex-grow: 1'">
        <input v-if="readonly" :style="width ? `width: ${width}` : null" readonly v-model="value2" :placeholder="vDateFormat" class="form-control" />
        <v-masked-input v-else :style="width ? `width: ${width}` : null" mask="11/11/1111" v-model="value2" :placeholder="vDateFormat" class="form-control" />
        <span class="input-group-addon" style="background-color: #eee">{{age}} {{__t('tuổi')}}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'VAgeInput2',
  props: ['value', 'hideLabel', 'label', 'readonly', 'print', 'showAge', 'defaultlength', 'width', 'boldLb', 'getage', 'getyear', 'DateOfBirth'],
  components: {
    VDateTimePicker
  },
  watch: {
    value (val) {
      this.value2 = val
    },
    value2 (val) {
      this.$emit('input', (val))
    },
    DateOfBirth (val) {
      if (this.value) {
        this.age2 = this.value - parseInt(val)
      }
    },
    age2 (val) {
      let now = new Date()
      let y = now.getFullYear()
      let age = y - parseInt(this.DateOfBirth)
      if (parseInt(val) > parseInt(age)) {
        this.error = true
      } else {
        this.error = false
      }
    }
  },
  data () {
    return {
      value2: '',
      age2: '',
      error: false,
      msg: {
        ViName: 'Lỗi: Tuổi nhập không được lớn hơn tuổi hiện tại.',
        EnName: 'Error: The entered age cannot be older than the current age.'
      }
    }
  },
  created () {
    this.value2 = this.value
    if (this.value) {
      this.age2 = this.value - parseInt(this.DateOfBirth)
    }
  },
  mounted () {
  },
  computed: {
    age () {
      if (this.value2) {
        var now = new Date()
        var y = now.getFullYear()
        if (this.getyear) {
          if (this.DateOfBirth) {
            return parseInt(this.value2) - parseInt(this.DateOfBirth)
          }
          return y - parseInt(this.value2)
        } else {
          var dob = this.value2.split('/')
          return y - parseInt(dob[2])
        }
      }
      return 'N/A'
    }
  },
  methods: {
    handleChangeAge (data) {
      if (data) {
        this.value2 = parseInt(this.DateOfBirth) + parseInt(data)
      } else {
        this.value2 = ''
      }
    },
    handleChangeYear (data) {
      if (data) {
        this.age2 = parseInt(data) - parseInt(this.DateOfBirth)
      } else {
        this.age2 = ''
      }
    }
  }
}
</script>
<style scoped>
  .box-error {
    display: inline-block!important;
    width: 0px;
    transition: width 1s;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
  }
  .show-box-error {
    width: 400px;
  }
  .input-error {
    border: 0.25px solid red;
  }
  .text-error {
    color: red;
  }
</style>
