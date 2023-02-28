<template>
  <div>
    <div >
      <div style="margin-top: 12px;">
        <h3 class="text-center form-title; margin-bottom: 10px;"><b>{{__t('ĐÁNH GIÁ NGUY CƠ TRƯỚC THỦ THUẬT ĐỐI VỚI BỆNH NHÂN CAN THIỆP TIM MẠCH')}}</b></h3>
        <p class="text-center">{{__t('(Bác sĩ đánh giá lúc BN nhập viện hoặc ngay trước khi tiến hành can thiệp tim mạch)')}}</p>
      </div>
      <div v-if="FormExist && MASTERDATA">
        <div style="display: flex; margin-top: 12px; float: left; margin-bottom: 12px;">
          <div class="col" style="display: flex; margin: auto" v-if="MASTERDATA['IPDPPRAFCC230']">
            <label style="margin: auto; margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC230'])}}</label>
            <p v-if="readOnly" style="margin: auto">{{CreateTime}}</p>
            <v-date-time-picker v-else :format="vDateTimeFormat" v-model="MASTERDATA['IPDPPRAFCC230'].Items[0].Value"></v-date-time-picker>
          </div>
          <div class="col" style="display: flex; margin: auto; margin-left: 24px;">
            <label style="margin: auto; margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC232'])}}:</label>
            <ad-Info :ad="MASTERDATA['IPDPPRAFCC232'].Items[0].Value" />
          </div>
        </div>
        <div style="display: flex; margin-top: 12px; border: 1px dashed #ccc; width: 100%" class="container">
          <table style="width: 50%; margin-bottom: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC01']">
              <td>
                <span class="v-checkbox flex align-center" v-if="MASTERDATA['IPDPPRAFCC01']">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC01'" v-model="MASTERDATA['IPDPPRAFCC01'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC01'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC01'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC03']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC03'" v-model="MASTERDATA['IPDPPRAFCC03'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC03'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC03'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC05']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC05'" v-model="MASTERDATA['IPDPPRAFCC05'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC05'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC05'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC07']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC07'" v-model="MASTERDATA['IPDPPRAFCC07'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC07'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC07'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC09']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC09'" v-model="MASTERDATA['IPDPPRAFCC09'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC09'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC09'])}}</div>
                </span>
              </td>
            </tr>
          </table>
          <table style="width: 50%; margin-bottom: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC11']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC11'" v-model="MASTERDATA['IPDPPRAFCC11'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC11'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC11'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC13']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC13'" v-model="MASTERDATA['IPDPPRAFCC13'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC13'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC13'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC15']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC15'" v-model="MASTERDATA['IPDPPRAFCC15'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC15'">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC15'])}}</label>
                  <div class="fw600"></div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC17']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC17'" v-if="MASTERDATA['IPDPPRAFCC17'].Items" v-model="MASTERDATA['IPDPPRAFCC17'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC17'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC17'])}}</div>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC19']">
              <td>
                <span class="v-checkbox flex align-center" align="center">
                  <input :disabled="readOnly" type="checkbox" :id="'IPDPPRAFCC19'" v-model="MASTERDATA['IPDPPRAFCC19'].Items[0].Value">
                  <label class="ml-5" :for="'IPDPPRAFCC19'"></label>
                  <div class="fw600">{{__labelEnAndVi(MASTERDATA['IPDPPRAFCC19'])}}</div>
                  <!-- <textarea-autosize v-if="MASTERDATA['IPDPPRAFCC19'] && MASTERDATA['IPDPPRAFCC19'].Items[0].Value" :readOnly="readOnly" style="max-width: 400px; height: auto; margin-top: 10px;" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC19'].Items[1].Value"/> -->
                  <FakeInput v-if="MASTERDATA['IPDPPRAFCC19'] && MASTERDATA['IPDPPRAFCC19'].Items[0].Value" v-model="MASTERDATA['IPDPPRAFCC19'].Items[1].Value"/>
                </span>
              </td>
            </tr>
          </table>
        </div>
        <div style="display: flex; margin-top: 12px; border: 1px dashed #ccc;" >
          <table style="width: 20%; margin: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC21']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC21'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC21'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC23']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC23'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC23'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC25']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC25'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC25'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC27']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC27'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC27'].Items[0].Value"/>
              </div>
            </tr>
          </table>
          <table style="width: 20%; margin: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC29']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC29'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC29'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC31']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC31'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC31'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC33']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC33'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC33'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC35']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC35'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC35'].Items[0].Value"/>
              </div>
            </tr>
          </table>
          <table style="width: 20%; margin: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC37']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC37'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC37'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC39']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC39'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC39'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC41']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC41'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC41'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC43']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC43'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC43'].Items[0].Value"/>
              </div>
            </tr>
          </table>
          <table style="width: 20%; margin: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC45']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC45'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC45'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC47']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC47'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC47'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC234']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC234'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC234'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC49']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC49'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC49'].Items[0].Value"/>
              </div>
            </tr>
          </table>
          <table style="width: 20%; margin: 12px;">
            <tr v-if="MASTERDATA['IPDPPRAFCC51']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC51'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC51'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC53']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC53'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC53'].Items[0].Value"/>
              </div>
            </tr>
            <tr v-if="MASTERDATA['IPDPPRAFCC55']">
              <div class="form-group">
                <label style="margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC55'])}}</label>
                <FakeInput v-model="MASTERDATA['IPDPPRAFCC55'].Items[0].Value"/>
              </div>
            </tr>
            <tr>
              <div class="form-group">
                <label style="margin-right: 10px;"></label>
                <FakeInput style="visibility: hidden"/>
              </div>
            </tr>
          </table>
        </div>
        <div style="display: flex; margin-top: 12px;">
          <table style="width: 100%" class="table standing-order-tbl td-re">
            <tr class="text-center">
              <td style="width: 75%"></td>
              <td style="width: 5%">Yes</td>
              <td style="width: 5%">No</td>
              <td style="width: 5%">N/A</td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Khai thác tiền sử và khám lâm sàng")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Bệnh nhân ngoại trú: khai thác tiền sử khám bệnh trong vòng 30 ngày -->
            <tr v-if="MASTERDATA['IPDPPRAFCC57']">
              <td><p>{{__label(MASTERDATA['IPDPPRAFCC57'])}}</p></td>
              <td :key="index + 'IPDPPRAFCC57'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC57'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC57'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC57-' + index"
                          :name="'IPDPPRAFCC57-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC57-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Có tiền sử can thiệp mạch vành qua da (PCI) hoặc phẫu thuật bắc cầu chủ vành (CABG) -->
            <tr v-if="MASTERDATA['IPDPPRAFCC61']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC61'])}}</p>
                  <span v-if="MASTERDATA['IPDPPRAFCC61'].Items[0].Value" style="display: flex">
                    <p style="margin-top: auto; margin-bottom: auto; margin-right: 12px;">{{__label(MASTERDATA['IPDPPRAFCC65'])}}</p>
                    <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 500px" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC65'].Items[0].Value"/> -->
                    <FakeInput v-if="MASTERDATA['IPDPPRAFCC65']" v-model="MASTERDATA['IPDPPRAFCC65'].Items[0].Value" />
                  </span>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC61'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC61'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC61'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC61-' + index"
                          :name="'IPDPPRAFCC61-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC61-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Nghiệm pháp gắng sức hoặc đánh giá LVEF hoặc các kết quả chẩn đoán hình ảnh khác -->
            <tr v-if="MASTERDATA['IPDPPRAFCC67']">
              <td><p>{{__label(MASTERDATA['IPDPPRAFCC67'])}}</p></td>
              <td :key="index + 'IPDPPRAFCC67'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC67'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC67'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC67-' + index"
                          :name="'IPDPPRAFCC67-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC67-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Dị ứng -->
            <tr v-if="MASTERDATA['IPDPPRAFCC71']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC71'])}}: {{MedicationInfo.Allergy}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC71'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC71'].Items">
                  <span class="v-checkbox text-center">
                    <input @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC71'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC71-' + index"
                          :name="'IPDPPRAFCC71-' + index"
                          v-model="item.Value"
                          :disabled="true"
                           />
                    <label class="ml-5" :for="'IPDPPRAFCC71-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Ngừng thở khi ngủ -->
            <tr v-if="MASTERDATA['IPDPPRAFCC75']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC75'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC75'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC75'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC75'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC75-' + index"
                          :name="'IPDPPRAFCC75-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC75-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Sử dụng Nicotin -->
            <tr v-if="MASTERDATA['IPDPPRAFCC79']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC79'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC79'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC79'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC79'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC79-' + index"
                          :name="'IPDPPRAFCC79-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC79-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Sử dụng rượu -->
            <tr v-if="MASTERDATA['IPDPPRAFCC83']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC83'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC83'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC83'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC83'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC83-' + index"
                          :name="'IPDPPRAFCC83-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC83-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Tiền sử kháng Heparin hoặc giảm tiểu cầu do dùng Heparin -->
            <tr v-if="MASTERDATA['IPDPPRAFCC87']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC87'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC87'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC87'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC87'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC87-' + index"
                          :name="'IPDPPRAFCC87-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC87-' + index"></label>
                  </span>
              </td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Nguy cơ chảy máu")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Có tiền sử xuất huyết tiêu hóa hoặc tiết niệu hoặc các biến cố chảy máu khác -->
            <tr v-if="MASTERDATA['IPDPPRAFCC91']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC91'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC91'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC91'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC91'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC91-' + index"
                          :name="'IPDPPRAFCC91-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC91-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Có dấu hiệu thiếu máu hoặc rối loạn đông máu, cảnh báo chảy máu đang diễn ra hoặc nguy cơ cao xảy ra -->
            <tr v-if="MASTERDATA['IPDPPRAFCC95']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC95'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC95'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC95'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC95'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC95-' + index"
                          :name="'IPDPPRAFCC95-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC95-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Cần điều trị đồng thời thuốc chống đông và thuốc kháng tiểu cầu kép -->
            <tr v-if="MASTERDATA['IPDPPRAFCC99']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC99'])}}</p>
                  <span v-if="MASTERDATA['IPDPPRAFCC99'].Items[0].Value" style="display: flex">
                    <p style="margin-top: auto; margin-bottom: auto; margin-right: 12px;">{{__label(MASTERDATA['IPDPPRAFCC103'])}}</p>
                    <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 300px" class="form-control" rows="1"  v-model="MASTERDATA['IPDPPRAFCC103'].Items[0].Value"/> -->
                    <FakeInput v-if="MASTERDATA['IPDPPRAFCC103']" v-model="MASTERDATA['IPDPPRAFCC103'].Items[0].Value"/>
                  </span>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC99'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC99'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC99'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC99-' + index"
                          :name="'IPDPPRAFCC99-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC99-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Đánh giá nguy cơ chảy máu -->
            <tr v-if="MASTERDATA['IPDPPRAFCC105']">
              <td>
                <div style="display: flex; align-items: baseline;">
                  <p >{{__label(MASTERDATA['IPDPPRAFCC105'])}}</p>
                  <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 200px; margin: 0px 10px;" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC105'].Items[0].Value"/> -->
                  <FakeInput v-if="MASTERDATA['IPDPPRAFCC105']" v-model="MASTERDATA['IPDPPRAFCC105'].Items[0].Value"/>
                  <p>%</p>
                </div>
                <div style="display: flex; align-items: baseline; margin-top: 12px;">
                  <p >{{__label(MASTERDATA['IPDPPRAFCC107'])}}</p>
                  <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 200px; margin: 0px 10px;" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC107'].Items[0].Value"/> -->
                  <FakeInput v-if="MASTERDATA['IPDPPRAFCC107']" v-model="MASTERDATA['IPDPPRAFCC107'].Items[0].Value"/>
                </div>
                <p>{{__t('Đánh giá nguy cơ chảy máu: Thấp (&#60;= 2%), Trung bình (> 2% &#60;= 6.5%), Cao (> 6.5%)')}}</p>
              </td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Nguy cơ chảy máu cao -->
            <tr v-if="MASTERDATA['IPDPPRAFCC109']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC109'])}}</p>
                  <span v-if="MASTERDATA['IPDPPRAFCC109'].Items[0].Value" style="display: flex">
                    <p style="margin-top: auto; margin-bottom: auto; margin-right: 12px;">{{__label(MASTERDATA['IPDPPRAFCC113'])}}</p>
                    <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 450px" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC113'].Items[0].Value"/> -->
                    <FakeInput v-if="MASTERDATA['IPDPPRAFCC113']" v-model="MASTERDATA['IPDPPRAFCC113'].Items[0].Value"/>
                  </span>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC109'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC109'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="true" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC109'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC109-' + index"
                          :name="'IPDPPRAFCC109'"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC109-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Liệu pháp bắc cầu thuốc chống đông -->
            <tr v-if="MASTERDATA['IPDPPRAFCC115']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC115'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC115'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC115'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC115'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC115-' + index"
                          :name="'IPDPPRAFCC115-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC115-' + index"></label>
                  </span>
              </td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Nguy cơ thuyên tắc mạch")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Có van cơ học -->
            <tr v-if="MASTERDATA['IPDPPRAFCC119']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC119'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC119'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC119'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC119'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC119-' + index"
                          :name="'IPDPPRAFCC119-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC119-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Có tiền sử đột quỵ với van cơ học... -->
            <tr v-if="MASTERDATA['IPDPPRAFCC123']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC123'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC123'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC123'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC123'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC123-' + index"
                          :name="'IPDPPRAFCC123-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC123-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Rung nhĩ với van tim cơ học ở vị trí van hai lá hoặc van động mạch chủ -->
            <tr v-if="MASTERDATA['IPDPPRAFCC127']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC127'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC127'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC127'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC127'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC127-' + index"
                          :name="'IPDPPRAFCC127-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC127-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Rung nhĩ gây ra đột quỵ hoặc con thiếu máu não cụ bộ thoáng qua (trong vòng 3 tháng) -->
            <tr v-if="MASTERDATA['IPDPPRAFCC131']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC131'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC131'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC131'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC131'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC131-' + index"
                          :name="'IPDPPRAFCC131-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC131-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Thuyên tắc huyết khối tĩnh mạch trong vòng 3 tháng trước -->
            <tr v-if="MASTERDATA['IPDPPRAFCC135']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC135'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC135'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC135'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC135'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC135-' + index"
                          :name="'IPDPPRAFCC135-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC135-' + index"></label>
                  </span>
              </td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Nguy cơ tổn thương thận do thuốc cản quang")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Điểm Mehran -->
            <tr v-if="MASTERDATA['IPDPPRAFCC139']">
              <td>
                <div style="display: flex; align-items: baseline;">
                  <p >{{__label(MASTERDATA['IPDPPRAFCC139'])}}</p>
                  <VNumberInput style="max-width: 200px; margin: 0px 10px;" :placeholder="' '" :decimal="true"  :readonly="readOnly" class="input-para" v-model="MASTERDATA['IPDPPRAFCC139'].Items[0].Value"/>
                  <p>{{__t("điểm ")}}</p>
                </div>
                <div style="display: flex; align-items: baseline;">
                  <p >{{__label(MASTERDATA['IPDPPRAFCC141'])}}</p>
                  <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 200px; margin: 0px 10px;" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC141'].Items[0].Value"/> -->
                  <VNumberInput style="max-width: 200px; margin: 0px 10px;" :placeholder="' '" :decimal="true"  :readonly="readOnly" class="input-para" v-model="MASTERDATA['IPDPPRAFCC141'].Items[0].Value"/>
                  <p>%</p>
                </div>
                <div style="display: flex; align-items: baseline; margin-top: 10px;">
                  <p >{{__label(MASTERDATA['IPDPPRAFCC143'])}}</p>
                  <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 200px; margin: 0px 10px;" class="form-control" rows="1"  v-model="MASTERDATA['IPDPPRAFCC143'].Items[0].Value"/> -->
                  <VNumberInput style="max-width: 200px; margin: 0px 10px;" :placeholder="' '" :decimal="true"  :readonly="readOnly" class="input-para" v-model="MASTERDATA['IPDPPRAFCC143'].Items[0].Value"/>
                  <p>%</p>
                </div>
              </td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Ngưỡng tối đa thuốc cản quan ước tính trong giới hạn an toàn -->
            <tr v-if="MASTERDATA['IPDPPRAFCC145']">
              <td>
                <div style="display: flex; align-items: baseline;">
                  <p >{{__label(MASTERDATA['IPDPPRAFCC145'])}}</p>
                  <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 200px; margin: 0px 10px;" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC145'].Items[0].Value"/> -->
                  <VNumberInput style="max-width: 200px; margin: 0px 10px;" :placeholder="' '" :decimal="true"  :readonly="readOnly" class="input-para" v-model="MASTERDATA['IPDPPRAFCC145'].Items[0].Value"/>
                  <p>ml</p>
                </div>
              </td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Dừng sử dụng các thuốc liên quan tới thổn thương thận do dùng thuốc cản quang -->
            <tr v-if="MASTERDATA['IPDPPRAFCC147']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC147'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC147'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC147'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC147'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC147-' + index"
                          :name="'IPDPPRAFCC147-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC147-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Truyền dịch trước thủ thuật -->
            <tr v-if="MASTERDATA['IPDPPRAFCC151']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC151'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC151'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC151'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC151'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC151-' + index"
                          :name="'IPDPPRAFCC151-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC151-' + index"></label>
                  </span>
              </td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Y lệnh thuốc")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- 1. Aspirin được dùng trong vòng 24 tiếng -->
            <tr v-if="MASTERDATA['IPDPPRAFCC155']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC155'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC155'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC155'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC155'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC155-' + index"
                          :name="'IPDPPRAFCC155-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC155-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- 2. Clopidogrel hoặc prasugrel hoặc ticagrelor được dùng trong vòng 24 tiếng -->
            <tr v-if="MASTERDATA['IPDPPRAFCC159']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC159'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC159'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC159'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC159'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC159-' + index"
                          :name="'IPDPPRAFCC159-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC159-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- 3. Đối với bệnh nhân đái tháo đường, Metformin hoặc các thuốc khác được dùng trong vòng 24 tiếng và đường huyết của người bệnh được theo dõi -->
            <tr v-if="MASTERDATA['IPDPPRAFCC163']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC163'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC163'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC163'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC163'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC163-' + index"
                          :name="'IPDPPRAFCC163-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC163-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- 4. Sildenafil (hoặc chất ức chế PDE5 khác) được dùng trong vòng 24 tiếng -->
            <tr v-if="MASTERDATA['IPDPPRAFCC167']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC167'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC167'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC167'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC167'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC167-' + index"
                          :name="'IPDPPRAFCC167-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC167-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- 5. Heparin trọng lượng phân tử thấp (LMWH) được dùng trong vòng 12 tiếng -->
            <tr v-if="MASTERDATA['IPDPPRAFCC171']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC171'])}}</p>
                  <span v-if="MASTERDATA['IPDPPRAFCC171'].Items[0].Value" style="display: flex">
                    <p style="margin-top: auto; margin-bottom: auto; margin-right: 10px;">{{__label(MASTERDATA['IPDPPRAFCC175'])}}</p>
                     <!-- <textarea-autosize :readOnly="readOnly" style="max-width: 200px; margin: 0px 10px;" class="form-control" rows="1" v-model="MASTERDATA['IPDPPRAFCC175'].Items[0].Value"/> -->
                    <FakeInput v-if="MASTERDATA['IPDPPRAFCC175']" v-model="MASTERDATA['IPDPPRAFCC175'].Items[0].Value" />
                  </span>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC171'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC171'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC171'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC171-' + index"
                          :name="'IPDPPRAFCC171-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC171-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- 6. Thuốc chống đông? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC177']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC177'])}}</p>
                  <div v-if="MASTERDATA['IPDPPRAFCC177'].Items[0].Value" style="display: flex; align-items: baseline;">
                    <p>{{__label(MASTERDATA['IPDPPRAFCC181'])}}</p>
                    <!-- <textarea-autosize :disabled="readOnly" style="margin: 0px 10px;" type="text" name="IPDPPRAFCC182" id="IPDPPRAFCC182" v-model="MASTERDATA['IPDPPRAFCC181'].Items[0].Value" /> -->
                    <FakeInput v-if="MASTERDATA['IPDPPRAFCC181']" v-model="MASTERDATA['IPDPPRAFCC181'].Items[0].Value" />
                  </div>
                  <div v-if="MASTERDATA['IPDPPRAFCC177'].Items[0].Value" style="display: flex; align-items: baseline; margin-top: 12px;">
                    <p>{{__label(MASTERDATA['IPDPPRAFCC183'])}}</p>
                    <!-- <textarea-autosize :disabled="readOnly" style="margin: 0px 10px;" type="text" name="IPDPPRAFCC184" id="IPDPPRAFCC184" v-model="MASTERDATA['IPDPPRAFCC183'].Items[0].Value" /> -->
                    <FakeInput v-if="MASTERDATA['IPDPPRAFCC183']" v-model="MASTERDATA['IPDPPRAFCC183'].Items[0].Value" />
                  </div>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC177'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC177'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC177'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC177-' + index"
                          :name="'IPDPPRAFCC177-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC177-' + index"></label>
                  </span>
              </td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Nguy cơ biến chứng đường vào mạch máu")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Nhiễm trùng tại đường vào? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC185']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC185'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC185'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC185'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC185'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC185-' + index"
                          :name="'IPDPPRAFCC185-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC185-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Bệnh nhân tiểu đường? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC189']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC189'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC189'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC189'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC189'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC189-' + index"
                          :name="'IPDPPRAFCC189-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC189-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Bệnh mạch máu ngoại biên? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC193']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC193'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC193'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC193'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC193'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC193-' + index"
                          :name="'IPDPPRAFCC193-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC193-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Bệnh béo phì? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC197']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC197'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC197'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC197'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC197'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC197-' + index"
                          :name="'IPDPPRAFCC197-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC197-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Kết quả test Allen hoặc Barbeau bình thường -->
            <tr v-if="MASTERDATA['IPDPPRAFCC201']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC201'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC201'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC201'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC201'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC201-' + index"
                          :name="'IPDPPRAFCC201-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC201-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Đường vào mạch máu ưu tiên -->
            <tr v-if="MASTERDATA['IPDPPRAFCC205']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC205'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC205'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC205'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC205'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC205-' + index"
                          :name="'IPDPPRAFCC205-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC205-' + index"></label>
                  </span>
              </td>
            </tr>
            <tr>
              <td style="width: 75%"><b>{{__t("Quá trình xác minh")}}</b></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
              <td style="width: 5%"></td>
            </tr>
            <!-- Không có hCG trong nước tiểu/huyết thanh ở phụ nữ độ tuổi mang thai (12 - 60 tuổi)? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC209']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC209'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC209'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC209'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC209'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC209-' + index"
                          :name="'IPDPPRAFCC209-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC209-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Đã kí cam kết đồng ý thực hiện thủ thuật? -->
            <tr v-if="MASTERDATA['IPDPPRAFCC213']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC213'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC213'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC213'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC213'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC213-' + index"
                          :name="'IPDPPRAFCC213-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC213-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Lập trình viên thiết bị có mặt để đánh giá các trường hợp đã có thiết bị cấy ghép trước đây, chẩn đoán và thực hiện các đánh giá trước thủ thuật. -->
            <tr v-if="MASTERDATA['IPDPPRAFCC217']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC217'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC217'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC217'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC217'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC217-' + index"
                          :name="'IPDPPRAFCC217-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC217-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Xác nhận tính sẵn có và sự phù hợp của các thiết bị đặc biệt quan trọng đối với thủ thuật -->
            <tr v-if="MASTERDATA['IPDPPRAFCC221']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC221'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC221'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC221'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC221'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC221-' + index"
                          :name="'IPDPPRAFCC221-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC221-' + index"></label>
                  </span>
              </td>
            </tr>
            <!-- Khám tiền mê trước các thủ thuật can thiệp tim mạch -->
            <tr v-if="MASTERDATA['IPDPPRAFCC225']">
              <td>
                <div>
                  <p>{{__label(MASTERDATA['IPDPPRAFCC225'])}}</p>
                </div>
              </td>
              <td :key="index + 'IPDPPRAFCC225'"
                  v-for="(item, index) in MASTERDATA['IPDPPRAFCC225'].Items">
                  <span class="v-checkbox text-center">
                    <input :disabled="readOnly" @click="checkbox2Radios(MASTERDATA['IPDPPRAFCC225'].Items, item)"
                          type="checkbox"
                          :id="'IPDPPRAFCC225-' + index"
                          :name="'IPDPPRAFCC225-' + index"
                          v-model="item.Value" />
                    <label class="ml-5" :for="'IPDPPRAFCC225-' + index"></label>
                  </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-else class="text-center p20">
        <p>{{__t('Chưa có Đánh giá nguy cơ trước thủ thuật đối với bệnh nhân can thiệp tim mạch')}}</p>
        <button v-if="!viewOnly && NeedCreateRecordExtenstion" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import constants from '@/constants'
