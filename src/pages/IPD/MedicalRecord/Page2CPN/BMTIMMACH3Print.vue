<template>
  <div v-if="MASTERDATA">
    <div>
      <b>3. Phương pháp điều trị<i>{{__t3('3. Phương pháp điều trị')}}</i>:</b>
    </div>
    <div class="mrb10" v-if="getValueOfMASTERDATA('IPDMRPE1101', 'IPDMRPE1102')">
      + Kế hoạch điều trị và chăm sóc/ <i>Plan of care</i>: {{getValueOfMASTERDATA('IPDMRPE1101', 'IPDMRPE1102')}}
    </div>
    <div class="mrb10" v-if="getValueOfMASTERDATA('IPDMRPE1103', 'IPDMRPE1104')">
      + Tư vấn chuyên khoa/ <i>Physician’s Consult</i>: {{getValueOfMASTERDATA('IPDMRPE1103', 'IPDMRPE1104')}}
    </div>
    <div class="mrb10" v-if="getSP()">
      + Phẫu thuật/ Thủ thuật/ <i>Surgery/ Procedure</i>: {{getSP()}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BMTIMMACH3Print',
  props: ['MASTERDATA'],
  methods: {
    getSP () {
      let str = ''
      if (this.MASTERDATA['IPDMRPE1105']) {
        if (this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1107')) {
          str = 'Không'
        }
        if (this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1106')) {
          if (!this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1108') &&
            !this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1109')) {
            str = 'Có'
          }
          if (this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1108')) {
            str += 'Ghép tim. '
          }
          if (this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1109')) {
            str += this.getValueOfMASTERDATA('IPDMRPE1105', 'IPDMRPE1110')
          }
        }
      }
      return str
    }
  }
}
</script>
