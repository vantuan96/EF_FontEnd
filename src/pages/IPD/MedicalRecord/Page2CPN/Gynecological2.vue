<template>
  <div class="Gynecological2" v-if="MASTERDATA && DataSubmit">
    <div v-if="box1">
      <label v-if="MASTERDATA['IPDMRPT817']" class="block mrr10" style="min-width: 192px!important;">{{__label(MASTERDATA['IPDMRPT817'])}}:</label>
      <VAgeInput :getyear="true" :DateOfBirth="DateOfBirth" :readonly="readonly" v-if="MASTERDATA['IPDMRPT818']" width="150px" :label="MASTERDATA['IPDMRPT818']" v-model="MASTERDATA['IPDMRPT818'].Items[0].Value"/>
      <div v-if="MASTERDATA['IPDMRPT820']" class="flex align-center mrb10">
        <div style="width: 200px;" class="block mrr10">{{__label(MASTERDATA['IPDMRPT820'])}}:</div>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT820'].Items[0].Value"/>
      </div>
      <div v-if="MASTERDATA['IPDMRPT822']" class="flex align-center mrb10">
        <span class="block mrr10" style="width: 120px;">{{__label(MASTERDATA['IPDMRPT822'])}}:</span>
        <VNumberInput style="width: 150px;" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT822'].Items[0].Value"/>
        <span class="mrr30">{{__t2('ngày')}}</span>
        <span class="block mrr10" style="min-width: 150px;">{{__label(MASTERDATA['IPDMRPT909'])}}:</span>
        <VNumberInput style="width: 150px;" :readonly="readonly" class="form-control mrr30" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT909'].Items[0].Value"/>
        <span v-if="MASTERDATA['IPDMRPT824']" style="min-width: 94px;" class="block mrr10">{{__label(MASTERDATA['IPDMRPT824'])}}:</span>
        <textarea-autosize v-if="MASTERDATA['IPDMRPT824']" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT824'].Items[0].Value"/>
      </div>
      <div class="flex align-center mrb10">
        <VDateTimeInput style="width: 336px" :readonly="readonly" class="mrr20" v-if="MASTERDATA['IPDMRPT913']" :label="MASTERDATA['IPDMRPT913']" v-model="MASTERDATA['IPDMRPT913'].Items[0].Value"/>
        <MdCheckBoxLabel @change="handleChange" :unset="true" :reverse="true" widthLabel="min-width: 65px;" v-if="MASTERDATA['IPDMRPT915']" :readonly="readonly" :data="MASTERDATA['IPDMRPT915']" />
        <template v-if="MASTERDATA['IPDMRPT915'].Items[0].Value">
          <div class="mrr20">{{__t2('Thời gian')}}:</div>
          <MdCheckBoxLabel v-if="MASTERDATA['IPDMRPT949']" widthLabel="min-width: 65px;" :unset="true" :reverse="true" :readonly="readonly" :data="MASTERDATA['IPDMRPT949']" />
        </template>
      </div>
      <div class="flex">
        <VAgeInput style="margin-right: 162px" :getyear="true" :DateOfBirth="DateOfBirth" :readonly="readonly" v-if="MASTERDATA['IPDMRPT826']" width="150px" :label="MASTERDATA['IPDMRPT826']" v-model="MASTERDATA['IPDMRPT826'].Items[0].Value"/>
        <VAgeInput :getyear="true" :DateOfBirth="DateOfBirth" :readonly="readonly" v-if="MASTERDATA['IPDMRPT923']" width="150px" :label="MASTERDATA['IPDMRPT923']" v-model="MASTERDATA['IPDMRPT923'].Items[0].Value"/>
      </div>
      <div v-if="MASTERDATA['IPDMRPT828']" class="flex align-center mrb10">
        <div style="width: 270px;" class="block mrr10">{{__label(MASTERDATA['IPDMRPT828'])}}:</div>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT828'].Items[0].Value"/>
      </div>
      <label v-if="MASTERDATA['IPDMRPT928']" class="block mrr10">{{__label(MASTERDATA['IPDMRPT928'])}}:</label>
      <div class="flex align-center">
        <div class="mrr20">{{__t2(MASTERDATA['IPDMRPT08'].ViName)}}</div>
        <div>
          <div class="flex align-center mrb10">
            <VNumberInput v-if="MASTERDATA['IPDMRPT09']" :readonly="readonly" class="input-para" v-model="MASTERDATA['IPDMRPT09'].Items[0].Value" :placeholder="__t('Nhập')"/>
            <div style="margin-left:10px; width: 150px">{{__t2(MASTERDATA['IPDMRPT09'].ViName)}}</div>
          </div>
          <div class="flex align-center mrb10">
            <VNumberInput v-if="MASTERDATA['IPDMRPT11']" :readonly="readonly" class="input-para" v-model="MASTERDATA['IPDMRPT11'].Items[0].Value" :placeholder="__t('Nhập')"/>
            <div style="margin-left:10px; width: 150px">{{__t2(MASTERDATA['IPDMRPT11'].ViName)}}</div>
          </div>
          <div class="flex align-center mrb10">
            <VNumberInput v-if="MASTERDATA['IPDMRPT13']" :readonly="readonly" class="input-para" v-model="MASTERDATA['IPDMRPT13'].Items[0].Value" :placeholder="__t('Nhập')"/>
            <div style="margin-left:10px; width: 150px">{{__t2(MASTERDATA['IPDMRPT13'].ViName)}}</div>
          </div>
          <div class="flex align-center">
            <VNumberInput v-if="MASTERDATA['IPDMRPT15']" :readonly="readonly" class="input-para" v-model="MASTERDATA['IPDMRPT15'].Items[0].Value" :placeholder="__t('Nhập')"/>
            <div style="margin-left:10px; width: 150px">{{__t2(MASTERDATA['IPDMRPT15'].ViName)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="box2">
      <md-input-text v-if="MASTERDATA['IPDMRPTTTYT2']" :showMiniLabel="true" :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTTTYT2']"/>
    </div>
    <div v-if="box3">
      <div :key="index" v-for="(code, index) in GroupCode">
        <template v-if="MASTERDATA[code]">
          <label>{{__label(MASTERDATA[code])}}</label>
          <md-input-text :hidelabel="true" :readonly="readonly" v-if="code === 'IPDMRPTNTDD' || code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
          <md-input-text :hidelabel="true" :readonly="readonly" v-else-if="code === 'IPDMRPTTIHO' || code === 'IPDMRPT830'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
          <md-input-text :hidelabel="true" :readonly="readonly" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
        </template>
      </div>
    </div>
    <div v-if="box4">
      <p v-if="MASTERDATA['IPDMRPT933']"><b>{{__label(MASTERDATA['IPDMRPT933'])}}</b></p>
      <p v-if="MASTERDATA['IPDMRPT934']"><b>{{__label(MASTERDATA['IPDMRPT934'])}}</b></p>
      <div class="bg-gray-2 mrb10" v-if="MASTERDATA['IPDMRPT934']">
        <div :key="index" v-for="(item, index) in MASTERDATA['IPDMRPT934'].Items">
          <label>{{__label(item)}}</label>
          <textarea-autosize :readonly="readonly" class="mrb10 form-control" rows="3" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="item.Value"/>
        </div>
      </div>
      <p v-if="MASTERDATA['IPDMRPT942']"><b>{{__label(MASTERDATA['IPDMRPT942'])}}</b></p>
      <div class="bg-gray-2 mrb10">
        <div :key="index" v-for="(code, index) in GroupCode2">
          <label v-if="MASTERDATA[code]">{{__label(MASTERDATA[code])}}</label>
          <textarea-autosize v-if="MASTERDATA[code]" :readonly="readonly" class="mrb10 form-control" rows="3" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA[code].Items[0].Value"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
import Customer from '@/services/IPD/Customer'
// import moment from 'moment'
export default {
  name: 'Gynecological2',
  props: ['box1', 'box2', 'box3', 'box4', 'MASTERDATA', 'readonly', 'DataSubmit', 'VisitId', 'VisitIdDrop'],
  components: {
    TblWithMasterData
  },
  data () {
    return {
      GroupCode: [
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPTTHKI',
        'IPDMRPTCOXK',
        'IPDMRPTTTNS',
        'IPDMRPT830'
      ],
      GroupCode2: [
        'IPDMRPT855',
        'IPDMRPT859',
        'IPDMRPT943',
        'IPDMRPT861',
        'IPDMRPT945'
      ],
      DateOfBirth: ''
    }
  },
  mounted () {
    this.changeData()
    this.getCustomer()
  },
  methods: {
    changeData () {
      if (this.MASTERDATA['IPDMRPTCXNC'] && this.MASTERDATA['IPDMRPTTTBA'] && this.MASTERDATA['IPDMRPTTTNS'] && this.MASTERDATA['IPDMRPT817'] && this.MASTERDATA['IPDMRPTCACQ']) {
        this.MASTERDATA['IPDMRPTCXNC'].ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
        this.MASTERDATA['IPDMRPTCXNC'].EnName = '4. Para-clinical laboratory tests to do'
        this.MASTERDATA['IPDMRPTTTBA'].ViName = '5. Tóm tắt bệnh án'
        this.MASTERDATA['IPDMRPTTTBA'].EnName = '5. Summary'
        this.MASTERDATA['IPDMRPTTTNS'].ViName = '+ Thận- Tiết niệu'
        this.MASTERDATA['IPDMRPTTTNS'].EnName = '+ Nephro-urological system'
        this.MASTERDATA['IPDMRPT817'].ViName = '3. Tiền sử sản phụ khoa'
        this.MASTERDATA['IPDMRPT817'].EnName = '3. Gynecological history'
        this.MASTERDATA['IPDMRPT830'].ViName = '+ Khác'
        this.MASTERDATA['IPDMRPT830'].EnName = '+ Others'
      }
    },
    getCustomer () {
      new Customer({noLoading: true}).find(this._VisitId).then(response => {
        if (response.DateOfBirth) {
          this.DateOfBirth = response.DateOfBirth.split('/')[2]
        }
      })
    },
    handleChange () {
      if (this.MASTERDATA['IPDMRPT949'] && this.MASTERDATA['IPDMRPT915']) {
        if (!this.MASTERDATA['IPDMRPT915'].Items[0].Value) {
          this.MASTERDATA['IPDMRPT949'].Items.forEach(e => {
            e.Value = ''
          })
        }
      }
    }
  }
}
</script>