import PreProcedureRiskAssessmentForCardiacCatheterization from '@/services/IPD/MedicalRecordExtenstion/PreProcedureRiskAssessmentForCardiacCatheterization.js'
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'

export default {
  name: 'PreProcedureRiskAssessmentForCardiacCatheterization',
  mixins: [MixinMasterData],
  props: ['viewOnly', 'VisitIdDrop', 'VisitId'],
  data () {
    return {
      PatientInfo: {},
      GENDER: constants.GENDER,
      FormExist: false,
      NeedCreateRecordExtenstion: false,
      DataSubmit: {},
      nullContent: true,
      dataMaster: '',
      createdBy: '',
      maxDate: Date.now(),
      MedicationInfo: {},
      ConfirmInfo: {},
      user: {},
      readOnly: true,
      CreateTime: ''
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'A01_034_290422_V'}, () => {
      this.getData()
    })
    this.PatientInfo = this.$store.state.account.CurrentPatientObj
    console.log('FormCode: ', this.MedicalRecordFormCode)
  },
  computed: {
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  components: {
    VDateTimePicker
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (parseFloat(this.MASTERDATA['IPDPPRAFCC105'].Items[0].Value) > 6.5) {
          this.MASTERDATA['IPDPPRAFCC109'].Items[0].Value = true
          this.MASTERDATA['IPDPPRAFCC109'].Items[1].Value = false
          this.MASTERDATA['IPDPPRAFCC109'].Items[2].Value = false
        } else if (parseFloat(this.MASTERDATA['IPDPPRAFCC105'].Items[0].Value) > 2 || parseFloat(this.MASTERDATA['IPDPPRAFCC105'].Items[0].Value) <= 6.5) {
          this.MASTERDATA['IPDPPRAFCC109'].Items[0].Value = false
          this.MASTERDATA['IPDPPRAFCC109'].Items[1].Value = true
          this.MASTERDATA['IPDPPRAFCC109'].Items[2].Value = false
        } else {
          this.MASTERDATA['IPDPPRAFCC109'].Items[2].Value = true
          this.MASTERDATA['IPDPPRAFCC109'].Items[0].Value = false
          this.MASTERDATA['IPDPPRAFCC109'].Items[1].Value = false
        }
      },
      deep: true
    }
  },
  methods: {
    getData () {
      let url = this.MedicalRecordFormCode + `/PreProcedureRiskAssessmentForCardiacCatheterization/${this._VisitId}`
      new PreProcedureRiskAssessmentForCardiacCatheterization().find(url).then(response => {
        if (response.NotFoundData && response.NotFoundData.EnMessage === 'Form is not found') {
          this.FormExist = false
        } else {
          this.FormExist = true
        }
        this.NeedCreateRecordExtenstion = response.NeedCreateRecordExtenstion
        this.DataSubmit = response
        this.MedicationInfo = response.MedicationInfo.CustomerMedicationInfo
        this.ConfirmInfo = response.Confirm
        this.createdBy = response.CreatedBy
        // this.CreateTime = response.Datas.find(e => e.Code === 'IPDPPRAFCC231').Value
        if (response.Datas.find(e => e.Code === 'IPDPPRAFCC231')) {
          this.CreateTime = response.Datas.find(e => e.Code === 'IPDPPRAFCC231').Value
        } else {
          this.MASTERDATA['IPDPPRAFCC230'].Items[0].Value = moment(Date.now()).format(this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }

        this.MASTERDATA['IPDPPRAFCC232'].Items[0].Value = this.createdBy
        this.MASTERDATA['IPDPPRAFCC51'].Items[0].Value = this.DataSubmit.Height
        this.MASTERDATA['IPDPPRAFCC49'].Items[0].Value = this.DataSubmit.Weight

        this.MASTERDATA['IPDPPRAFCC53'].Items[0].Value = this.bmiCalculation()
        if (this.MedicationInfo.Allergy === 'Không') {
          this.MASTERDATA['IPDPPRAFCC71'].Items[0].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[1].Value = true
          this.MASTERDATA['IPDPPRAFCC71'].Items[2].Value = false
          this.MedicationInfo.Allergy = ''
        } else if (this.MedicationInfo.Allergy === 'Không xác định' || this.MedicationInfo.Allergy === null || this.MedicationInfo.Allergy === '') {
          this.MASTERDATA['IPDPPRAFCC71'].Items[0].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[1].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[2].Value = true
          this.MedicationInfo.Allergy = ''
        } else {
          this.MASTERDATA['IPDPPRAFCC71'].Items[0].Value = true
          this.MASTERDATA['IPDPPRAFCC71'].Items[1].Value = false
          this.MASTERDATA['IPDPPRAFCC71'].Items[2].Value = false
        }
      })

      this.nullContent = true
      this.dataMaster = JSON.stringify(this.MASTERDATA)
      // this.createdBy = this.getUser()
    },
    checkbox2Radios (items, item) {
      items.forEach((element) => {
        if (element.Code !== item.Code) {
          element.Value = false
        }
      })
    },
    handleBack () {
      this.confirmPopupBack()
    },
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
    bmiCalculation: function () {
      var weight = this.MASTERDATA['IPDPPRAFCC49'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDPPRAFCC49'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['IPDPPRAFCC51'].Items[0].Value
        ? parseFloat(this.MASTERDATA['IPDPPRAFCC51'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    }
  }
}
</script>
