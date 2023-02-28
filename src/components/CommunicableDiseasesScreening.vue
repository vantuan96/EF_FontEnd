<template>
  <table class="no-border" v-if="value && Object.keys(value).length > 0 && value.constructor === Object">
    <!-- ODST -->
    <tr v-if="value[type + 'NOAP']">
      <td>
        <div v-if="readonly"><MDRadioView :data="value[type + 'NOAP'].Items" :DataType="value[type + 'NOAP'].Items[0].DataType" /></div>
        <div class="group-radio" v-else>
          <span :data="item" :key="index" v-for="(item, index) in value[type + 'NOAP'].Items">
            <input type="checkbox" :id="type + 'CODOradio-' + index" v-model="item.Value">
            <label :for="type + 'CODOradio-' + index" @click="setIVISITOR()">{{__label(item)}}</label>
          </span>
        </div>
      </td>
      <td></td>
    </tr>
    <template v-if="!value[type + 'NOAP'].Items[0].Value">
      <template v-for="(code, indexcode) in QuestionCode">
        <tr :key="indexcode" v-if="value[type + code]">
          <td>{{__label(value[type + code])}}</td>
          <td>
            <div v-if="readonly"><MDRadioView :data="value[type + code].Items" :DataType="value[type + code].Items[0].DataType" /></div>
            <div class="group-radio" v-else>
              <span :data="item" :key="index" v-for="(item, index) in value[type + code].Items">
                <input type="checkbox" :id="type + code + 'CODOradio-' + index" v-model="item.Value">
                <label :for="type + code + 'CODOradio-' + index" @click="checkbox2Radio(value[type + code].Items, item, code)">{{__label(item)}}</label>
              </span>
            </div>
          </td>
        </tr>
      </template>
    </template>
    <template v-for="(code, indexcode) in AnswerCode">
      <tr :key="indexcode + 'ans'" v-if="value[type + code]">
        <td>{{__label(value[type + code])}}</td>
        <td>
          <div v-if="readonly"><MDRadioView :data="value[type + code].Items" :DataType="value[type + code].Items[0].DataType" /></div>
          <div class="group-radio" v-else>
            <span :data="item" :key="index" v-for="(item, index) in value[type + code].Items">
              <input type="checkbox" :id="type + code + 'CODOradio-' + index" v-model="item.Value">
              <label :for="type + code + 'CODOradio-' + index" @click="checkbox2Radio(value[type + code].Items, item, code)">{{__label(item)}}</label>
            </span>
          </div>
        </td>
      </tr>
    </template>
    <template v-if="!value[type + 'NOAP'].Items[0].Value">
      <tr>
        <td colspan="2">
          <p>{{__t('Người bệnh từ > 6 tuổi được đánh giá là dương tính nếu: câu 1 hoặc câu 2 trả lời CÓ, và/hoặc khi NB có 2 triệu chứng trở lên tại câu 3.')}}</p>
          <p>{{__t('Đối với bệnh nhi ≤ 6 tuổi, sàng lọc dương tính nếu câu 1 hoặc câu 2 trả lời CÓ.')}}</p>
        </td>
      </tr>
      </template>
  </table>
</template>
<script>
export default {
  name: 'CommunicableDiseasesScreening',
  props: ['value', 'type', 'version', 'readonly'],
  mixins: [],
  data () {
    return {
      QuestionCode: ['CODO', 'CODI', 'FOSY'],
      AnswerCode: ['SCRE']
    }
  },
  watch: {
    value: {
      handler (a, b) {
        this.setResult()
        this.$emit('input', this.value)
      },
      deep: true
    }
  },
  computed: {
    age () {
      if (this.$store.state.account.CurrentPatientObj && this.$store.state.account.CurrentPatientObj.DateOfBirth && this.$store.state.account.CurrentPatientObj.AdmittedDate) {
        var now = this.$store.state.account.CurrentPatientObj.AdmittedDate.split('/')
        var dob = this.$store.state.account.CurrentPatientObj.DateOfBirth.split('/')
        return this.parseInt(now[2]) - this.parseInt(dob[2])
      }
      return 'N/A'
    }
  },
  created () {
  },
  methods: {
    setIVISITOR () {
      setTimeout(() => {
        if (this.value[this.type + 'NOAP'].Items[0].Value) {
          this.value[this.type + 'SCRE'].Items[0].Value = true
          this.value[this.type + 'SCRE'].Items[1].Value = false
        }
      }, 100)
    },
    checkbox2Radio (items, item, code) {
      if (code === 'FOSY') {
        items.forEach((element, index) => {
          if (item.Code.includes('FOSYNOO') && index < 4) {
            element.Value = false
          }
          if (element.Code.includes('FOSYNOO') && !item.Code.includes('FOSYNOO')) {
            element.Value = false
          }
        })
      } else {
        items.forEach(element => {
          if (element.Code !== item.Code) {
            if (this.checkString(element.DataType, 'Radio')) {
              element.Value = false
            }
          }
        })
      }
    },
    setResult () {
      // if (this.value[this.type + 'FOSY'].Items[4].Value) {
      //   this.value[this.type + 'FOSY'].Items.forEach((e, index) => {
      //     if (index < 4) e.Value = false
      //   })
      // }
      if (this.value && Object.keys(this.value).length > 0 && this.value.constructor === Object) {
        if (this.value[this.type + 'NOAP'].Items[0].Value) {
          this.QuestionCode.forEach(code => {
            this.value[this.type + code].Items.forEach(md => {
              md.Value = null
            })
          })
        } else {
          var isSCRETrue = false
          var isSCREFalse = (this.getValue('CODO') || [false, false])[0] || (this.getValue('CODI') || [false, false])[0] || (this.getValue('FOSY') || [false, false, false, false, false]).filter(e => e).length > 0 || this.value[this.type + 'FOSY'].Items[4].Value
          // ver 1
          if (this.age > 6) {
            isSCRETrue = (this.getValue('CODO') || [false, false])[1] || (this.getValue('CODI') || [false, false])[1] || (this.getValue('FOSY') || [false, false, false, false, false]).filter(e => e).length >= 2
          } else {
            isSCRETrue = (this.getValue('CODO') || [false, false])[1] || (this.getValue('CODI') || [false, false])[1]
          }
          if (this.value[this.type + 'SCRE']) {
            this.value[this.type + 'SCRE'].Items[0].Value = !isSCRETrue && isSCREFalse
            this.value[this.type + 'SCRE'].Items[1].Value = isSCRETrue
          }
        }
      }
    },
    getValue (mdDataCode) {
      if (this.value[this.type + mdDataCode]) {
        return this.value[this.type + mdDataCode].Items.map(e => {
          return e.Value && e.Code !== (this.type + 'FOSYNOO')
        })
      }
      return false
    }
  }
}
</script>
