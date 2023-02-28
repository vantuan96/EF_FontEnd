<template>
  <div class="ClinicalBreastExamNote-Item" v-if="DataSubmit">
    <hr style="margin-top: 0px;"/>
    <div class="flex align-center mrb10">
      <div class="fw600 mrr5">Ngày khám:</div>
      <VDateTimePicker3
        :type="'date'"
        v-if="MASTERDATA['OPDPKLSV186']"
        :readonly="readonly"
        v-model="MASTERDATA['OPDPKLSV186'].Items[0].Value"
        class="select-boox mrr10"
        :format="vDateFormat"/>
      <div><b>Bác sĩ khám:</b> <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy" /></div>
    </div>
    <label>{{__label(MASTERDATA['OPDPKLSV1'])}}</label>
    <div class="flex align-center mrb10">
      <MdRadiosInput4 class="mrr10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV1']" v-model="MASTERDATA['OPDPKLSV1']"/>
      <div class="flex align-center" v-if="MASTERDATA['OPDPKLSV4'] && MASTERDATA['OPDPKLSV1'] && MASTERDATA['OPDPKLSV1'].Items[1].Value">
        <div class="mrr10"><b>{{__label(MASTERDATA['OPDPKLSV4'].Items[0])}}:</b></div>
        <div class="mrr40" :id="MASTERDATA['OPDPKLSV4'].Items[0].Code"><MDText :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV4'].Items[0].Value"/></div>
        <div class="mrr10"><b>{{__label(MASTERDATA['OPDPKLSV4'].Items[1])}}:</b></div>
        <div><VNumberInput :readonly="readonly" v-model="MASTERDATA['OPDPKLSV4'].Items[1].Value" /></div>
      </div>
    </div>
    <label>{{__label(MASTERDATA['OPDPKLSV7'])}}</label>
    <MdRadiosInput4 class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV7']" v-model="MASTERDATA['OPDPKLSV7']"/>
    <hr style="margin-top: 0px;"/>
    <label class="block-title">I. BIỂU HIỆN KHI KHÁM</label>
    <label>{{__label(MASTERDATA['OPDPKLSV10'])}}:</label>
    <div class="italic">Điền 2 phiếu nếu vị trí HAI BÊN</div>
    <MdRadiosInput4 class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV10']" v-model="MASTERDATA['OPDPKLSV10']"/>
    <div class="bg-gray-2 mrb10">
      <label>{{__label(MASTERDATA['OPDPKLSV16'])}}:</label>
      <MdRadiosInput4 :disabled="disabled2" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV16']" v-model="MASTERDATA['OPDPKLSV16']"/>
      <div v-if="MASTERDATA['OPDPKLSV16'] && MASTERDATA['OPDPKLSV16'].Items[1].Value" class="mrl20">
        <div class="flex align-center mrb10">
          <div class="mrr10 fw600">{{__label(MASTERDATA['OPDPKLSV19'])}}:</div>
          <MdRadiosInput4 :disabled="disabled2" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV19']" v-model="MASTERDATA['OPDPKLSV19']"/>
        </div>
        <div class="flex align-center mrb10">
          <div class="mrr10 fw600">{{__label(MASTERDATA['OPDPKLSV23'])}}:</div>
          <MdRadiosInput4 :disabled="disabled2" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV23']" v-model="MASTERDATA['OPDPKLSV23']"/>
        </div>
        <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV29']">
          <div class="mrr10 fw600" style="min-width: 235px;">{{__label(MASTERDATA['OPDPKLSV29'])}}:</div>
          <MdRadiosInput4 :disabled="disabled2" class="mrr10" :readonly="readonly" :indexs="[0, 1]" v-model="MASTERDATA['OPDPKLSV29']"/>
          <div class="fw600 mrr5" style="min-width: 61px;" v-if="MASTERDATA['OPDPKLSV29'].Items[0].Value || MASTERDATA['OPDPKLSV29'].Items[1].Value">{{__label(MASTERDATA['OPDPKLSV29'].Items[2])}}:</div>
          <MDText v-if="MASTERDATA['OPDPKLSV29'].Items[0].Value || MASTERDATA['OPDPKLSV29'].Items[1].Value" :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV29'].Items[2].Value"/>
        </div>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV166'])}}:</label>
      <MdRadiosInput4 :disabled="disabled2" class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV166']" v-model="MASTERDATA['OPDPKLSV166']"/>
      <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV166'] && MASTERDATA['OPDPKLSV166'].Items[1].Value">
        <MdRadiosInput4 :disabled="disabled2" class="mrr10" :indexs="[0, 1, 2, 3, 4, 5, 6, 7, 8]" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV169']" v-model="MASTERDATA['OPDPKLSV169']"/>
        <div class="fw600 mrr5" style="width: 240px;">{{__label(MASTERDATA['OPDPKLSV169'].Items[9])}}:</div>
        <MDText :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV169'].Items[9].Value"/>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV33'])}}:</label>
      <MdRadiosInput4 :disabled="disabled2" class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV33']" v-model="MASTERDATA['OPDPKLSV33']"/>
      <div class="mrb10" v-if="MASTERDATA['OPDPKLSV33'] && MASTERDATA['OPDPKLSV36'] && MASTERDATA['OPDPKLSV33'].Items[1].Value">
        <MdRadiosInput4 :disabled="disabled2" class="mrr10 mrb10" :indexs="[0, 1, 2, 3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV36']"/>
        <div class="flex align-center">
          <div class="fw600 mrr5" style="width: 100px;">{{__label(MASTERDATA['OPDPKLSV36'].Items[6])}}:</div>
          <MDText :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV36'].Items[6].Value"/>
        </div>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV44'])}}</label>
      <MdRadiosInput4 :disabled="disabled2" class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV44']" v-model="MASTERDATA['OPDPKLSV44']"/>
      <div class="mrb10" v-if="MASTERDATA['OPDPKLSV44'] && MASTERDATA['OPDPKLSV47'] && MASTERDATA['OPDPKLSV44'].Items[1].Value">
        <div class="flex align-center mrb10" id="OPDPKLSV1001">
          <MdRadiosInput4 :disabled="disabled2" :indexs="[0, 1]" :miniRadio="['OPDPKLSV48', 'OPDPKLSV49']" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV47']"/>
          <MdRadiosInput4 :disabled="disabled2" :indexs="[2, 3]" :miniRadio="['OPDPKLSV50', 'OPDPKLSV51']" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV47']"/>
          <MdRadiosInput4 :disabled="disabled2" :indexs="[4, 5, 6, 7, 8]" :miniRadio="['OPDPKLSV54', 'OPDPKLSV55', 'OPDPKLSV56']" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV47']"/>
        </div>
        <div class="flex align-center">
          <div class="fw600 mrr5" style="width: 100px;">{{__label(MASTERDATA['OPDPKLSV47'].Items[9])}}:</div>
          <MDText :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV47'].Items[9].Value"/>
        </div>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV58'])}}:</label>
      <MdRadiosInput4 :disabled="disabled2" class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV58']" v-model="MASTERDATA['OPDPKLSV58']"/>
      <div class="mrb10" v-if="MASTERDATA['OPDPKLSV58'] && MASTERDATA['OPDPKLSV61'] && MASTERDATA['OPDPKLSV58'].Items[1].Value">
        <div id="OPDPKLSV1000" class="flex align-center mrb10">
          <MdRadiosInput4 :disabled="disabled2" :indexs="[0, 1]" :miniRadio="['OPDPKLSV62']" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV61']"/>
          <MdRadiosInput4 :disabled="disabled2" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV190']"/>
        </div>
        <div class="flex align-center">
          <div class="fw600 mrr5" style="width: 100px;">{{__label(MASTERDATA['OPDPKLSV61'].Items[5])}}:</div>
          <MDText :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV61'].Items[5].Value"/>
        </div>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV68'])}}:</label>
      <MdRadiosInput4 :disabled="disabled2" class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV68']" v-model="MASTERDATA['OPDPKLSV68']"/>
      <div class="mrb10 mrl20" v-if="MASTERDATA['OPDPKLSV68'] && MASTERDATA['OPDPKLSV71'] && MASTERDATA['OPDPKLSV68'].Items[1].Value">
        <MdRadiosInput4 :disabled="disabled2" :indexs="[0, 1]" class="mrb10" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV71']"/>
        <div class="flex align-center" v-if="MASTERDATA['OPDPKLSV74'] && (MASTERDATA['OPDPKLSV71'].Items[0].Value || MASTERDATA['OPDPKLSV71'].Items[1].Value)">
          <div class="mrr5 fw600" style="min-width: 135px;">{{__label(MASTERDATA['OPDPKLSV74'])}}:</div>
          <MdRadiosInput4 :disabled="disabled2" class="mrr10" :readonly="readonly" :indexs="[0, 1]" v-model="MASTERDATA['OPDPKLSV74']"/>
        </div>
      </div>
      <div class="fw600 mrb10" v-if="MASTERDATA['OPDPKLSV68'] && MASTERDATA['OPDPKLSV68'].Items[1].Value">Ghi chú:</div>
      <MDText class="mrb10" v-if="MASTERDATA['OPDPKLSV68'] && MASTERDATA['OPDPKLSV74'] && MASTERDATA['OPDPKLSV68'].Items[1].Value" :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV74'].Items[2].Value"/>
      <label>{{__label(MASTERDATA['OPDPKLSV78'])}}:</label>
      <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV78']">
        <MdRadiosInput4 :disabled="disabled2" class="mrr10" :readonly="readonly" :indexs="[0, 1, 2]" v-model="MASTERDATA['OPDPKLSV78']"/>
        <div class="fw600 mrr5" style="min-width: 58px;">{{__label(MASTERDATA['OPDPKLSV78'].Items[3])}}:</div>
        <MDText :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV78'].Items[3].Value"/>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV83'])}}:</label>
      <MdRadiosInput4 :disabled="disabled2" class="mrb10" :readonly="readonly" v-if="MASTERDATA['OPDPKLSV83']" v-model="MASTERDATA['OPDPKLSV83']"/>
      <div class="mrb10" v-if="MASTERDATA['OPDPKLSV83'] && MASTERDATA['OPDPKLSV86'] && MASTERDATA['OPDPKLSV83'].Items[1].Value">
        <MdRadiosInput4 :disabled="disabled2" class="mrr10 mrb10" :indexs="[0, 1, 2, 3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV86']"/>
        <div class="flex align-center" v-if="MASTERDATA['OPDPKLSV86'].Items[5].Value">
          <div class="fw600 mrr5" style="width: 100px;">{{__label(MASTERDATA['OPDPKLSV86'].Items[6])}}:</div>
          <MDText :disabled="disabled2" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV86'].Items[6].Value"/>
        </div>
      </div>
      <label>{{__label(MASTERDATA['OPDPKLSV94'])}}</label>
      <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV94']">
        <MdRadiosInput4 :disabled="disabled2" class="mrr10" :readonly="readonly" :indexs="[0, 1]" v-model="MASTERDATA['OPDPKLSV94']"/>
        <div class="flex align-center" v-if="MASTERDATA['OPDPKLSV94'].Items[1].Value">
          <div class="fw600 mrr5" style="min-width: 58px;">{{__label(MASTERDATA['OPDPKLSV94'].Items[2])}}:</div>
          <MDText :disabled="disabled2" :id="MASTERDATA['OPDPKLSV94'].Items[2].Code" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV94'].Items[2].Value"/>
        </div>
      </div>
    </div>
    <label class="block-title">II. MÔ TẢ VỊ TRÍ</label>
    <label>{{__label(MASTERDATA['OPDPKLSV10'])}}:</label>
    <MdRadiosInput4 :readonly="readonly" v-if="MASTERDATA['OPDPKLSV10']" v-model="MASTERDATA['OPDPKLSV10']"/>
    <hr/>
    <div class="flex on-top" v-if="MASTERDATA['OPDPKLSV10'] && MASTERDATA['OPDPKLSV101'] && (MASTERDATA['OPDPKLSV10'].Items[0].Value || MASTERDATA['OPDPKLSV10'].Items[1].Value)">
      <div style="min-width: 50%!important;">
        <MdRadiosInput4 class="mrb10" :indexs="[0, 1, 2, 3, 4]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV101']"/>
        <MdRadiosInput4 class="mrb10" :indexs="[5, 6, 7, 8]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV101']"/>
        <div class="flex align-center mrb10">
          <MdRadiosInput4 style="min-width: 202px;" :indexs="[9]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV101']"/>
          <MDText style="width: 100px;" v-if="MASTERDATA['OPDPKLSV101'].Items[9].Value" :id="MASTERDATA['OPDPKLSV101'].Items[10].Code" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV101'].Items[10].Value"/>
        </div>
        <div class="flex align-center mrb10">
          <MdRadiosInput4 style="min-width: 202px;" :indexs="[11]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV101']"/>
          <VNumberInput :nonemargin="true" :readonly="readonly" :decimal="true" style="width: 100px;" v-if="MASTERDATA['OPDPKLSV101'].Items[11].Value" v-model="MASTERDATA['OPDPKLSV101'].Items[12].Value" />
          <div class="mrl5" v-if="MASTERDATA['OPDPKLSV101'].Items[11].Value">cm</div>
        </div>
        <div class="flex align-center mrb10">
          <MdRadiosInput4 style="min-width: 202px;" :indexs="[13]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV101']"/>
          <MDText style="width: 300px;" v-if="MASTERDATA['OPDPKLSV101'].Items[13].Value" :id="MASTERDATA['OPDPKLSV101'].Items[14].Code" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV101'].Items[14].Value"/>
        </div>
        <MdRadiosInput4 class="mrb10" :indexs="[15]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV101']"/>
      </div>
      <div style="min-width: 50%!important;">
        <VUpload2
          v-if="MASTERDATA['OPDPKLSV184'] && MASTERDATA['OPDPKLSV10']"
          code="OPDPKLSV185"
          :widthImg="'400px'"
          :readonly="readonly"
          :dataImg="MASTERDATA['OPDPKLSV184'].Items[0]"
          :index="[0, 1]"
          :bgImg="'static/PhieuKhamVu.png'"
          :class="MASTERDATA['OPDPKLSV10'].Items[1].Value ? '' : 'none'"
          :dataDropfile="dataDropfile"
          />
        <VUpload2
          v-if="MASTERDATA['OPDPKLSV184'] && MASTERDATA['OPDPKLSV10']"
          code="OPDPKLSV192"
          :widthImg="'400px'"
          :readonly="readonly"
          :dataImg="MASTERDATA['OPDPKLSV184'].Items[1]"
          :index="[2, 3]"
          :bgImg="'static/PhieuKhamVu2.png'"
          :class="MASTERDATA['OPDPKLSV10'].Items[0].Value ? '' : 'none'"
          :dataDropfile="dataDropfile"
          />
      </div>
    </div>
    <label class="block-title">III. TÓM TẮT <i class="fw100">Mô tả tất cả các dấu hiệu lâm sàng đã được đánh giá</i></label>
    <MDText class="mrb10" v-if="MASTERDATA['OPDPKLSV118']" :placeholder="__t('Nhập')" :readonly="readonly" rows="3" v-model="MASTERDATA['OPDPKLSV118'].Items[0].Value"/>
    <label class="block-title">IV. KẾT LUẬN</label>
    <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV120']">
      <!-- <MdRadiosInput4 class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV120']"/> -->
      <div class="fw600 mrr5" style="width: 63px">{{__label(MASTERDATA['OPDPKLSV120'].Items[1])}}:</div>
      <icd10 :readonly="readonly" class="full-width" v-model="MASTERDATA['OPDPKLSV120'].Items[1].Value"/>
    </div>
    <div class="bg-gray-2 mrb10">
      <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV123']">
        <MdRadiosInput4 :disabled="disabled" class="mrr5" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV123']"/>
        <div v-if="MASTERDATA['OPDPKLSV123'].Items[1].Value" class="mrr5 fw600">Lành tính; Sơ hoá - Sàng lọc lại trong vòng:</div>
        <VNumberInput v-if="MASTERDATA['OPDPKLSV123'].Items[1].Value" :disabled="disabled" :readonly="readonly" style="width: 120px;" class="mrr5" v-model="MASTERDATA['OPDPKLSV123'].Items[0].Value" />
        <div v-if="MASTERDATA['OPDPKLSV123'].Items[1].Value">năm</div>
      </div>
      <div class="flex align-center mrb10" v-if="MASTERDATA['OPDPKLSV125']">
        <MdRadiosInput4 :disabled="disabled" class="mrr5" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV125']"/>
        <div v-if="MASTERDATA['OPDPKLSV125'].Items[1].Value" class="mrr5 fw600">Tái khám sau:</div>
        <VNumberInput v-if="MASTERDATA['OPDPKLSV125'].Items[1].Value" :disabled="disabled" :readonly="readonly" style="width: 120px;" class="mrr5" :decimal="true" v-model="MASTERDATA['OPDPKLSV125'].Items[0].Value" />
        <div v-if="MASTERDATA['OPDPKLSV125'].Items[1].Value">tháng</div>
      </div>
      <MdRadiosInput4 :disabled="disabled" class="mrb10" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV127']"/>
      <div v-if="MASTERDATA['OPDPKLSV129']" class="mrb10 flex align-center">
        <MdRadiosInput4 class="mrr10" :disabled="disabled" :indexs="[4]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV129']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV129'].Items[4].Value" :indexs="[0, 1, 2, 3]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV129']"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV129'] && MASTERDATA['OPDPKLSV129'].Items[4].Value" class="mrl20 flex align-center mrb10">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" v-if="MASTERDATA['OPDPKLSV134']" :indexs="[2]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV134']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV134'] && MASTERDATA['OPDPKLSV134'].Items[2].Value" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV134']"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV129'] && MASTERDATA['OPDPKLSV129'].Items[4].Value" class="mrl20 flex align-center mrb10">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" v-if="MASTERDATA['OPDPKLSV137']" :indexs="[5]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV137']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV137'] && MASTERDATA['OPDPKLSV137'].Items[5].Value" :indexs="[0, 1, 2, 3, 4]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV137']"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV129'] && MASTERDATA['OPDPKLSV129'].Items[4].Value" class="mrl20 flex align-center mrb10">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" v-if="MASTERDATA['OPDPKLSV143']" :indexs="[2]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV143']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV143'] && MASTERDATA['OPDPKLSV143'].Items[2].Value" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV143']"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV129'] && MASTERDATA['OPDPKLSV129'].Items[4].Value" class="mrl20 flex align-center mrb10">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" v-if="MASTERDATA['OPDPKLSV146']" :indexs="[5]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV146']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV146'] && MASTERDATA['OPDPKLSV146'].Items[5].Value" :indexs="[0, 1, 2, 3, 4]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV146']"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV152']" class="mrb10 flex align-center">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV152']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV152'].Items[0].Value" :indexs="[1, 2, 3]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV152']"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV157']" class="mrb10 flex align-center">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV157']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV157'].Items[0].Value" :indexs="[1, 2]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV157']"/>
        <MDText :disabled="disabled" v-if="MASTERDATA['OPDPKLSV157'].Items[0].Value && MASTERDATA['OPDPKLSV157'].Items[2].Value" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV157'].Items[3].Value"/>
      </div>
      <div v-if="MASTERDATA['OPDPKLSV162']" class="mrb10 flex align-center">
        <MdRadiosInput4 :disabled="disabled" class="mrr10" :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV162']"/>
        <MdRadiosInput4 :disabled="disabled" class="mrr5" v-if="MASTERDATA['OPDPKLSV162'].Items[3].Value" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['OPDPKLSV162']"/>
        <MDText :disabled="disabled" v-if="MASTERDATA['OPDPKLSV162'].Items[3].Value && MASTERDATA['OPDPKLSV162'].Items[1].Value" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['OPDPKLSV162'].Items[2].Value"/>
      </div>
    </div>
    <table style="width: 100%">
      <tr>
        <th style="width: 66%; border: 0px!important;">
        </th>
        <!-- <th style="width: 33%; border: 0px!important;" class="text-center">
          <p>Chữ ký</p>
          <ad-Info v-if="DataSubmit.DoctorConfirm && DataSubmit.DoctorConfirm.UserName" :ad="DataSubmit.DoctorConfirm.UserName" />
          <div v-if="!DataSubmit.DoctorConfirmAt && !viewOnly"><button @click="showDoctorConfirm('Bác sĩ khám')" class="btn v-white-btn">Xác nhận</button></div>
        </th> -->
        <th style="width: 33%" class="text-center">
          <template v-if="DataSubmit.DoctorConfirmAt">
            <p class="text-center" style="font-weight: 100;">{{DataSubmit.DoctorConfirmAt | formatDateWithoutSecon}}</p>
            <eform-signature :ad="DataSubmit.DoctorConfirm.UserName" :title="'Chữ ký'" />
          </template>
          <div v-else>
            <p><b>Chữ ký</b></p>
            <i v-if="viewOnly" style="font-weight: 100;">{{__t('Chưa xác nhận')}}</i>
            <button v-if="!viewOnly && hasRole('CBENUCFOPD')" @click="showDoctorConfirm('Bác sĩ khám')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
          </div>
        </th>
      </tr>
    </table>
    <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdateBy" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
    <!-- footer -->
    <FloatBlock :openBack="true" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!readonly && hasRole('CBENUUPD')">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <doctor-confirm :popupTitle="popupTitle" @popupSave="popupSave"/>
  </div>
