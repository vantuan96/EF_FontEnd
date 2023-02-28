<template>
  <div v-if="loaded">
    <div v-if="NeedNew">
      <div class="text-center">
        <p v-if="!IsLocked">{{__t('Chưa có PROM bệnh nhân suy tim')}}</p>
        <div v-else class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked && hasRole(roleCreate)">{{__t('Tạo mới')}}</button>
      </div>
    </div>
    <div v-else>
    <h3 class="text-center font16 textUppercase mb-5">{{__t('Bộ câu hỏi về chất lượng cuộc sống của kanas city (KCCQ-12)')}}</h3>
    <h3 class="text-center font16 italic mt-5">({{__t('Áp dụng đối với người bệnh suy tim')}})</h3>
    <div class="title mt-20">
      <div class="row">
        <div class="col-md-4">
          <div v-if="DataSubmit" class="flex-box flex-center" style="transform: translateY(5px)">
            <label class="display-inline ml-5 mr-5" style="font-weight: bold; margin-bottom: 0">{{__t('Người đánh giá prom')}}:</label>
            <div class="search-name">
              <ad-Info :ad="CreatedBy" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div v-if="DataSubmit" class="flex-box flex-center mb-10">
            <label class="display-inline ml-5 mr-5" style="font-weight: bold">{{__t('Tạo lúc prom')}}:</label>
            <div class="search-name" style="transform: translateY(-3px);">
              <VDateTimePicker :readonly="true" :hideTooltip="false" class="display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="CreatedAt"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Block-1 -->
    <div class="tbl-title">I. {{__t('Đánh giá')}}</div>
    <table class="table v-table-1 no-margin col-1-1" id="block1">
      <tr>
        <td style="padding-top: 20px;" v-if="MASTERDATA['PROMFHFTHTQ']">
        <p v-html="$t('Trong vòng 2 tuần vừa qua, suy tim đã hạn chế/ ảnh hưởng đến khả năng thực hiện các hoạt động sau đây ở mức độ như thế nào?')"></p>
          <table>
            <tr class="text-center">
              <td style="width:260px" class="text-center">{{__t('Hoạt động')}}</td>
              <td style="width:155px">{{__t('Hạn chế rất nhiều')}}</td>
              <td style="width:155px">{{__t('Hạn chế nhiều')}}</td>
              <td style="width:155px">{{__t('Hạn chế vừa')}}</td>
              <td style="width:155px">{{__t('Hạn chế một chút')}}</td>
              <td style="width:155px">{{__t('Không hạn chế')}}</td>
              <td style="width:155px">{{__t('Hạn chế vì lý do khác hoặc là tôi không làm hoạt động này')}}</td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFTHTQ']">
              <td>{{__label(MASTERDATA['PROMFHFTHTQ'])}}</td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFTHTQ'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFTHTQ-' + index" v-model="MASTERDATA['PROMFHFTHTQ'].Items[index].Value">
                    <label :for="'PROMFHFTHTQ-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFTHTQ'].Items, MASTERDATA['PROMFHFTHTQ'].Items[index]), caculateKCCQ12(MASTERDATA['PROMFHFTHTQ'].Items[index], 'Batthing')">{{__label(MASTERDATA['PROMFHFTHTQ'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFTHTQ'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFDB200M']">
              <td>{{__label(MASTERDATA['PROMFHFDB200M'])}}</td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFDB200M'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFDB200M-' + index" v-model="MASTERDATA['PROMFHFDB200M'].Items[index].Value">
                    <label :for="'PROMFHFDB200M-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFDB200M'].Items, MASTERDATA['PROMFHFDB200M'].Items[index]), caculateKCCQ12(MASTERDATA['PROMFHFDB200M'].Items[index], 'Walking')">{{__label(MASTERDATA['PROMFHFDB200M'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFDB200M'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFCBHCN']">
              <td>{{__label(MASTERDATA['PROMFHFCBHCN'])}}</td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCBHCN'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFCBHCN-' + index" v-model="MASTERDATA['PROMFHFCBHCN'].Items[index].Value">
                    <label :for="'PROMFHFCBHCN-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFCBHCN'].Items, MASTERDATA['PROMFHFCBHCN'].Items[index]), caculateKCCQ12(MASTERDATA['PROMFHFCBHCN'].Items[index], 'Jogging')">{{__label(MASTERDATA['PROMFHFCBHCN'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCBHCN'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFCHDGT']">
              <td>{{__label(MASTERDATA['PROMFHFCHDGT'])}}</td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCHDGT'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFCHDGT-' + index" v-model="MASTERDATA['PROMFHFCHDGT'].Items[index].Value">
                    <label :for="'PROMFHFCHDGT-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFCHDGT'].Items, MASTERDATA['PROMFHFCHDGT'].Items[index]), caculatePoint2(MASTERDATA['PROMFHFCHDGT'].Items[index], 'PROMFHFCHDGT')">{{__label(MASTERDATA['PROMFHFCHDGT'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCHDGT'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFCHDGTDLHCVLV']">
              <td>{{__label(MASTERDATA['PROMFHFCHDGTDLHCVLV'])}}</td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFCHDGTDLHCVLV-' + index" v-model="MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items[index].Value">
                    <label :for="'PROMFHFCHDGTDLHCVLV-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items, MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items[index]), caculatePoint2(MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items[index], 'PROMFHFCHDGTDLHCVLV')">{{__label(MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFDTBBNT']">
              <td>{{__label(MASTERDATA['PROMFHFDTBBNT'])}}</td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFDTBBNT'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFDTBBNT-' + index" v-model="MASTERDATA['PROMFHFDTBBNT'].Items[index].Value">
                    <label :for="'PROMFHFDTBBNT-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFDTBBNT'].Items, MASTERDATA['PROMFHFDTBBNT'].Items[index]), caculatePoint2(MASTERDATA['PROMFHFDTBBNT'].Items[index], 'PROMFHFDTBBNT')">{{__label(MASTERDATA['PROMFHFDTBBNT'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFDTBBNT'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- block2 -->
    <table class="table v-table-1 no-margin col-1-1 mt-20" id="block2">
      <tr>
        <td style="padding-top: 20px;" v-if="MASTERDATA['PROMFHFCBNL']">
          <p class="text-bold">2. {{__t('Trong vòng 2 tuần qua')}},</p>
          <table>
            <tr class="text-center">
              <td style="width:260px" class="text-center"></td>
              <td style="width:186px">{{__t('Hàng ngày')}}</td>
              <td style="width:186px">{{__t('Từ 3 lần/tuần nhưng không phải hàng ngày')}}</td>
              <td style="width:186px">{{__t('1-2 lần/tuần')}}</td>
              <td style="width:186px">{{__t('Ít hơn 1 lần/tuần')}}</td>
              <td style="width:186px">{{__t('Không bị 2 tuần vừa qua')}}</td>
              <!-- <td style="width:155px">{{__t('Hạn chế vì lý do khác hoặc là tôi không làm hoạt động này')}}</td> -->
            </tr>
            <tr v-if="MASTERDATA['PROMFHFCBNL']">
              <td v-html="$t('Có bao nhiêu lần ông/bà bị sưng/phù ở bàn chân/mắt cá chân hoặc cẳng chân vào buổi sáng?')"></td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCBNL'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFCBNL-' + index" v-model="MASTERDATA['PROMFHFCBNL'].Items[index].Value">
                    <label :for="'PROMFHFCBNL-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFCBNL'].Items, MASTERDATA['PROMFHFCBNL'].Items[index]), caculatePoint4(MASTERDATA['PROMFHFCBNL'].Items[index], 'PROMFHFCBNL')">{{__label(MASTERDATA['PROMFHFCBNL'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCBNL'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFCBNLPNG']">
              <td v-html="$t('Có bao nhiều lần ông/bà phải ngủ ngồi hoặc phải gối cao đầu (3 gối) để ngủ vì tình trạng khó thở?')"></td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCBNLPNG'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFCBNLPNG-' + index" v-model="MASTERDATA['PROMFHFCBNLPNG'].Items[index].Value">
                    <label :for="'PROMFHFCBNLPNG-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFCBNLPNG'].Items, MASTERDATA['PROMFHFCBNLPNG'].Items[index]), caculatePoint4(MASTERDATA['PROMFHFCBNLPNG'].Items[index], 'PROMFHFCBNLPNG')">{{__label(MASTERDATA['PROMFHFCBNLPNG'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFCBNLPNG'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- block3 -->
    <table class="table v-table-1 no-margin col-1-1 mt-20" id="block2">
      <tr>
        <td style="padding-top: 20px;" v-if="MASTERDATA['PROMFHFCBNL']">
          <p class="text-bold">3. {{__t('Trong vòng 2 tuần qua')}},</p>
          <table>
            <tr class="text-center">
              <td style="width:260px" class="text-center"></td>
              <td style="width:132.8px">{{__t('Luôn luôn')}}</td>
              <td style="width:132.8px">{{__t('Vài lần/ngày')}}</td>
              <td style="width:132.8px">{{__t('Ít nhất 1 lần/ngày')}}</td>
              <td style="width:132.8px">{{__t('Từ 3 lần/tuần nhưng không phải hàng ngày')}}</td>
              <td style="width:132.8px">{{__t('1-2 lần/tuần')}}</td>
              <td style="width:132.8px">{{__t('Ít hơn 1 lần/tuần')}}</td>
              <td style="width:132.8px">{{__t('Không diễn ra trong 2 tuần qua')}}</td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFTTMM']">
              <td v-html="$t('Có bao nhiêu lần tình trạng mệt mỏi khiến ông/bà không thể làm việc mình muốn?')"></td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFTTMM'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFTTMM-' + index" v-model="MASTERDATA['PROMFHFTTMM'].Items[index].Value">
                    <label :for="'PROMFHFTTMM-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFTTMM'].Items, MASTERDATA['PROMFHFTTMM'].Items[index]), caculatePoint4(MASTERDATA['PROMFHFTTMM'].Items[index], 'PROMFHFTTMM')">{{__label(MASTERDATA['PROMFHFTTMM'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFTTMM'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFLVMM']">
              <td v-html="$t('Trung bình có bao nhiêu lần tình trạng khó thở khiến ông/bà không thể làm việc mình muốn')"></td>
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFLVMM'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFLVMM-' + index" v-model="MASTERDATA['PROMFHFLVMM'].Items[index].Value">
                    <label :for="'PROMFHFLVMM-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFLVMM'].Items, MASTERDATA['PROMFHFLVMM'].Items[index]), caculatePoint4(MASTERDATA['PROMFHFLVMM'].Items[index], 'PROMFHFLVMM')">{{__label(MASTERDATA['PROMFHFLVMM'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFLVMM'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- block4 -->
    <table class="table v-table-1 no-margin col-1-1 mt-20" id="block2">
      <tr>
        <td style="padding-top: 20px;" v-if="MASTERDATA['PROMFHFTTSTAH']">
          <p v-html="$t('Trong vòng 2 tuần qua, tình trạng suy tim đã hạn chế ông/bà tận hưởng cuộc sống ở mức độ nào?')"></p>
          <table>
            <tr class="text-center">
              <!-- <td style="width:260px" class="text-center"></td> -->
              <td v-html="$t('Hạn chế rất nhiều 4')" style="width:238px"></td>
              <td v-html="$t('Hạn chế nhiều 4')" style="width:238px"></td>
              <td v-html="$t('Hạn chế vừa 4')" style="width:238px"></td>
              <td v-html="$t('Hạn chế một chút 4')" style="width:238px"></td>
              <td v-html="$t('Không hạn chế 4')" style="width:238px"></td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFTTSTAH']">
              <!-- <td>{{__label(MASTERDATA['PROMFHFTTSTAH'])}}</td> -->
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFTTSTAH'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFTTSTAH-' + index" v-model="MASTERDATA['PROMFHFTTSTAH'].Items[index].Value">
                    <label :for="'PROMFHFTTSTAH-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFTTSTAH'].Items, MASTERDATA['PROMFHFTTSTAH'].Items[index]), caculatePoint3(MASTERDATA['PROMFHFTTSTAH'].Items[index], 'PROMFHFTTSTAH')">{{__label(MASTERDATA['PROMFHFTTSTAH'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFTTSTAH'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!-- block5 -->
    <table class="table v-table-1 no-margin col-1-1 mt-20 mb-20" id="block2">
      <tr>
        <td style="padding-top: 20px;" v-if="MASTERDATA['PROMFHFSCDVST']">
          <p v-html="$t('Nếu phải sống cả đời với tình trạng suy tim như hiện tại thì ông/bà sẽ cảm thấy như thế nào?')"></p>
          <table>
            <tr class="text-center">
              <!-- <td style="width:260px" class="text-center"></td> -->
              <td style="width:238px">{{__t('Hoàn toàn thất vọng')}}</td>
              <td style="width:238px">{{__t('Khá thất vọng')}}</td>
              <td style="width:238px">{{__t('Khá hài lòng')}}</td>
              <td style="width:238px">{{__t('Rất hài lòng')}}</td>
              <td style="width:238px">{{__t('Hoàn toàn hài lòng')}}</td>
            </tr>
            <tr v-if="MASTERDATA['PROMFHFSCDVST']">
              <td v-if="!isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFSCDVST'].Items" :key="index">
                <div class="group-radio full-width">
                  <span>
                    <input type="checkbox" :id="'PROMFHFSCDVST-' + index" v-model="MASTERDATA['PROMFHFSCDVST'].Items[index].Value">
                    <label :for="'PROMFHFSCDVST-' + index" @click="checkbox2Radio(MASTERDATA['PROMFHFSCDVST'].Items, MASTERDATA['PROMFHFSCDVST'].Items[index]), caculatePoint3(MASTERDATA['PROMFHFSCDVST'].Items[index], 'PROMFHFSCDVST')">{{__label(MASTERDATA['PROMFHFSCDVST'].Items[index])}}</label>
                  </span>
                </div>
              </td>
              <td class="text-center" v-if="isReadOnly" v-for="(item, index) in MASTERDATA['PROMFHFSCDVST'].Items" :key="index">
                <b class="el-radio-view-new" :data="item" :key="index" v-if="checkString(item.DataType, (DataType || 'Radio')) && item.Value">
                  <span>{{__t(item.ViName)}}</span>
                </b>
                <b v-else></b>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="tbl-title">II. {{__t('Kết luận 4')}}</div>
    <!-- kết luận -->
    <table class="table v-table-1 no-margin col-1-1 mt-20" id="block2">
      <tr>
        <td>
          <table>
            <tr>
              <td style="width:90%">{{__t('Điểm đánh giá tần suất xuất hiện triệu chứng (KCCQ12-SF)')}}</td>
              <!-- KCCQ12-SF -->
              <td style="width:200px" class="text-center">{{totalPoint4}}</td>
            </tr>
            <tr>
              <td colspan="2" style="width:90%">
                <div class="flex">
                 <div class="w250 text-bold"><p>&rArr;<b> {{__t('Đề xuất hành động can thiệp')}}</b>:</p></div>
                  <div class="ml-5 italic">{{__t(messageWarning1)}}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="width:90%">{{__t('Điểm đánh giá Chất lượng sống (KCCQ12-QL)')}}</td>
              <td style="width:200px" class="text-center">{{totalPoint3}}</td>
            </tr>
            <tr>
              <td colspan="2" style="width:90%">
                <div class="flex">
                 <div class="w250 text-bold"><p>&rArr;<b> {{__t('Đề xuất hành động can thiệp')}}</b>:</p></div>
                  <div class="ml-5 italic">{{__t(messageWarning2)}}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="width:90%">{{__t('Điểm đánh giá khả năng hạn chế thể lực (KCCQ12-PL)')}}</td>
              <td style="width:200px" class="text-center">{{totalPoint1}}</td>
            </tr>
            <tr>
              <td style="width:90%">{{__t('Điểm đánh giá hạn chế về mặt xã hội (KCCQ12-SL)')}}</td>
              <td style="width:200px" class="text-center">{{totalPoint2}}</td>
            </tr>
            <tr>
              <td colspan="2" style="width:90%">
                <div class="flex">
                 <div class="w250 text-bold"><p>&rArr;<b> {{__t('Đề xuất hành động can thiệp')}}</b>:</p></div>
                  <div class="ml-5 italic">{{__t(messageWarning3)}}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-bold" style="width:90%">{{__t('Tổng điểm chất lượng cuộc sống - KCCQ12')}}</td>
              <td style="width:200px" class="text-center">{{totalPoint5}}</td>
            </tr>
             <tr>
              <!-- <td style="width:100%">{{__t('Đề xuất hành động BS cần can thiệp')}}</td> -->
            </tr>
          </table>
          <!-- <p>{{__t('Đề xuất hành động BS cần can thiệp')}}</p> -->
        </td>
      </tr>
    </table>
    <!-- <table class="table v-table-1 no-margin col-1-1 mt-20 mb-20" id="block2">
      <tr>
        <td v-if="MASTERDATA['PROMFHFSCDVST']">
          <p style="padding-top: 10px;" class="text-bold">{{__t('Đề xuất hành động BS cần can thiệp 4')}}</p>
          <table>
            <tr>
              <td v-if="point4 < 50" style="width:1190px">{{__t('BS cần điều chỉnh liều lợi tiểu và đánh giá nguyên nhân gây nguy cơ suy tim mất bù nếu có')}}</td>
            </tr>
            <tr>
              <td v-if="point3 < 50" style="width:1190px">{{__t('BS cần xem xét lại tất cả các nguyên nhân thực tế có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Bs Tâm lý/ tâm thần')}}</td>
            </tr>
            <tr>
              <td v-if="point1 < 50 && point2 < 50" style="width:1190px">{{__t('BS xem xét lại tất cả các nguyên nhân thực thể có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Phục hồi chức năng, Khám Tâm lý/ tâm thần')}}</td>
            </tr>
            <tr>
              <td v-if="checkResult" style="width:1190px">{{__t('Kết quả bình thường')}}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table> -->
     <div v-if="DataSubmit.UserConfirm" class="row text-center mt-10">
          <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.UserConfirm.UserName">
            <div style="font-weight: normal">{{DataSubmit.UserConfirmAt | formatDateHourMinutesDDMMYYY}}</div>
            <eform-signature
              :ad="DataSubmit.UserConfirm.UserName"
              :title="__t('Bác sĩ/ Điều dưỡng')"
            />
          </div>
          <div class="col-md-6 col-md-offset-6" v-else>
            <p class="mb-10">
              <b>{{ __t('Bác sĩ/ Điều dưỡng') }}</b>
            </p>
            <i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i>
            <button v-else-if="!isReadOnly && hasRole(roleConfirm)" @click="showDoctorConfirm('Doctor', 'Bác sĩ/ Điều dưỡng')" class="btn v-white-btn">
              {{ __t('Xác nhận') }}
            </button>
          </div>
        </div>
      <div>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt | formatDateHourMinutesDDMMYYY}}</p>
      </div>
    <!-- footer -->
    <FloatBlock @handleBack='handleBack()' :openBack="true">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!isReadOnly && hasRole(roleSubmit)">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
  </div>
  </div>

</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import PROMForHeartFailureService from '@/services/OPD/PROMForHeartFailure'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import _ from 'lodash'

export default {
  props: ['viewOnly', 'VisitId', 'VisitType', 'checkType'],
  mixins: [MixinForm, MixinMasterData],
  components: {
    VDateTimePicker,
    DoctorConfirm
  },
  data () {
    return {
      NeedNew: false,
      Type: 'IPD',
      DataSubmit: {},
      checkEdited: false,
      CreatedAt: '',
      CreatedBy: '',
      MASTERDATA: {},
      dataMaster: {},
      popupTitle: '',
      TypeConfirm: '',
      DataType: 'Radio',
      IsLocked: false,
      loaded: false,
      count1: 0,
      count2: 0,
      BathingPoint: 0,
      WalkingPoint: 0,
      JoggingPoint: 0,
      totalPoint1: 'N/A',
      totalPoint2: 'N/A',
      totalPoint3: 'N/A',
      totalPoint4: 'N/A',
      totalPoint5: 'N/A',
      point1: 0,
      point2: 0,
      point3: 0,
      point4: 0,
      HobbiesPoint: 0,
      WorkingPoint: 0,
      VisitingPoint: 0,
      point31: 0,
      point32: 0,
      point41: 0,
      point42: 0,
      point43: 0,
      point44: 0,
      roleConfirm: '',
      roleSubmit: '',
      roleCreate: '',
      checkResult: false,
      IsLockedUser: false,
      messageWarning1: '',
      messageWarning2: '',
      messageWarning3: ''
    }
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.VisitType) {
      this.Type = this.VisitType
    } else {
      var VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
      this.Type = VisitTypeGroupCode.meta.VisitTypeGroupCode
    }
    this.roleConfirm = this.Type === 'IPD' ? 'IPDPFFCMMF' : 'OPDPFFCMMF'
    this.roleSubmit = this.Type === 'IPD' ? 'IPDPFFUMM' : 'OPDPFFUMM'
    this.roleCreate = this.Type === 'IPD' ? 'IPDPFFCMM' : 'OPDPFFCMM'
    this.getMasterDatas({Form: 'PROMFHF'}, () => {
      this.getData()
      this.getDataInfo()
      // this.DataSubmit = {
      //   CreatedAt: new Date(),
      //   CreatedBy: this.$store.getters.currentUser.Name
      // }
    })
  },
  computed: {
    isReadOnly: function () {
      if (this.DataSubmit.IsCheckUnlockConfirm) {
        return this.viewOnly || this.DataSubmit.UserConfirm.UserName
      } else {
        return this.viewOnly || this.IsLocked || this.DataSubmit.UserConfirm.UserName || this.$store.state.account.Username !== this.CreatedBy
      }
      // return false
    }
    // isReadOnly: function () {
    //   return this.viewOnly || this.IsLocked || this.DataSubmit.UserConfirm.UserName || this.IsLockedUser
    // }
  },
  methods: {
    // checkUnlockUser () {
    //   if (this.IsLocked)
    // },
    caculateKCCQ12 (item, code) {
      this.count1 = 0
      // tắm
      if (item) {
        if (code === 'Batthing') {
          this.BathingPoint = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'Walking') {
          this.WalkingPoint = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'Jogging') {
          this.JoggingPoint = !item.Value ? parseInt(item.ViName) : 0
        }
      } else {
        const BatthingList = this.MASTERDATA['PROMFHFTHTQ'] ? this.MASTERDATA['PROMFHFTHTQ'].Items : []
        for (let i = 0; i < BatthingList.length; i++) {
          if (BatthingList[i].Value) {
            this.BathingPoint = parseInt(BatthingList[i].ViName)
          }
        }
        // đi bộ
        const WalkingList = this.MASTERDATA['PROMFHFDB200M'] ? this.MASTERDATA['PROMFHFDB200M'].Items : []
        for (let i = 0; i < WalkingList.length; i++) {
          if (WalkingList[i].Value) {
            this.WalkingPoint = parseInt(WalkingList[i].ViName)
          }
        }
        // chạy bộ
        const JoggingList = this.MASTERDATA['PROMFHFCBHCN'] ? this.MASTERDATA['PROMFHFCBHCN'].Items : []
        for (let i = 0; i < JoggingList.length; i++) {
          if (JoggingList[i].Value) {
            this.JoggingPoint = parseInt(JoggingList[i].ViName)
          }
        }
      }
      if (this.BathingPoint === 6) {
        this.count1++
      }
      if (this.WalkingPoint === 6) {
        this.count1++
      }
      if (this.JoggingPoint === 6) {
        this.count1++
      }
      if (this.count1 > 1) {
        this.totalPoint1 = 'N/A'
      } else {
        if (this.BathingPoint === 0 && this.WalkingPoint === 0 && this.JoggingPoint === 0) {
          this.totalPoint1 = 'N/A'
        } else {
          var p1 = this.BathingPoint === 6 ? 0 : this.BathingPoint
          var p2 = this.WalkingPoint === 6 ? 0 : this.WalkingPoint
          var p3 = this.JoggingPoint === 6 ? 0 : this.JoggingPoint
          this.totalPoint1 = (((((p1 + p2 + p3) / 3 - 1) / 4) * 100).toFixed(2)).toString()
        }
      }
      this.caculatePoint5()
    },
    caculatePoint2 (item, code) {
      this.count2 = 0
      if (item) {
        if (code === 'PROMFHFCHDGT') {
          this.HobbiesPoint = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'PROMFHFCHDGTDLHCVLV') {
          this.WorkingPoint = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'PROMFHFDTBBNT') {
          this.VisitingPoint = !item.Value ? parseInt(item.ViName) : 0
        }
      } else {
        const HobbiesList = this.MASTERDATA['PROMFHFCHDGT'] ? this.MASTERDATA['PROMFHFCHDGT'].Items : []
        for (let i = 0; i < HobbiesList.length; i++) {
          if (HobbiesList[i].Value) {
            this.HobbiesPoint = parseInt(HobbiesList[i].ViName)
          }
        }
        const WorkingList = this.MASTERDATA['PROMFHFCHDGTDLHCVLV'] ? this.MASTERDATA['PROMFHFCHDGTDLHCVLV'].Items : []
        for (let i = 0; i < WorkingList.length; i++) {
          if (WorkingList[i].Value) {
            this.WorkingPoint = parseInt(WorkingList[i].ViName)
          }
        }
        const VisitingList = this.MASTERDATA['PROMFHFDTBBNT'] ? this.MASTERDATA['PROMFHFDTBBNT'].Items : []
        for (let i = 0; i < VisitingList.length; i++) {
          if (VisitingList[i].Value) {
            this.VisitingPoint = parseInt(VisitingList[i].ViName)
          }
        }
      }
      if (this.HobbiesPoint === 6) {
        this.count2++
      }
      if (this.WorkingPoint === 6) {
        this.count2++
      }
      if (this.VisitingPoint === 6) {
        this.count2++
      }
      if (this.count2 > 1) {
        this.totalPoint2 = 'N/A'
      } else {
        if (this.HobbiesPoint === 0 && this.WorkingPoint === 0 && this.VisitingPoint === 0) {
          this.totalPoint2 = 'N/A'
        } else {
          var p1 = this.HobbiesPoint === 6 ? 0 : this.HobbiesPoint
          var p2 = this.WorkingPoint === 6 ? 0 : this.WorkingPoint
          var p3 = this.VisitingPoint === 6 ? 0 : this.VisitingPoint
          this.totalPoint2 = (((((p1 + p2 + p3) / 3 - 1) / 4) * 100).toFixed(2)).toString()
          // this.totalPoint2 = (100 * (((this.HobbiesPoint + this.WorkingPoint + this.VisitingPoint) / 3 - 1) / 4).toFixed(2)).toString()
        }
      }
      this.caculatePoint5()
    },
    caculatePoint3 (item, code) {
      if (item) {
        if (code === 'PROMFHFTTSTAH') {
          this.point31 = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'PROMFHFSCDVST') {
          this.point32 = !item.Value ? parseInt(item.ViName) : 0
        }
      } else {
        const point31List = this.MASTERDATA['PROMFHFTTSTAH'] ? this.MASTERDATA['PROMFHFTTSTAH'].Items : []
        for (let i = 0; i < point31List.length; i++) {
          if (point31List[i].Value) {
            this.point31 = parseInt(point31List[i].ViName)
          }
        }
        const point32List = this.MASTERDATA['PROMFHFSCDVST'] ? this.MASTERDATA['PROMFHFSCDVST'].Items : []
        for (let i = 0; i < point32List.length; i++) {
          if (point32List[i].Value) {
            this.point32 = parseInt(point32List[i].ViName)
          }
        }
      }
      if (this.point31 === 0 && this.point32 === 0) {
        this.totalPoint3 = 'N/A'
      } else {
        this.totalPoint3 = (((((this.point31 + this.point32) / 2 - 1) / 4) * 100).toFixed(2)).toString()
        // this.totalPoint3 = (100 * (((this.point31 + this.point32) / 2 - 1) / 4).toFixed(2)).toString()
      }
      this.caculatePoint5()
    },
    // KCCQ12-SF
    caculatePoint4 (item, code) {
      if (item) {
        if (code === 'PROMFHFCBNL') {
          this.point41 = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'PROMFHFCBNLPNG') {
          this.point42 = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'PROMFHFTTMM') {
          this.point43 = !item.Value ? parseInt(item.ViName) : 0
        }
        if (code === 'PROMFHFLVMM') {
          this.point44 = !item.Value ? parseInt(item.ViName) : 0
        }
      } else {
        const point41List = this.MASTERDATA['PROMFHFCBNL'] ? this.MASTERDATA['PROMFHFCBNL'].Items : []
        for (let i = 0; i < point41List.length; i++) {
          if (point41List[i].Value) {
            this.point41 = parseInt(point41List[i].ViName)
          }
        }
        const point42List = this.MASTERDATA['PROMFHFCBNLPNG'] ? this.MASTERDATA['PROMFHFCBNLPNG'].Items : []
        for (let i = 0; i < point42List.length; i++) {
          if (point42List[i].Value) {
            this.point42 = parseInt(point42List[i].ViName)
          }
        }
        const point43List = this.MASTERDATA['PROMFHFTTMM'] ? this.MASTERDATA['PROMFHFTTMM'].Items : []
        for (let i = 0; i < point43List.length; i++) {
          if (point43List[i].Value) {
            this.point43 = parseInt(point43List[i].ViName)
          }
        }
        const point44List = this.MASTERDATA['PROMFHFLVMM'] ? this.MASTERDATA['PROMFHFLVMM'].Items : []
        for (let i = 0; i < point44List.length; i++) {
          if (point44List[i].Value) {
            this.point44 = parseInt(point44List[i].ViName)
          }
        }
      }
      var Q1 = 0
      var Q2 = 0
      var Q3 = 0
      var Q4 = 0
      if (this.point41 && this.point41 !== 0) {
        Q1 = 100 * (this.point41 - 1) / 4
      }
      if (this.point42 && this.point42 !== 0) {
        Q2 = 100 * (this.point42 - 1) / 4
      }
      if (this.point43 && this.point43 !== 0) {
        Q3 = 100 * (this.point43 - 1) / 6
      }
      if (this.point44 && this.point44 !== 0) {
        Q4 = 100 * (this.point44 - 1) / 6
      }
      var Q5 = Q1 + Q2 + Q3 + Q4
      if (Q5 === 0) {
        this.totalPoint4 = 'N/A'
      } else {
        this.totalPoint4 = ((Q5 / 4).toFixed(2)).toString()
      }
      this.caculatePoint5()
    },
    caculatePoint5 () {
      var ttp1 = this.totalPoint1 === 'N/A' ? 0 : parseFloat(this.totalPoint1)
      var ttp2 = this.totalPoint2 === 'N/A' ? 0 : parseFloat(this.totalPoint2)
      var ttp3 = this.totalPoint3 === 'N/A' ? 0 : parseFloat(this.totalPoint3)
      var ttp4 = this.totalPoint4 === 'N/A' ? 0 : parseFloat(this.totalPoint4)
      this.totalPoint5 = ((ttp1 + ttp2 + ttp3 + ttp4) / 4).toFixed(2).toString()
      if (this.totalPoint5 === '0.00' || this.totalPoint5 === '0') {
        this.totalPoint5 = 'N/A'
      }
      // check result
      // point4 < 50 || point3 < 50 || point1 < 50 && point2 < 50 || point4 >= 50 && point3 >= 50
      this.point1 = parseFloat(this.totalPoint1)
      this.point2 = parseFloat(this.totalPoint2)
      this.point3 = parseFloat(this.totalPoint3)
      this.point4 = parseFloat(this.totalPoint4)
      if (this.point4 < 50) {
        this.messageWarning1 = 'BS cần điều chỉnh liều lợi tiểu và đánh giá nguyên nhân gây nguy cơ suy tim mất bù nếu có'
      } else if (this.totalPoint4 === 'N/A') {
        this.messageWarning1 = 'N/A'
      } else {
        this.messageWarning1 = 'Kết quả bình thường'
      }
      if (this.point3 < 50) {
        this.messageWarning2 = 'BS cần xem xét lại tất cả các nguyên nhân thực tế có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Bs Tâm lý/ tâm thần'
      } else if (this.totalPoint3 === 'N/A') {
        this.messageWarning2 = 'N/A'
      } else {
        this.messageWarning2 = 'Kết quả bình thường'
      }
      if (this.point1 < 50 || this.point2 < 50) {
        this.messageWarning3 = 'BS xem xét lại tất cả các nguyên nhân thực thể có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Phục hồi chức năng, Khám Tâm lý/ tâm thần'
      } else if (this.totalPoint1 === 'N/A' && this.totalPoint2 === 'N/A') {
        this.messageWarning3 = 'N/A'
      } else {
        this.messageWarning3 = 'Kết quả bình thường'
      }
      // eslint-disable-next-line no-mixed-operators
      // if (this.point4 < 50 || this.point3 < 50 || this.point1 < 50 && this.point2 < 50 || this.point4 >= 50 && this.point3 >= 50) {
      // }
      // point4 >= 50 && point3 >= 50 && point1 >= 50 && point2 >= 50
      if (this.point4 > 50 && this.point3 > 50 && this.point1 >= 50 && this.point2 >= 50) {
        this.checkResult = true
      } else {
        this.checkResult = false
      }
    },
    handleSubmit () {
      this.DataSubmit.Datas = []
      this.sendSumaryData()
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
          })
        }
      }
      new PROMForHeartFailureService({}, this.Type).update('/Update/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.getData()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      if (this.checkEdited) {
        await this.handleSubmit()
      }
      new PROMForHeartFailureService({}, this.Type).update('/Confirm/' + this._VisitId, data).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        setTimeout(() => {
          this.reload()
        }, 500)
        this.reload()
      }).catch(e => {
        this.toastedError(this.$t('Bạn không có quyền xác nhận'))
        this.$modal.hide('doctorConfirm')
      })
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn tạo PROM bệnh nhân suy tim'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    create () {
      new PROMForHeartFailureService({}, this.Type).update('/Create/' + this._VisitId, {}).then(response => {
        this.reload()
      })
    },
    getDataInfo () {
      new PROMForHeartFailureService({}, this.Type).find('GetInfo/' + this._VisitId).then(response => {
        this.IsLocked = response
      })
    },
    getData () {
      this.hasData = false
      new PROMForHeartFailureService({}, this.Type).find('GetDetail/' + this._VisitId).then(response => {
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.IsLocked = response.IsLocked
        this.DataSubmit = response
        this.CreatedBy = response.CreatedBy
        this.CreatedAt = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.caculateKCCQ12()
        this.caculatePoint2()
        this.caculatePoint3()
        this.caculatePoint4()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 500)
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this.NeedNew = e.data.NeedNew
      })
    },
    sendSumaryData () {
      if (this.MASTERDATA['PROMFHFDATA']) {
        this.MASTERDATA['PROMFHFDATA'].Items[0].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá khả năng hạn chế thể lực (KCCQ12-PL)',
          EnTitle: 'Physical Limitation Score (KCCQ12-PL)',
          Point: this.totalPoint1 ? this.totalPoint1.toString() : '',
          Summary: '',
          Order: 3
        })
        this.MASTERDATA['PROMFHFDATA'].Items[1].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá tần suất xuất hiện triệu chứng (KCCQ12-SF)',
          EnTitle: 'Symptom Frequency Score (KCCQ12-SF)',
          Point: this.totalPoint4 ? this.totalPoint4.toString() : '',
          Summary: this.messageWarning1,
          Order: 1
        })
        this.MASTERDATA['PROMFHFDATA'].Items[2].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá Chất lượng sống (KCCQ12-QL)',
          EnTitle: 'Quality of Life Score (KCCQ12-QL)',
          Point: this.totalPoint3 ? this.totalPoint3.toString() : '',
          Summary: this.messageWarning2,
          Order: 2
        })
        this.MASTERDATA['PROMFHFDATA'].Items[3].Value = JSON.stringify({
          ViTitle: 'Điểm đánh giá hạn chế về mặt xã hội (KCCQ12-SL)',
          EnTitle: 'Social Limitation Score (KCCQ12-SL)',
          Point: this.totalPoint2 ? this.totalPoint2.toString() : '',
          Summary: this.messageWarning3,
          Order: 4
        })
        this.MASTERDATA['PROMFHFDATA'].Items[4].Value = JSON.stringify({
          ViTitle: 'Tổng điểm chất lượng cuộc sống - KCCQ12',
          EnTitle: 'Summary Score (KCCQ12)',
          Point: this.totalPoint5 ? this.totalPoint5.toString() : '',
          Summary: '',
          Order: 5
        })
      }
      let ViName = ''
      // eslint-disable-next-line no-unused-vars
      let EnName = ''
      if (this.point4 < 50) {
        ViName = 'BS cần điều chỉnh liều lợi tiểu và đánh giá nguyên nhân gây nguy cơ suy tim mất bù nếu có'
        EnName = 'Physician need adjust the diuretic dose and assess the risks for decompensated heart failure, if having'
      }
      if (this.point3 < 50) {
        ViName = ViName ? ViName + ' - BS cần xem xét lại tất cả các nguyên nhân thực tế có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Bs Tâm lý/ tâm thần' : ViName + 'BS cần xem xét lại tất cả các nguyên nhân thực tế có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Bs Tâm lý/ tâm thần'
        EnName = EnName ? EnName + ' - Review all improveable causes for immediate correction. Counseling and examination of psychiatrist' : EnName + 'Review all improveable causes for immediate correction. Counseling and examination of psychiatrist'
      }
      if (this.point1 < 50 && this.point2 < 50) {
        ViName = ViName ? ViName + ' - BS xem xét lại tất cả các nguyên nhân thực thể có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Phục hồi chức năng, Khám Tâm lý/ tâm thần' : ViName + 'BS xem xét lại tất cả các nguyên nhân thực thể có thể cải thiện được để điều chỉnh ngay. Tư vấn khám Phục hồi chức năng, Khám Tâm lý/ tâm thần'
        EnName = EnName ? EnName + ' - Review all improvable causes for immediate correction. Counseling and examination of psychiatrist /rehabilitation' : EnName + 'Review all improvable causes for immediate correction. Counseling and examination of psychiatrist /rehabilitation'
      }
      if (this.point4 >= 50 && this.point3 >= 50 && this.point1 >= 50 && this.point2 >= 50) {
        ViName = ViName ? ViName + ' - Kết quả bình thường' : ViName + 'Kết quả bình thường'
        EnName = EnName ? EnName + ' - Normal' : EnName + 'Normal'
      }
      this.MASTERDATA['PROMFHFDATA'].Items[5].Value = JSON.stringify({
        ViTitle: 'Đề xuất hành động BS cần can thiệp',
        EnTitle: 'Suggestion for physicians/nurses according the Summary score KCCQ12',
        Point: '',
        Summary: ViName,
        Order: -1
      })
    },
    handleBack () {
      if (this.checkEdited) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
