<template>
  <div class="EyePrint3" style="border: 1px solid #353535; padding-left: 3px; padding-right: 3px;">
    <div class="mrb10"><b>1. Chẩn đoán bệnh chính<i>/ Primary diagnosis</i>:</b></div>
    <div class="mrl10 mrb10">
      <span class="inline">+ Lâm sàng<i>/ Clinical</i>: </span>
      <span class="inline">{{getValueOfMASTERDATA('IPDMRPE1051', 'IPDMRPE1052')}}</span>
    </div>
    <div class="mrl10 mrb10">
      <span class="inline">+ Nguyên nhân<i>/ Cause</i>: </span>
      <span class="inline">{{getValueOfMASTERDATA('IPDMRPE1053', 'IPDMRPE1054')}}</span>
    </div>
    <div class="mrb10"><b>2. Quá trình điều trị<i>/ Treatment process</i>:</b></div>
    <div class="mrl10 mrb10">
      <span class="inline">+ Nội khoa<i>/ Medicine treatment</i>: </span>
      <span class="inline">{{getValueOfMASTERDATA('IPDMRPE1056', 'IPDMRPE1057')}}</span>
    </div>
    <div class="mrl10 mrb10">+ Phẫu thuật<i>/ Surgical treatment</i>: </div>
    <table v-if="!DataTable" width="100%" class="tbl-b tbl-f mrb10">
      <tr>
        <th width="130px">
          <div>Ngày PT/</div>
          <div class="italic">Date of surgery</div>
        </th>
        <th>
          <div>Loại phẫu thuật/ Thủ thuật/</div>
          <div class="italic">Surgical methods</div>
        </th>
        <th width="300px">
          <div class="italic">Phẫu thuật viên/ <i>Surgeon</i></div>
        </th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <TblWithMasterData
      :top="true"
      class="mrb10"
      :headerStyle="[{width: '80px'}, {}, {width: '300px'}]"
      :FormCode="'IPDMATTBL1'"
      :VisitId="_VisitId"
      :VisitType="'IPD'"
      :FormID="Data.Id"
      :print="true"
      :indexs="[0, 1, 2]"
      :thead="['Ngày PT','','']"
      :centerHeader="true"
      @getCol="getCol"
      :checkShow="true"
      ref="TblWithMasterData"/>
    <div class="mrl10 mrb10">
      <span class="inline">+ Kết quả<i>/ Outcome</i>: </span>
      <span class="inline">{{getValueOfMASTERDATA('IPDMRPE1059', 'IPDMRPE1060')}}</span>
    </div>
    <div class="mrl10 mrb10">
      <span class="inline">+ Biến chứng/di chứng<i>/ Complications/sequelae</i>: </span>
      <span class="inline">{{getValueOfMASTERDATA('IPDMRPE1061', 'IPDMRPE1062')}}</span>
    </div>
    <div class="mrl10 mrb10">
      <span class="inline">+ Hướng điều trị tiếp<i>/ Next treatment plan</i>: </span>
      <span class="inline">{{getValueOfMASTERDATA('IPDMRPEHDTV', 'IPDMRPEHDTVANS')}}</span>
    </div>
  </div>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
export default {
  name: 'EyePrint3',
  props: ['box1', 'MASTERDATA', 'Data', 'VisitId', 'VisitIdDrop'],
  components: {
    TblWithMasterData
  },
  data () {
    return {
      DataTable: null
    }
  },
  mounted () {
  },
  methods: {
    getCol (col) {
      this.DataTable = ''
      if (col && col.length) {
        this.DataTable = col.length
      }
    }
  }
}
</script>