</template>

<script setup>
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import ClinicalBreastExamNote from '@/services/OPD/ClinicalBreastExamNote'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import _ from 'lodash'
export default {
  name: 'ClinicalBreastExamNoteItem',
  props: ['viewOnly', 'VisitId', 'formId'],
  mixins: [MixinMasterData],
  data () {
    return {
      icd10Code: ['OPDPKLSV122'],
      popupTitle: '',
      DataSubmit: null,
      DoctorConfirmAt: '',
      dataMaster: null,
      IsLocked: false
    }
  },
  watch: {
    formId: function (val) {
      if (val) {
        this._ItemId = val
        this.getData()
      }
    }
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    readonly () {
      return this.viewOnly || this.IsLocked || this.DoctorConfirmAt
    },
    disabled () {
      let check = false
      if (this.MASTERDATA['OPDPKLSV120'] && !this.MASTERDATA['OPDPKLSV120'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV123', 'OPDPKLSV125', 'OPDPKLSV127', 'OPDPKLSV129', 'OPDPKLSV152', 'OPDPKLSV157', 'OPDPKLSV162'])
        check = true
      }
      return check
    },
    disabled2 () {
      let check = false
      if (this.MASTERDATA['OPDPKLSV10'] && !this.MASTERDATA['OPDPKLSV10'].Items[0].Value && !this.MASTERDATA['OPDPKLSV10'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV16', 'OPDPKLSV166', 'OPDPKLSV33', 'OPDPKLSV44', 'OPDPKLSV58', 'OPDPKLSV68', 'OPDPKLSV78', 'OPDPKLSV83', 'OPDPKLSV94'])
        check = true
      }
      return check
    }
  },
  components: {
    DoctorConfirm,
    VDateTimePicker3
  },
  mounted () {
    this.getMasterDatas({Form: 'OPDPKLSV'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      new ClinicalBreastExamNote().find('A03_116_200520_V/' + this._VisitId + '/' + this._ItemId).then((res) => {
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: res.Id || res.ID
        }
        this.DataSubmit = res
        this.IsLocked = res.is_block_after_24h
        this.DoctorConfirmAt = res.DoctorConfirmAt
        this.mapData()
      }).catch((e) => {
        console.log(e)
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value || [], true)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      if (this.MASTERDATA['OPDPKLSV186'] && this.DataSubmit && this.DataSubmit.Datas && !this.DataSubmit.Datas.length) {
        this.MASTERDATA['OPDPKLSV186'].Items[0].Value = this.$options.filters.formatDate2(this.DataSubmit.CreatedAt)
      }
      this.dataMaster = JSON.stringify(this.MASTERDATA)
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    async handleSubmit (str) {
      await this.checkDataSubmit()
      await this.mapData2MDData()
      await this.validateForm()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      new ClinicalBreastExamNote().update('Update/A03_116_200520_V/' + this._VisitId + '/' + this._ItemId, DataSubmit).then((res) => {
        if (str !== 'confirm') {
          this.toastedSuccess()
        }
        this.reload()
      }).catch((e) => {
        if (str === 'confirm') {
          this.reload()
        }
      })
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'OPDPKLSV120':
          var currentValue = this.MASTERDATA['OPDPKLSV120'].Items[1].Value || ''
          this.MASTERDATA['OPDPKLSV120'].Items[1].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
          break
        default:
          break
      }
    },
    showDoctorConfirm (title) {
      this.popupTitle = title
      this.$modal.show('doctorConfirm')
    },
    popupSave (data) {
      this.ConfirmKyNhay(data)
    },
    ConfirmKyNhay (data) {
      if (!this.readonly && this.hasRole('CBENUUPD')) {
        this.handleSubmit('confirm')
      }
      new ClinicalBreastExamNote().update('Confirm/A03_116_200520_V/' + this._VisitId + '/' + this._ItemId, data).then(() => {
        // if (!this.readonly && this.hasRole('CBENUUPD')) {
        //   this.handleSubmit('confirm')
        // }
        this.scroll2Bottom()
        this.toastedSuccess()
      }).catch((e) => {
      })
    },
    checkDataSubmit () {
      if (this.MASTERDATA['OPDPKLSV1'] && !this.MASTERDATA['OPDPKLSV1'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV4'])
      }
      if (this.MASTERDATA['OPDPKLSV16'] && !this.MASTERDATA['OPDPKLSV16'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV19', 'OPDPKLSV23', 'OPDPKLSV29'])
      }
      if (this.MASTERDATA['OPDPKLSV29'] && !this.MASTERDATA['OPDPKLSV29'].Items[0].Value && !this.MASTERDATA['OPDPKLSV29'].Items[1].Value) {
        this.MASTERDATA['OPDPKLSV29'].Items[2].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV166'] && !this.MASTERDATA['OPDPKLSV166'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV169'])
      }
      if (this.MASTERDATA['OPDPKLSV58'] && !this.MASTERDATA['OPDPKLSV58'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV61', 'OPDPKLSV190'])
      }
      if (this.MASTERDATA['OPDPKLSV44'] && !this.MASTERDATA['OPDPKLSV44'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV47'])
      }
      if (this.MASTERDATA['OPDPKLSV68'] && !this.MASTERDATA['OPDPKLSV68'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV71'])
      }
      if (this.MASTERDATA['OPDPKLSV71'] && !this.MASTERDATA['OPDPKLSV71'].Items[0].Value && !this.MASTERDATA['OPDPKLSV71'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV74'])
      }
      if (this.MASTERDATA['OPDPKLSV94'] && !this.MASTERDATA['OPDPKLSV94'].Items[1].Value) {
        this.MASTERDATA['OPDPKLSV94'].Items[2].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV10'] && !this.MASTERDATA['OPDPKLSV10'].Items[0].Value && !this.MASTERDATA['OPDPKLSV10'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV16', 'OPDPKLSV166', 'OPDPKLSV33', 'OPDPKLSV44', 'OPDPKLSV58', 'OPDPKLSV68', 'OPDPKLSV78', 'OPDPKLSV83', 'OPDPKLSV94', 'OPDPKLSV101', 'OPDPKLSV184'])
      }
      if (this.MASTERDATA['OPDPKLSV10'] && this.MASTERDATA['OPDPKLSV184'] && !this.MASTERDATA['OPDPKLSV10'].Items[0].Value) {
        this.MASTERDATA['OPDPKLSV184'].Items[1].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV10'] && this.MASTERDATA['OPDPKLSV184'] && !this.MASTERDATA['OPDPKLSV10'].Items[1].Value) {
        this.MASTERDATA['OPDPKLSV184'].Items[0].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV101'] && !this.MASTERDATA['OPDPKLSV101'].Items[9].Value) {
        this.MASTERDATA['OPDPKLSV101'].Items[10].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV101'] && !this.MASTERDATA['OPDPKLSV101'].Items[11].Value) {
        this.MASTERDATA['OPDPKLSV101'].Items[12].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV101'] && !this.MASTERDATA['OPDPKLSV101'].Items[13].Value) {
        this.MASTERDATA['OPDPKLSV101'].Items[14].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV120'] && !this.MASTERDATA['OPDPKLSV120'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV123', 'OPDPKLSV125', 'OPDPKLSV127', 'OPDPKLSV129', 'OPDPKLSV152', 'OPDPKLSV157', 'OPDPKLSV162'])
      }
      if (this.MASTERDATA['OPDPKLSV123'] && !this.MASTERDATA['OPDPKLSV123'].Items[1].Value) {
        this.MASTERDATA['OPDPKLSV123'].Items[0].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV125'] && !this.MASTERDATA['OPDPKLSV125'].Items[1].Value) {
        this.MASTERDATA['OPDPKLSV125'].Items[0].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV152'] && !this.MASTERDATA['OPDPKLSV152'].Items[0].Value) {
        this.MASTERDATA['OPDPKLSV152'].Items[1].Value = false
        this.MASTERDATA['OPDPKLSV152'].Items[2].Value = false
        this.MASTERDATA['OPDPKLSV152'].Items[3].Value = false
      }
      if (this.MASTERDATA['OPDPKLSV157'] && !this.MASTERDATA['OPDPKLSV157'].Items[0].Value) {
        this.MASTERDATA['OPDPKLSV157'].Items[1].Value = false
        this.MASTERDATA['OPDPKLSV157'].Items[2].Value = false
      }
      if (this.MASTERDATA['OPDPKLSV157'] && !this.MASTERDATA['OPDPKLSV157'].Items[2].Value) {
        this.MASTERDATA['OPDPKLSV157'].Items[3].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV182'] && !this.MASTERDATA['OPDPKLSV182'].Items[0].Value) {
        this.MASTERDATA['OPDPKLSV182'].Items[1].Value = false
        this.MASTERDATA['OPDPKLSV182'].Items[2].Value = false
      }
      if (this.MASTERDATA['OPDPKLSV182'] && !this.MASTERDATA['OPDPKLSV182'].Items[2].Value) {
        this.MASTERDATA['OPDPKLSV182'].Items[3].Value = ''
      }
      if (this.MASTERDATA['OPDPKLSV86'] && !this.MASTERDATA['OPDPKLSV86'].Items[5].Value) {
        this.MASTERDATA['OPDPKLSV86'].Items[6].Value = ''
      }
      // Các xét nghiệm cần làm
      if (this.MASTERDATA['OPDPKLSV129'] && !this.MASTERDATA['OPDPKLSV129'].Items[4].Value) {
        this.MASTERDATA['OPDPKLSV129'].Items[0].Value = false
        this.MASTERDATA['OPDPKLSV129'].Items[1].Value = false
        this.MASTERDATA['OPDPKLSV129'].Items[2].Value = false
        this.MASTERDATA['OPDPKLSV129'].Items[3].Value = false
        this.handleClearData(['OPDPKLSV134', 'OPDPKLSV137', 'OPDPKLSV143', 'OPDPKLSV146'])
      }
      // Siêu âm vú
      if (this.MASTERDATA['OPDPKLSV134'] && !this.MASTERDATA['OPDPKLSV134'].Items[2].Value) {
        this.MASTERDATA['OPDPKLSV134'].Items[0].Value = false
        this.MASTERDATA['OPDPKLSV134'].Items[1].Value = false
      }
      // Sinh thiết
      if (this.MASTERDATA['OPDPKLSV137'] && !this.MASTERDATA['OPDPKLSV137'].Items[5].Value) {
        this.MASTERDATA['OPDPKLSV137'].Items[0].Value = false
        this.MASTERDATA['OPDPKLSV137'].Items[1].Value = false
        this.MASTERDATA['OPDPKLSV137'].Items[2].Value = false
        this.MASTERDATA['OPDPKLSV137'].Items[3].Value = false
        this.MASTERDATA['OPDPKLSV137'].Items[4].Value = false
      }
      // XN Gen
      if (this.MASTERDATA['OPDPKLSV143'] && !this.MASTERDATA['OPDPKLSV143'].Items[2].Value) {
        this.MASTERDATA['OPDPKLSV143'].Items[0].Value = false
        this.MASTERDATA['OPDPKLSV143'].Items[1].Value = false
      }
      // Các xét nghiệm khác
      if (this.MASTERDATA['OPDPKLSV146'] && !this.MASTERDATA['OPDPKLSV146'].Items[5].Value) {
        this.MASTERDATA['OPDPKLSV146'].Items[0].Value = false
        this.MASTERDATA['OPDPKLSV146'].Items[1].Value = false
        this.MASTERDATA['OPDPKLSV146'].Items[2].Value = false
        this.MASTERDATA['OPDPKLSV146'].Items[3].Value = false
        this.MASTERDATA['OPDPKLSV146'].Items[4].Value = false
      }
      if (this.MASTERDATA['OPDPKLSV33'] && !this.MASTERDATA['OPDPKLSV33'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV36'])
      }
      if (this.MASTERDATA['OPDPKLSV83'] && !this.MASTERDATA['OPDPKLSV83'].Items[1].Value) {
        this.handleClearData(['OPDPKLSV86'])
      }
    },
    handleClearData (listCode) {
      if (listCode && listCode.length) {
        listCode.forEach((code) => {
          this.MASTERDATA[code].Items.map((e, dex) => {
            if (e.DataType === 'Radio' || e.DataType === 'Checkbox') {
              e.Value = false
            } else {
              e.Value = ''
            }
          })
        })
      }
    },
    validateForm () {
      let errors = []
      if (this.getValueOfMASTERDATA2('OPDPKLSV1', 'OPDPKLSV3') && !this.getValueOfMASTERDATA2('OPDPKLSV4', 'OPDPKLSV5')) {
        errors.push(this.MASTERDATA['OPDPKLSV4'].Items[0])
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV44', 'OPDPKLSV46')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV48') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV49') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV50') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV51') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV52') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV53') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV54') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV55') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV47', 'OPDPKLSV56')) {
          const obj = {
            ViName: 'Có bị chảy dịch tự nhiên ở núm vú không?',
            EnName: 'Có bị chảy dịch tự nhiên ở núm vú không?',
            Code: 'OPDPKLSV1001'
          }
          errors.push(obj)
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV166', 'OPDPKLSV168')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV170') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV171') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV172') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV173') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV174') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV175') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV176') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV177') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV169', 'OPDPKLSV178')) {
          errors.push(this.MASTERDATA['OPDPKLSV169'])
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV58', 'OPDPKLSV60')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV61', 'OPDPKLSV62') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV61', 'OPDPKLSV63') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV190', 'OPDPKLSV191')) {
          const obj = {
            ViName: 'Đau vú',
            EnName: 'Đau vú',
            Code: 'OPDPKLSV1000'
          }
          errors.push(obj)
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV68', 'OPDPKLSV70')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV71', 'OPDPKLSV72') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV71', 'OPDPKLSV73')) {
          errors.push(this.MASTERDATA['OPDPKLSV71'])
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV33', 'OPDPKLSV35')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV36', 'OPDPKLSV37') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV36', 'OPDPKLSV38') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV36', 'OPDPKLSV39') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV36', 'OPDPKLSV40') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV36', 'OPDPKLSV41') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV36', 'OPDPKLSV42')) {
          errors.push(this.MASTERDATA['OPDPKLSV36'])
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV83', 'OPDPKLSV85')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV86', 'OPDPKLSV87') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV86', 'OPDPKLSV88') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV86', 'OPDPKLSV89') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV86', 'OPDPKLSV90') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV86', 'OPDPKLSV91') &&
          !this.getValueOfMASTERDATA2('OPDPKLSV86', 'OPDPKLSV92')) {
          errors.push(this.MASTERDATA['OPDPKLSV86'])
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV94', 'OPDPKLSV96')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV94', 'OPDPKLSV97')) {
          errors.push(this.MASTERDATA['OPDPKLSV94'].Items[2])
        }
      }
      if (this.getValueOfMASTERDATA2('OPDPKLSV101', 'OPDPKLSV111')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV101', 'OPDPKLSV112')) {
          errors.push(this.MASTERDATA['OPDPKLSV101'].Items[10])
        }
      }
      // if (this.getValueOfMASTERDATA2('OPDPKLSV101', 'OPDPKLSV113')) {
      //   if (!this.getValueOfMASTERDATA2('OPDPKLSV101', 'OPDPKLSV114')) {
      //     errors.push(this.MASTERDATA['OPDPKLSV101'].Items[12])
      //   }
      // }
      if (this.getValueOfMASTERDATA2('OPDPKLSV101', 'OPDPKLSV115')) {
        if (!this.getValueOfMASTERDATA2('OPDPKLSV101', 'OPDPKLSV116')) {
          errors.push(this.MASTERDATA['OPDPKLSV101'].Items[14])
        }
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    }
  }
}
</script>
<style scoped>
.error {
  border: 1px solid red!important;
}
</style>
