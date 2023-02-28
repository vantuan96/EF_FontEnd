<template>
  <div v-if="hasData && Data">
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2">
          <div style="position: relative;">
            <div class="fw600 fs20">I. HÀNH CHÍNH<i class="fs20">{{__t3('HÀNH CHÍNH')}}</i>:</div>
            <div class="tuoi" style="position: absolute;top: 8px!important;right: 0px;"
              v-if="routeType !== 'Neonatal'">Tuổi<i>{{__t3('Tuổi')}}</i>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td width="49%">{{dex[1]}} Họ và tên<i>{{__t3('Họ và tên')}}</i> <i>(In hoa{{__t3('In hoa')}})</i>: {{Data.Customer.Fullname | touppercase}}</td>
        <td>
          <div class="flex align-center space-between">
            <div class="inline">{{dex[2]}} Sinh ngày<i v-if="checkDich()">/ DOB</i>:</div>
            <CharWithSquare class="inline" v-if="Data.Customer.DateOfBirth" :text="Data.Customer.DateOfBirth ? Data.Customer.DateOfBirth.replace(/[^\w\s]/gi, '') : ''"  />
            <div v-if="routeType !== 'Neonatal'" class="inline" style="position: relative;"><CharWithSquare v-if="age && age.length" :text="age[0]" :defaultlength="2"  />
              <div style="position: absolute;right: -42px;top: 5px;" v-if="age && age.length">{{getTypeAge(age[1]).ViName}}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td v-if="routeType !== 'Obstetrics' && (routeType !== 'Gynecological')">
          {{dex[3]}} Giới<i>{{__t3('Giới')}}</i>:
          <span style="margin-left: 10px"></span>
          1. Nam<i>{{__t3('1. Nam')}}</i> <span class="square-text" :class="Data.Customer.Gender === 1 ? '' : 'hidden-text'">&#10003;</span> <span style="margin-left: 20px"></span>
          2. Nữ<i>{{__t3('2. Nữ')}}</i> <span class="square-text" :class="Data.Customer.Gender === 0 ? '' : 'hidden-text'">&#10003;</span>
        </td>
        <td v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
          {{dex[4]}} Nghề nghiệp<i>{{__t3('Nghề nghiệp-mdc')}}</i>: {{Data.Customer.MOHJob}}<div class="float-right"><CharWithSquare :text="Data.Customer.MOHJobCode" :defaultlength="2"/></div>
        </td>
      </tr>
      <tr v-if="routeType === 'Neonatal'">
        <td width="55%" v-if="MASTERDATA['IPDMRPO62']">4. Họ tên mẹ<i>/ Mother’s full name</i>: {{MASTERDATA['IPDMRPO62'].Items[0].Value}}</td>
        <td v-if="MASTERDATA['IPDMRPOS3']">
          <div class="inline">Sinh ngày<i>/ DoB</i>:</div>
          <VAgeInput style="display: inline-block;" :print="true" v-model="MASTERDATA['IPDMRPOS3'].Items[0].Value" :defaultlength="8" />
        </td>
      </tr>
      <tr v-if="routeType === 'Neonatal'">
        <td v-if="MASTERDATA['IPDMRPO66']">Nghề nghiệp<i>/ Occupation</i>: {{MASTERDATA['IPDMRPO66'].Items[0].Value}}<div style="display: inline-block;"><CharWithSquare :text="NgheNghiepMeCode" :defaultlength="2" /></div></td>
        <td v-if="MASTERDATA['IPDMRPOS5']">Đẻ lần mấy<i>/ This is</i>: <CharWithSquare :text="MASTERDATA['IPDMRPOS5'].Items[0].Value" :defaultlength="1"  /><i>/ time of delivery</i></td>
      </tr>
      <tr v-if="routeType === 'Neonatal'">
        <td width="55%" v-if="MASTERDATA['IPDMRPO56']">5. Họ tên bố<i>/ Father’s full name</i>: {{MASTERDATA['IPDMRPO56'].Items[0].Value}}</td>
        <td v-if="MASTERDATA['IPDMRPOS7']">
          <div class="inline">Sinh ngày<i>/ DoB</i>:</div>
          <VAgeInput style="display: inline-block;" :print="true" v-model="MASTERDATA['IPDMRPOS7'].Items[0].Value" :defaultlength="8" />
        </td>
      </tr>
      <tr v-if="routeType === 'Neonatal'">
        <td colspan="2">
          <table width="100%">
            <tr>
              <td style="padding-left:0px;" v-if="MASTERDATA['IPDMRPO60']">Nghề nghiệp<i>/ Occupation</i>: {{MASTERDATA['IPDMRPO60'].Items[0].Value}}<div style="display: inline-block;"><CharWithSquare :text="NgheNghiepBoCode" :defaultlength="2" /></div></td>
              <td style="text-align: left;">{{dex[5]}} Dân tộc<i>/ Ethnic</i>: {{Data.Customer.MOHEthnic}}<div style="display: inline-block;"><CharWithSquare :text="Data.Customer.MOHEthnicCode" :defaultlength="2" /></div></td>
              <td style="text-align: right;">
                {{dex[6]}} Ngoại kiều<i>/ Alien</i>: {{Data.Customer.MOHNationality}}<div style="display: inline-block;"><CharWithSquare :text="Data.Customer.MOHNationalityCode" :defaultlength="2" /></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-if="routeType !== 'Neonatal'">
        <td>{{dex[5]}} Dân tộc<i>{{__t3('Dân tộc-mdc')}}</i>: {{Data.Customer.MOHEthnic}}<div class="float-right"><CharWithSquare :text="Data.Customer.MOHEthnicCode" :defaultlength="2"  /></div></td>
        <td>
          {{dex[6]}} Ngoại kiều<i>{{__t3('Ngoại kiều-mdc')}}</i>: {{Data.Customer.MOHNationality}}<div class="float-right"><CharWithSquare :text="Data.Customer.MOHNationalityCode" :defaultlength="2"  /></div>
        </td>
      </tr>
      <tr>
        <td>{{dex[7]}} Địa chỉ<i>{{__t3('Địa chỉ')}}</i>: {{Data.Customer.MOHAddress}}</td>
      </tr>
      <tr>
        <td>
          <div class="mrl10">
            <div>Huyện (Quận, Thị xã)<i>{{__t3('Huyện (Quận, Thị xã)')}}</i>:</div>
            <div class="flex space-between">
              <div>{{Data.Customer.MOHDistrict}}</div>
              <div><CharWithSquare :text="Data.Customer.MOHDistrictCode" :defaultlength="2"/></div>
            </div>
          </div>
        </td>
        <td>
          <div>Tỉnh, Thành phố<i>{{__t3('Tỉnh, Thành phố-mdc')}}</i>:</div>
          <div class="flex space-between">
            <div>{{Data.Customer.MOHProvince}}</div>
            <div><CharWithSquare :text="Data.Customer.MOHProvinceCode" :defaultlength="2"  /></div>
          </div>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b2">
      <tr v-if="routeType === 'Neonatal'">
        <td colspan="2">
          <div class="mrb10">
            9. Nhóm máu mẹ<i>/ Monther’s blood group</i>: {{MASTERDATA['IPDMRPOS9'].Items[0].Value || '&emsp;&emsp;'}}
          </div>
          <div>
            10. Tiền thai<i>/ History of pregnancy</i> (Para) <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPOS11'].Items[0].Value}">{{MASTERDATA['IPDMRPOS11'].Items[0].Value || '&#10003;'}}</span>
            <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPOS11'].Items[1].Value}">{{MASTERDATA['IPDMRPOS11'].Items[1].Value || '&#10003;'}}</span>
            <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPOS11'].Items[2].Value}">{{MASTERDATA['IPDMRPOS11'].Items[2].Value || '&#10003;'}}</span>
            <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPOS11'].Items[3].Value}">{{MASTERDATA['IPDMRPOS11'].Items[3].Value || '&#10003;'}}</span>
            <span>(Sinh (đủ tháng)<i>/ Full-term</i>, Sớm (thiếu tháng)<i>/ Pre-term</i>, Sẩy (nạo, hút)<i>/ Misscarriage (Suction, D&E)</i>, Sống<i>/ Alive</i>)</span>
          </div>
        </td>
      </tr>
    </table>
    <!-- nhi khoa -->
    <table width="100%" class="tbl-b2" v-if="routeType === 'Pediatric'">
      <tr class="on-top">
        <td width="50%" v-if="MASTERDATA['IPDMRPO56']">7. Họ tên bố<i>/ Father’s full name</i>: {{MASTERDATA['IPDMRPO56'].Items[0].Value}}</td>
        <td width="50%" v-if="MASTERDATA['IPDMRPO58']">Trình độ văn hóa của bố<i>/ Father’s educational level</i>: {{MASTERDATA['IPDMRPO58'].Items[0].Value}}</td>
      </tr>
      <tr>
        <td v-if="MASTERDATA['IPDMRPO60']">Nghề nghiệp của bố<i>/ Father’s occupation</i>: {{MASTERDATA['IPDMRPO60'].Items[0].Value}}</td>
      </tr>
      <tr class="on-top">
        <td width="50%" v-if="MASTERDATA['IPDMRPO62']"> Họ tên mẹ<i>/ Mother’s full name</i>: {{MASTERDATA['IPDMRPO62'].Items[0].Value}}</td>
        <td width="50%" v-if="MASTERDATA['IPDMRPO64']">Trình độ văn hóa của mẹ<i>/ Mother’s educational level</i>: {{MASTERDATA['IPDMRPO64'].Items[0].Value}}</td>
      </tr>
      <tr>
        <td v-if="MASTERDATA['IPDMRPO66']">Nghề nghiệp của mẹ<i>/ Mother’s occupation</i>: {{MASTERDATA['IPDMRPO66'].Items[0].Value}}</td>
      </tr>
    </table>
    <table v-if="routeType !== 'Neonatal'" width="100%" class="tbl-b2">
      <tr class="on-top" v-if="routeType === 'A01_034_050919_V' || routeType === 'CardiovascularForm'">
        <td colspan="2">{{dex[8]}} Nơi làm việc<i>{{__t3('Nơi làm việc')}}</i>: {{Data.Customer.WorkPlace}}</td>
      </tr>
      <tr class="on-top" v-else-if="routeType">
        <td style="width: 50%" v-if="routeType !== 'Pediatric'">{{dex[8]}} Nơi làm việc<i>{{__t3('Nơi làm việc')}}</i>: {{Data.Customer.WorkPlace}}</td>
      </tr>
      <tr>
        <td style="white-space: nowrap;" colspan="2">
          <div class="inline-block">{{dex[9]}} Đối tượng<i>{{__t3('Đối tượng')}}</i>:</div>
          <div class="inline-block">
            <i>1. BHYT<i>{{__t3('1. BHYT')}}</i></i> <span class="square-text mrr5" :class="{'hidden-text': Data.Customer.MOHObject !== '1'}">&#10003;</span>
            <i>2. Thu phí<i>{{__t3('2. Thu phí')}}</i></i> <span class="square-text mrr5" :class="{'hidden-text': Data.Customer.MOHObject !== '2'}">&#10003;</span>
          </div>
          <div class="inline-block">
            <i>3. Miễn<i>{{__t3('3. Miễn')}}</i></i> <span class="square-text mrr5" :class="{'hidden-text': Data.Customer.MOHObject !== '3'}">&#10003;</span>
            <i>4. Khác<i>{{__t3('4. Khác')}}</i></i> <span class="square-text" :class="{'hidden-text': Data.Customer.MOHObject !== '4'}">&#10003;</span>
          </div>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b2">
      <tr v-if="routeType !== 'Neonatal'">
        <td colspan="2">
          <div class="flex align-center">
            <div class="mrr20">{{dex[10]}} BHYT giá trị đến ngày<i>{{__t3('BHYT giá trị đến ngày')}}</i>: {{Data.Customer.ExpireHealthInsuranceDate || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
            <div>Số thẻ BHYT<i>{{__t3('Số thẻ BHYT')}}</i>: {{Data.Customer.HealthInsuranceNumber}}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div v-if="routeType === 'Gynecological'">{{dex[11]}} Họ tên, địa chỉ người nhà khi cần báo tin<i>/ Emergency contact person</i>: {{trim_(Data.Customer.Relationship) || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
          <div v-else>{{dex[11]}} Họ tên, địa chỉ người nhà khi cần báo tin<i>{{__t3('Họ tên, địa chỉ người nhà khi cần báo tin')}}</i>: {{trim_(Data.Customer.Relationship) || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
          <div v-if="routeType === 'Gynecological'" style="margin-left: 20px;">Điện thoại số<i>/ Phone No</i>: {{Data.Customer.RelationshipContact || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
          <div v-else style="margin-left: 20px;">Điện thoại số<i>{{__t3('Điện thoại số')}}</i>: {{Data.Customer.RelationshipContact || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</div>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b font9pt-">
      <tr>
        <td class="cap" style="border: none" colspan="2"><h4><b>II. QUẢN LÝ NGƯỜI BỆNH<i>{{__t3('QUẢN LÝ NGƯỜI BỆNH')}}</i></b></h4></td>
      </tr>
      <tr>
        <td class="font9pt- on-top" width="60%" style="padding: 10px!important;">
          <span v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'">{{dex[12]}} Vào viện lúc<i>{{__t3('Vào viện lúc-mdc')}}</i>: {{Data.ReadOnly.Twelve | viDisplayformatDateTime2}}<br/></span>
          <span v-else class="word-break">{{dex[12]}} Vào viện lúc<i>{{__t3('Vào viện lúc-mdc')}}</i>: {{Data.ReadOnly.Twelve}}
            <br/>
          </span>
          {{dex[13]}} Trực tiếp vào<i>{{__t3('Trực tiếp vào')}}</i>:
          <template v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'">
            <i :key="index" v-for="(type, index) in VisitTypes" class="mrl10"> {{type.ViName}}<i class="square-text" :class="{'hidden-text': type.Value !== Data.ReadOnly.Thirteen}">&#10003;</i></i>
          </template>
          <template v-else>
            <VTich2
              :noneDex="true"
              :showLabel="true"
              :listData="VisitTypes"
              class="italic mrl10"
              :t3="true"
              :dataloaitru="Data.ReadOnly.Thirteen"
            />
          </template>
        </td>
        <td class="font9pt-" v-if="MASTERDATA['IPDMRPONOGT']" style="padding: 10px!important;">
          {{dex[14]}} Nơi giới thiệu<i>{{__t3('Nơi giới thiệu')}}</i>:
          <!-- <i :key="index" v-for="(item, index) in MASTERDATA['IPDMRPONOGT'].Items" v-if="item.DataType === 'Radio'" style="margin-left: 5px!important;"> {{item.ViName}} <i class="square-text" :class="{'hidden-text': !item.Value}">&#10003;</i></i> -->
          <!-- <br/> -->
          <BMTIMMACH1Print v-if="routeType === 'CardiovascularForm'" :MASTERDATA="MASTERDATA"/>
          <template v-else>
            <div class="mrl10">
              <VTich2
                :noneDex="true"
                :showLabel="true"
                :listData="MASTERDATA['IPDMRPONOGT'].Items"
                class="italic"
                :indexs="[0, 1, 2]"
                v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'"
              />
              <VTich2
                :noneDex="true"
                :showLabel="true"
                :listData="MASTERDATA['IPDMRPONOGT'].Items"
                :indexs="[0, 1, 2]"
                class="italic inline"
                :t3="true"
                v-else
              />
              <div class="inline">{{MASTERDATA['IPDMRPONOGT'].Items[3].Value}}</div>
            </div>
          </template>
          <div>
            - Vào viện do bệnh này lần thứ<i>{{__t3('Vào viện do bệnh này lần thứ')}}</i> <CharWithSquare :text="getValueOfMASTERDATA('IPDMRPOVVDB', 'IPDMRPOVVDBANS')" :defaultlength="1"  />
          </div>
        </td>
      </tr>
      <tr>
        <td style="vertical-align: top;padding: 10px;">
          <table width="100%" class="tbl-b2" v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'">
            <tr>
              <td rowspan="3" style="text-align: left;">{{dex[15]}} Vào khoa:</td>
              <td>Khoa</td>
              <td>Ngày/Tháng/Năm</td>
              <td class="text-right" style="white-space: nowrap;">Số ngày điều trị</td>
            </tr>
            <tr>
              <td><span class="square-text">{{Data.ReadOnly.Fifteen.CurrentSpecialty.ViName}}</span></td>
              <td><span>{{Data.ReadOnly.Fifteen.CurrentDate}}</span></td>
              <td class="text-right"><span class="square-text" :class="{'hidden-text': !Data.ReadOnly.Nineteen}">{{Data.ReadOnly.Nineteen || '&#10003;'}}</span></td>
            </tr>
            <tr>
              <td colspan="3">
                Bác sỹ điều trị chính: {{Data.ReadOnly.Fifteen.CurrentDoctor.Fullname}}
              </td>
            </tr>
            <template v-if="Data.ReadOnly.Sixteen.length">
              <template v-if="Data.ReadOnly.Sixteen.length === 1">
              <tr>
                <td rowspan="4" style="vertical-align: top" class="vertical-align-top">{{dex[16]}} Chuyển khoa:</td>
                <td><span class="square-text">{{(Data.ReadOnly.Sixteen[0].TransferSpecialty.ViName)}}</span></td>
                <td><span>{{Data.ReadOnly.Sixteen[0].TransferDate}}</span></td>
                <td class="text-right"><span class="square-text">{{getDaysBetweenDate(Data.ReadOnly.Sixteen[0].TransferRawDate, Data.ReadOnly.Sixteen[0].DischargeDate) || 0}}</span></td>
              </tr>
              <tr>
                <td colspan="3">
                  Bác sỹ điều trị chính: {{Data.ReadOnly.Sixteen[0].TransferDoctor.Fullname}}
                </td>
              </tr>
              <tr>
                <td><span class="square-text hidden-text">0000000</span></td>
                <td><span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span></td>
                <td class="text-right"><span class="square-text hidden-text">0</span></td>
              </tr>
              <tr>
                <td colspan="3">
                  Bác sỹ điều trị chính: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                </td>
              </tr>
              </template>
              <template v-else>
                <template v-for="(item, index) in Data.ReadOnly.Sixteen">
                  <tr :key="'t' + index">
                    <td v-if="index === 0" :rowspan="Data.ReadOnly.Sixteen.length * 2" style="vertical-align: top" class="vertical-align-top">{{dex[16]}} Chuyển khoa:</td>
                    <td><span class="square-text">{{(item.TransferSpecialty.ViName)}}</span></td>
                    <td><span>{{item.TransferDate}}</span></td>
                    <td class="text-right"><span class="square-text">{{getDaysBetweenDate(item.TransferRawDate, item.DischargeDate) || 0}}</span></td>
                  </tr>
                  <tr :key="'u' + index">
                    <td colspan="3">
                      Bác sỹ điều trị chính: {{item.TransferDoctor.Fullname}}
                    </td>
                  </tr>
                </template>
              </template>
            </template>
            <template v-else>
              <tr>
                <td rowspan="4" style="vertical-align: top" class="vertical-align-top">16. Chuyển khoa:</td>
                <td><span class="square-text hidden-text">0000000</span></td>
                <td><span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span></td>
                <td class="text-right"><span class="square-text hidden-text">&#10003;</span></td>
              </tr>
              <tr>
                <td colspan="3">
                  Bác sỹ điều trị chính: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                </td>
              </tr>
              <tr>
                <td><span class="square-text hidden-text">0000000</span></td>
                <td><span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span></td>
                <td class="text-right"><span class="square-text hidden-text">&#10003;</span></td>
              </tr>
              <tr>
                <td colspan="3">
                  Bác sỹ điều trị chính: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                </td>
              </tr>
            </template>
          </table>
          <table width="100%" class="tbl-b2" v-else>
            <tr class="on-top">
              <td colspan="3">
                <div class="flex">
                  <div style="margin-right: 50px;">
                    <div>Khoa</div>
                    <div class="italic">Department</div>
                  </div>
                  <div style="margin-right: 50px;">
                    <div>ngày/tháng/năm</div>
                    <div class="italic">date/month/year</div>
                  </div>
                  <div>
                    <div>Số ngày điều trị</div>
                    <div class="italic word-break">The total of <span class="white-space">treatment days</span></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="3">{{dex[15]}} Vào khoa{{__t3('Vào khoa')}}:</td>
            </tr>
            <tr class="on-top">
              <td width="9%"><span class="square-text">{{Data.ReadOnly.Fifteen.CurrentSpecialty.ViName}}</span></td>
              <td width="68%">
                <div>{{Data.ReadOnly.Fifteen.CurrentDate}}</div>
                <div><span class="inline">Bác sỹ điều trị chính<i>{{__t3('Bác sỹ điều trị chính')}}</i></span>: {{Data.ReadOnly.Fifteen.CurrentDoctor.Fullname}}</div>
              </td>
              <td class="text-right"><span class="square-text" :class="{'hidden-text': !Data.ReadOnly.Nineteen}">{{Data.ReadOnly.Nineteen || '&#10003;'}}</span></td>
            </tr>
            <tr>
              <td colspan="3">{{dex[16]}} Chuyển khoa{{__t3('Chuyển khoa')}}:</td>
            </tr>
            <template v-if="Data.ReadOnly.Sixteen.length">
              <template v-if="Data.ReadOnly.Sixteen.length === 1">
              <tr>
                <td><span class="square-text">{{(Data.ReadOnly.Sixteen[0].TransferSpecialty.ViName)}}</span></td>
                <td>
                  <div>{{Data.ReadOnly.Sixteen[0].TransferDate | viDisplayformatDateTime4}}</div>
                  <div><span class="inline">Bác sỹ điều trị chính<i>{{__t3('Bác sỹ điều trị chính')}}</i></span>: {{Data.ReadOnly.Sixteen[0].TransferDoctor.Fullname}}</div>
                </td>
                <td class="text-right"><span class="square-text">{{getDaysBetweenDate(Data.ReadOnly.Sixteen[0].TransferRawDate, Data.ReadOnly.Sixteen[0].DischargeDate) || 0}}</span></td>
              </tr>
              </template>
              <template v-else>
                <template v-for="(item, index) in Data.ReadOnly.Sixteen">
                  <tr :key="'t' + index">
                    <td><span class="square-text">{{(item.TransferSpecialty.ViName)}}</span></td>
                    <td><span>{{item.TransferDate | viDisplayformatDateTime4}}</span></td>
                    <td class="text-right"><span class="square-text">{{getDaysBetweenDate(item.TransferRawDate, item.DischargeDate) || 0}}</span></td>
                  </tr>
                  <tr :key="'u' + index">
                    <td></td>
                    <td>
                      <span class="inline">Bác sỹ điều trị chính<i>{{__t3('Bác sỹ điều trị chính')}}</i></span>: {{item.TransferDoctor.Fullname}}
                    </td>
                    <td></td>
                  </tr>
                </template>
              </template>
            </template>
          </table>
        </td>
        <td style="vertical-align: top;padding: 10px;" v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'">
          <div class="mrl10" style="font-size: 14px;text-align: left;">
            {{dex[17]}} Chuyển viện: <i style="font-size: 14px;margin-bottom: 10px;display: inline-block;margin-left: 5px!important;" :key="index" v-for="(type, index) in InterHospitalInfo"> {{type.ViName}} <i class="square-text" :class="{'hidden-text': !type.Value}">&#10003;</i></i><br/>
          </div>
          <p>- Chuyển đến: {{InterHospitalInfoTo || ''}}</p>
          <p>{{dex[18]}} Ra viện: {{Data.ReadOnly.Eighteen | viDisplayformatDateTime2}}</p>
          <template v-if="MASTERDATA['IPDMRPTHTRV']">
            <i style="margin-bottom: 10px;display: inline-block;margin-left: 5px!important;" :key="index + 'x3'" v-for="(item, index) in MASTERDATA['IPDMRPTHTRV'].Items" v-if="item.DataType === 'Radio'"> {{getName(item.ViName)}} <i class="square-text" :class="{'hidden-text': !item.Value}">&#10003;</i></i>
          </template><br/>
          <div style="display: flex!important;align-items: center!important;justify-content: space-between!important;"><p>{{dex[19]}} Tổng số ngày điều trị:</p> <p><CharWithSquare :text="Data.ReadOnly.Nineteen" :defaultlength="3" :right="true"/></p></div>
        </td>
        <td style="vertical-align: top;padding: 10px;" v-else>
          <div style="font-size: 14px;text-align: left;">
            {{dex[17]}} Chuyển viện<i>{{__t3('Chuyển viện-mdc')}}</i>:
            <div class="mrl10">
              <VTich2
                :noneDex="true"
                :showLabel="true"
                :listData="InterHospitalInfo"
                class="italic"
                :t3="true"
              />
            </div>
          </div>
          <p>- Chuyển đến<i>{{__t3('Chuyển đến')}}</i>: {{InterHospitalInfoTo || ''}}</p>
          <p v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'">{{dex[18]}} Ra viện: {{Data.ReadOnly.Eighteen}}</p>
          <p v-else>{{dex[18]}} Ra viện<i>{{__t3('18. Ra viện')}}</i>: {{Data.ReadOnly.Eighteen}}</p>
          <template v-if="MASTERDATA['IPDMRPTHTRV']">
            <VTich2
              :noneDex="true"
              :showLabel="true"
              :listData="MASTERDATA['IPDMRPTHTRV'].Items"
              class="italic mrl10"
              :t3="true"
            />
          </template><br/>
          <div>
            <div>{{dex[19]}} Tổng số ngày điều trị<i>{{__t3('Tổng số ngày điều trị')}}</i>:</div>
            <div style="text-align: right;height: 28px;"><CharWithSquare :text="Data.ReadOnly.Nineteen" :defaultlength="3" :right="true"/></div>
          </div>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b font9pt-">
      <tr>
        <td style="border: none" colspan="2">
          <div class="flex align-center" v-if="routeType === 'A01_039_050919_V'">
            <h4 style="margin-right: 0px;min-width: 300px;"><b>III. CHẨN ĐOÁN<i>{{__t3('CHẨN ĐOÁN')}}</i></b></h4>
            <div style="margin-right: 298px;">MÃ/<i>CODE</i></div>
            <div>MÃ/<i>CODE</i></div>
          </div>
          <div class="flex align-center" v-else-if="routeType === 'Obstetrics'">
            <h4 style="margin-right: 31px;min-width: 271px;"><b>III. CHẨN ĐOÁN<i>{{__t3('CHẨN ĐOÁN')}}</i></b></h4>
            <div style="margin-right: 307px;">MÃ/<i>CODE</i></div>
            <div>MÃ/<i>CODE</i></div>
          </div>
          <div class="flex align-center" v-else>
            <h4 style="margin-right: 31px;min-width: 300px;"><b>III. CHẨN ĐOÁN<i>{{__t3('CHẨN ĐOÁN')}}</i></b></h4>
            <div style="margin-right: 240px;">MÃ/<i>CODE</i></div>
            <div>MÃ/<i>CODE</i></div>
          </div>
        </td>
      </tr>
      <tr v-if="routeType === 'Obstetrics'" >
        <td colspan="2" style="padding: 0px;border: none;">
          <ObstetricsPrint1
          :DataSubmitReadOnlyICD20="DataSubmitReadOnlyICD20"
          :DataSubmitReadOnlyICD21="DataSubmitReadOnlyICD21"
          :Data="Data"
          ref="ObstetricsPrint1"
          :optionChild="optionChild"
          :ListSoSinh="ListSoSinh"
          :MASTERDATA="MASTERDATA"/>
        </td>
      </tr>
      <tr v-else-if="routeType === 'Gynecological' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'Eye'">
        <td style="vertical-align: top;padding: 10px; width: 50%;">
          <GynecologicalPrint1
          :box1="true"
          :MASTERDATA="MASTERDATA"
          :DataSubmitReadOnlyICD20="DataSubmitReadOnlyICD20"
          :DataSubmitReadOnlyICD21="DataSubmitReadOnlyICD21"
          :Data="Data"
          :routeType="routeType"/>
        </td>
        <td style="vertical-align: top;padding: 10px; width: 50%;">
          <GynecologicalPrint1
          :box2="true"
          :MASTERDATA="MASTERDATA"
          :DataSubmitReadOnlyICD20="DataSubmitReadOnlyICD20"
          :DataSubmitReadOnlyICD21="DataSubmitReadOnlyICD21"
          :Data="Data"
          :routeType="routeType"/>
        </td>
      </tr>
      <tr v-else-if="routeType === 'Oncology'">
        <td style="vertical-align: top;padding: 10px; width: 50%;">
          <OncologylPrint1
          :box1="true"
          :MASTERDATA="MASTERDATA"
          :DataSubmitReadOnlyICD20="DataSubmitReadOnlyICD20"
          :DataSubmitReadOnlyICD21="DataSubmitReadOnlyICD21"
          :Data="Data"/>
        </td>
        <td style="vertical-align: top;padding: 10px; width: 50%;">
          <OncologylPrint1
          :box2="true"
          :MASTERDATA="MASTERDATA"
          :DataSubmitReadOnlyICD20="DataSubmitReadOnlyICD20"
          :DataSubmitReadOnlyICD21="DataSubmitReadOnlyICD21"
          :Data="Data"/>
        </td>
      </tr>
      <tr v-else>
        <td width="60%" class="font9pt-" style="padding: 5px 10px 10px 10px!important;vertical-align: top;">
          <table width="100%" class="tbl-b2">
            <tr>
              <td>
                {{dex[20]}} Nơi chuyển đến<i>{{__t3('Nơi chuyển đến')}}</i>: {{MASTERDATA['IPDMRPOCDNC'] ? MASTERDATA['IPDMRPOCDNC'].Items[0].Value : ''}}
              </td>
              <td style="text-align: right;" v-if="MASTERDATA['IPDMRPOMICD']"><CharWithSquare :text="getICD10Code(DataSubmitReadOnlyICD20)" :defaultlength="4"  /></td>
            </tr>
            <tr>
              <td>
                {{dex[21]}} Khoa khám bệnh, cấp cứu<i>{{__t3('Khoa khám bệnh, cấp cứu')}}</i>:{{(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentDiagnosis) ? Data.ReadOnly.TwentyOne.CurrentDiagnosis : ''}}
              </td>
              <td style="text-align: right;"><CharWithSquare :text="(Data.ReadOnly.TwentyOne && Data.ReadOnly.TwentyOne.CurrentICD) && getICD10Code(DataSubmitReadOnlyICD21)" :defaultlength="4"  /></td>
            </tr>
            <tr>
              <td>
                  {{dex[22]}} Khi vào khoa điều trị<i>{{__t3('Khi vào khoa điều trị')}}</i>: {{MASTERDATA['IPDMRPTCDBC'] ? MASTERDATA['IPDMRPTCDBC'].Items[0].Value : ''}}
              </td>
              <td style="text-align: right;" v-if="MASTERDATA['IPDMRPTICDC']"><CharWithSquare :text="getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
            <tr v-if="routeType !== 'A01_195_050919_V'">
              <td v-if="MASTERDATA['IPDMRPTTHPT'] && routeType === 'Neonatal'" colspan="2">
                <template>
                  <div class="mrl10 italic mrb10" :key="index + 'xx3'" v-for="(item, index) in MASTERDATA['IPDMRPTTHPT'].Items" v-if="item.DataType === 'CheckBox'"> {{item.ViName}} sau sinh<i>{{__t3(`${item.ViName} sau sinh`)}}</i> <i class="square-text" :class="{'hidden-text': !item.Value}">&#10003;</i></div>
                </template>
              </td>
              <td v-if="MASTERDATA['IPDMRPTTHPT'] && routeType !== 'Neonatal'" colspan="2">
                <template>
                  <span class="ml-10"></span><i :key="index + 'xx3'" v-for="(item, index) in MASTERDATA['IPDMRPTTHPT'].Items" v-if="item.DataType === 'CheckBox'"> {{item.ViName}}<i>{{__t3(item.ViName)}}</i> <i class="square-text" :class="{'hidden-text': !item.Value}">&#10003;</i></i>
                </template>
              </td>
            </tr>
            <template v-else>
              <tr>
                <td colspan="2" v-if="MASTERDATA['IPDMRPE898']">
                  <span class="mrr10">- Tai biến<i>/ Accident</i>:</span> <VTich class="mrr10" v-model="MASTERDATA['IPDMRPE898'].Items[0].Value" /> <span class="mrr10">- Biến chứng<i>/ Complication</i>:</span> <VTich v-model="MASTERDATA['IPDMRPE898'].Items[1].Value" />
                </td>
              </tr>
              <tr>
                <td colspan="2" v-if="MASTERDATA['IPDMRPE901']">
                  <i><VTich :t3="true" :styleCustom="'margin-right: 5px !important; display: inline-block !important;'" :listData="MASTERDATA['IPDMRPE901'].Items" /></i>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="flex align-center space-between" v-if="MASTERDATA['IPDMRPE896']">
                    <div class="mrr10">23. Tổng số ngày điều trị sau phẫu thuật<i>/ Post-operative hospital stay</i>:</div>
                    <div><CharWithSquare :text="MASTERDATA['IPDMRPE896'].Items[0].Value" :defaultlength="3"  /></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div class="flex align-center space-between" v-if="MASTERDATA['IPDMRPE894']">
                    <div class="mrr10">24. Tổng số lần phẫu thuật<i>/ Surgical times</i>: </div>
                    <div><CharWithSquare :text="MASTERDATA['IPDMRPE894'].Items[0].Value" :defaultlength="2"  /></div>
                  </div>
                </td>
              </tr>
            </template>
          </table>
        </td>
        <td class="font9pt-" style="padding: 10px;vertical-align: top;">
          {{dex[23]}} Ra viện<i>{{__t3('Ra viện')}}</i>:<br/>
          <table width="100%" class="tbl-b2">
            <tr>
              <td>+ Bệnh chính<i>{{__t3('Bệnh chính')}}</i>: {{MASTERDATA['IPDMRPECDBC'] ? MASTERDATA['IPDMRPECDBC'].Items[0].Value : ''}}</td>
              <td style="text-align: right;" v-if="MASTERDATA['IPDMRPEICDC']"><CharWithSquare :text="getICD10Code(MASTERDATA['IPDMRPEICDC'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
            <tr>
              <td v-if="MASTERDATA['IPDMRPECDKT']">
                <span class="word-break">
                  + Bệnh kèm theo<i>{{__t3('Bệnh kèm theo')}}</i>: {{MASTERDATA['IPDMRPECDKT'].Items[0].Value}}
                </span>
              </td>
              <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPEICDP'] && !getICD10Codex2(MASTERDATA['IPDMRPEICDP'].Items[0].Value)" :defaultlength="4"/></td>
            </tr>
            <tr :key="index" v-for="(item, index) in getICD10Codex(MASTERDATA['IPDMRPEICDP'].Items[0].Value)">
              <td>
                {{item.ViName}}
              </td>
              <td style="text-align: right;">
                <CharWithSquare :text="item.code" :defaultlength="4"  />
              </td>
            </tr>
            <tr v-if="routeType !== 'A01_195_050919_V'">
              <td colspan="2">
                <template v-if="MASTERDATA['IPDMRPETHPT']">
                  <span class="ml-10"></span>
                  <VTich2
                    class="inline itaclic"
                    :noneDex="true"
                    :showLabel="true"
                    :listData="MASTERDATA['IPDMRPETHPT'].Items"
                    :indexs=[1]
                    :t3="true"
                    :congNgang="true"
                    v-if="(routeType === 'A01_034_050919_V' && Data.Version >= 2)"
                  />
                  <VTich2
                    :noneDex="true"
                    :showLabel="true"
                    :listData="MASTERDATA['IPDMRPETHPT'].Items"
                    class="itaclic"
                    :t3="true"
                    v-else
                  />
                </template>
              </td>
            </tr>
            <template v-else>
              <!-- Chẩn đoán trước phẫu thuật -->
              <tr>
                <td v-if="MASTERDATA['IPDMRPE888']">
                  + Chẩn đoán trước phẫu thuật<i>/ re-operative diagnosis</i>: {{MASTERDATA['IPDMRPE888'].Items[1].Value}}
                </td>
                <td style="text-align: right;">
                  <CharWithSquare v-if="MASTERDATA['IPDMRPE888'] && !getICD10Codex2(MASTERDATA['IPDMRPE888'].Items[0].Value)" :defaultlength="4"/>
                </td>
              </tr>
              <tr :key="index" v-for="(item, index) in getICD10Codex(MASTERDATA['IPDMRPE888'].Items[0].Value)">
                <td>
                  {{item.ViName}}
                </td>
                <td style="text-align: right;">
                  <CharWithSquare :text="item.code" :defaultlength="4"  />
                </td>
              </tr>
              <!-- end -->
              <!-- Chẩn đoán sau phẫu thuật -->
              <tr>
                <td v-if="MASTERDATA['IPDMRPE891']">
                  + Chẩn đoán sau phẫu thuật<i>/ Post-operative diagnosis</i>: {{MASTERDATA['IPDMRPE891'].Items[1].Value}}
                </td>
                <td style="text-align: right;">
                  <CharWithSquare v-if="MASTERDATA['IPDMRPE891'] && !getICD10Codex2(MASTERDATA['IPDMRPE891'].Items[0].Value)" :defaultlength="4"/>
                </td>
              </tr>
              <tr :key="index" v-for="(item, index) in getICD10Codex(MASTERDATA['IPDMRPE891'].Items[0].Value)">
                <td>
                  {{item.ViName}}
                </td>
                <td style="text-align: right;">
                  <CharWithSquare :text="item.code" :defaultlength="4"  />
                </td>
              </tr>
              <!-- end -->
            </template>
          </table>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b font9pt-">
      <tr>
        <td style="border: none" colspan="2"><h4><b>IV. TÌNH TRẠNG RA VIỆN<i>{{__t3('TÌNH TRẠNG RA VIỆN')}}</i></b></h4></td>
      </tr>
      <tr>
        <td v-if="routeType && checkRoute() && routeType !== 'CardiovascularForm'" width="47%" style="vertical-align: top;padding: 10px;" :style="(routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? 'width: 50%;' : ''">
          {{dex[24]}} Kết quả điều trị
          <table width="100%" class="tbl-b2" :class="(routeType === 'Obstetrics' || routeType === 'A01_195_050919_V' || routeType ==='Oncology') ? 'italic' : ''" v-if="MASTERDATA['IPDMRPEKQDT']">
            <tr :class="(routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? 'italic' : ''">
              <td>{{MASTERDATA['IPDMRPEKQDT'].Items[0].ViName}}<i class="square-text float-right" :class="{'hidden-text': !MASTERDATA['IPDMRPEKQDT'].Items[0].Value}">&#10003;</i></td>
              <td>{{MASTERDATA['IPDMRPEKQDT'].Items[3].ViName}}<i class="square-text float-right" :class="{'hidden-text': !MASTERDATA['IPDMRPEKQDT'].Items[3].Value}">&#10003;</i></td>
            </tr>
            <tr :class="(routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? 'italic' : ''">
              <td>{{MASTERDATA['IPDMRPEKQDT'].Items[1].ViName}}<i class="square-text float-right" :class="{'hidden-text': !MASTERDATA['IPDMRPEKQDT'].Items[1].Value}">&#10003;</i></td>
              <td>{{MASTERDATA['IPDMRPEKQDT'].Items[4].ViName}}<i class="square-text float-right" :class="{'hidden-text': !MASTERDATA['IPDMRPEKQDT'].Items[4].Value}">&#10003;</i></td>
            </tr>
            <tr :class="(routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? 'italic' : ''">
              <td>{{MASTERDATA['IPDMRPEKQDT'].Items[2].ViName}}<i class="square-text float-right" :class="{'hidden-text': !MASTERDATA['IPDMRPEKQDT'].Items[2].Value}">&#10003;</i></td>
              <td></td>
            </tr>
          </table>
          {{dex[25]}} Giải phẫu bệnh (khi có sinh thiết):<br/>
          <i>Bệnh phẩm:</i> {{MASTERDATA['IPDMRPEBEPH'] ? MASTERDATA['IPDMRPEBEPH'].Items[0].Value : ''}}<br/>
          <VTich v-if="MASTERDATA['IPDMRPEGPBT'] && routeType !== 'Eye'"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :listData="MASTERDATA['IPDMRPEGPBT'].Items"
            styleCustom="margin-right: 5px!important;"
            />
          <VTich v-if="MASTERDATA['IPDMRPEGPBT'] && routeType === 'Eye'"
            :showLabel="true"
            :noneDex="true"
            class="mrl10"
            :listData="MASTERDATA['IPDMRPEGPBT'].Items"
            styleCustom="margin-right: 5px!important;"
            />
          <!-- <template v-if="MASTERDATA['IPDMRPEGPBT']">
            <span></span><i :key="index + 'x1x3'" v-for="(item, index) in MASTERDATA['IPDMRPEGPBT'].Items" v-if="item.DataType === 'Radio'"> {{item.ViName}} <i class="square-text" :class="{'hidden-text': !item.Value}">&#10003;</i></i>
          </template> -->
        </td>
        <td v-else width="60%" style="vertical-align: top;padding: 10px;">
          {{dex[24]}} Kết quả điều trị<i>{{__t3('Kết quả điều trị')}}</i>
          <VTich2 v-if="MASTERDATA['IPDMRPEKQDT']"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :indexs="[0]"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEKQDT'].Items"
            styleCustom="margin-right: 5px!important;"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPEKQDT']"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :indexs="[1]"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEKQDT'].Items"
            styleCustom="margin-right: 5px!important;"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPEKQDT']"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :indexs="[2]"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEKQDT'].Items"
            styleCustom="margin-right: 5px!important;"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPEKQDT']"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :indexs="[3]"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEKQDT'].Items"
            styleCustom="margin-right: 5px!important;"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPEKQDT'] && routeType === 'Obstetrics'"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :indexs="[5]"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEKQDT'].Items"
            styleCustom="margin-right: 5px!important;"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPEKQDT']"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :indexs="[4]"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEKQDT'].Items"
            styleCustom="margin-right: 5px!important;"
          />
          {{dex[25]}} Giải phẫu bệnh (khi có sinh thiết)<i>{{__t3('Giải phẫu bệnh (khi có sinh thiết)')}}</i>:<br/>
          <i>Bệnh phẩm{{__t3('Bệnh phẩm')}}:</i> {{MASTERDATA['IPDMRPEBEPH'] ? MASTERDATA['IPDMRPEBEPH'].Items[0].Value : ''}}<br/>
          <VTich2 v-if="MASTERDATA['IPDMRPEGPBT']"
            :showLabel="true"
            :noneDex="true"
            class="italic"
            :t3="true"
            :listData="MASTERDATA['IPDMRPEGPBT'].Items"
            styleCustom="margin-right: 5px!important;"
            />
        </td>
        <td style="padding: 7px;vertical-align: top;" v-if="routeType === 'A01_034_050919_V' || routeType === 'CardiovascularForm'">
          <p>{{dex[26]}} Tình hình tử vong<i>{{__t3('Tình hình tử vong')}}</i>: {{MASTERDATA['IPDMRPTNGTV'].Items[0].Value | viDisplayformatDateTime2}}</p>
          <VTich2 v-if="MASTERDATA['IPDMRPTLDTV']"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="true"
            :listData="MASTERDATA['IPDMRPTLDTV'].Items"
            :indexs="[0]"
          />
          <!-- 1. Trong 24h vào viện -->
          <!-- 2. Sau 24 giờ vào viện -->
          <!-- 2.Trong 48 giờ vào viện -->
          <!-- 3. Trong 72 giờ vào viện -->
          <VTich2 v-if="MASTERDATA['IPDMRPTTTTV']"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="true"
            :indexs="[0]"
            :listData="MASTERDATA['IPDMRPTTTTV'].Items"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPTLDTV'] && routeType !== 'A01_195_050919_V'"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="true"
            :listData="MASTERDATA['IPDMRPTLDTV'].Items"
            :indexs="[1]"
          />
          <VTich2
            v-if="MASTERDATA['IPDMRPTTTTV'] && routeType !== 'Gynecological' && routeType !== 'A01_040_050919_V' && routeType !== 'Eye' && routeType !== 'A01_039_050919_V'"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="true"
            :indexs="[1]"
            :listData="MASTERDATA['IPDMRPTTTTV'].Items"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPTLDTV']"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="true"
            :listData="MASTERDATA['IPDMRPTLDTV'].Items"
            :indexs="[2]"
          />
          <table width="100%" class="tbl-b2">
            <tr>
              <td style="padding-left:0px;height: 50px;">
                {{dex[27]}} Nguyên nhân chính tử vong<i>/ Reason for passing away</i>: {{MASTERDATA['IPDMRPTBCTV'] ? MASTERDATA['IPDMRPTBCTV'].Items[0].Value : ''}}
              </td>
              <td style="text-align: right;"><CharWithSquare :right="true" v-if="MASTERDATA['IPDMRPTICDT']" :text="getICD10Code(MASTERDATA['IPDMRPTICDT'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
            <tr>
              <td style="padding-left:0px;">
                  {{dex[28]}} Khám nghiệm tử thi<i>/ Autopsy</i>:
              </td>
              <td style="text-align: right;">
                <template v-if="MASTERDATA['IPDMRPTKNTT']">
                    <span class="ml-10"></span><i class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPTKNTT'].Items[0].Value}">&#10003;</i>
                </template>
              </td>
            </tr>
            <tr>
              <td style="padding-left:0px;">
                <p>{{dex[29]}} Chẩn đoán giải phẫu tử thi<i>/ Autopsy diagnosis</i>: {{MASTERDATA['IPDMRPTBCKN'] ? MASTERDATA['IPDMRPTBCKN'].Items[0].Value : ''}}</p>
              </td>
              <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPTICDK']" :text="getICD10Code(MASTERDATA['IPDMRPTICDK'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
          </table>
        </td>
        <td style="padding: 7px;vertical-align: top;" v-else>
          <p>{{dex[26]}} Tình hình tử vong<i>{{__t3('Tình hình tử vong')}}</i>: {{MASTERDATA['IPDMRPTNGTV'].Items[0].Value | viDisplayformatDateTime2}}</p>
          <VTich2 v-if="MASTERDATA['IPDMRPTLDTV']"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="routeType !== 'Oncology' ? true : false"
            :listData="MASTERDATA['IPDMRPTLDTV'].Items"
          />
          <!-- 1. Trong 24h vào viện -->
          <!-- 2. Sau 24 giờ vào viện -->
          <!-- 2.Trong 48 giờ vào viện -->
          <!-- 3. Trong 72 giờ vào viện -->
          <VTich2 v-if="MASTERDATA['IPDMRPTTTTV']"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="routeType !== 'Oncology' ? true : false"
            :indexs="[0]"
            :listData="MASTERDATA['IPDMRPTTTTV'].Items"
          />
          <VTich2
            v-if="MASTERDATA['IPDMRPTTTTV'] && routeType !== 'Gynecological' && routeType !== 'A01_040_050919_V' && routeType !== 'Eye' && routeType !== 'A01_039_050919_V' && routeType !== 'A01_195_050919_V'"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="routeType !== 'Oncology' ? true : false"
            :indexs="[1]"
            :listData="MASTERDATA['IPDMRPTTTTV'].Items"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPTTTTV'] && routeType !== 'Pediatric' && routeType !== 'Obstetrics' && routeType !== 'Neonatal' && routeType !== 'Oncology'"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="routeType !== 'Oncology' ? true : false"
            :indexs="[2]"
            :listData="MASTERDATA['IPDMRPTTTTV'].Items"
          />
          <VTich2 v-if="MASTERDATA['IPDMRPTTTTV'] && routeType !== 'Pediatric' && routeType !== 'Obstetrics' && routeType !== 'Neonatal' && routeType !== 'Oncology'"
            :showLabel="true"
            :noneDex="true"
            class="italic mrl10"
            :t3="routeType !== 'Oncology' ? true : false"
            :indexs="[3]"
            :listData="MASTERDATA['IPDMRPTTTTV'].Items"
          />
          <table width="100%" class="tbl-b2">
            <tr>
              <td style="padding-left:0px;height: 50px;">
                {{dex[27]}} Nguyên nhân chính tử vong<i v-if="routeType !== 'Oncology'">/ Reason for passing away</i>: {{MASTERDATA['IPDMRPTBCTV'] ? MASTERDATA['IPDMRPTBCTV'].Items[0].Value : ''}}
              </td>
              <td style="text-align: right;"><CharWithSquare :right="true" v-if="MASTERDATA['IPDMRPTICDT']" :text="getICD10Code(MASTERDATA['IPDMRPTICDT'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
            <tr>
              <td style="padding-left:0px;">
                  {{dex[28]}} Khám nghiệm tử thi<i v-if="routeType !== 'Oncology'">/ Autopsy</i>:
              </td>
              <td style="text-align: right;">
                <template v-if="MASTERDATA['IPDMRPTKNTT']">
                  <span class="ml-10"></span><i class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPTKNTT'].Items[0].Value}">&#10003;</i>
                </template>
              </td>
            </tr>
            <tr>
              <td style="padding-left:0px;">
                <p>{{dex[29]}} Chẩn đoán giải phẫu tử thi<i v-if="routeType !== 'Oncology'">/ Autopsy diagnosis</i>: {{MASTERDATA['IPDMRPTBCKN'] ? MASTERDATA['IPDMRPTBCKN'].Items[0].Value : ''}}</p>
              </td>
              <td style="text-align: right;"><CharWithSquare v-if="MASTERDATA['IPDMRPTICDK']" :text="getICD10Code(MASTERDATA['IPDMRPTICDK'].Items[0].Value)" :defaultlength="4"  /></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import ObstetricsPrint1 from '@/pages/IPD/MedicalRecord/Page2CPN/ObstetricsPrint1.vue'
// import MixinMasterData from '@/mixins/masterdata.js'
import GynecologicalPrint1 from '@/pages/IPD/MedicalRecord/Page2CPN/GynecologicalPrint1.vue'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import OncologylPrint1 from '@/pages/IPD/MedicalRecord/Page2CPN/OncologylPrint1.vue'
import MasterDatas from '@/services/MasterDatas'
// import utils from '@/utils'
import BMTIMMACH1Print from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH1Print.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecordPrinterPart1',
  mixins: [MedicalRecordMixinForm],
  props: [
    'Data',
    'MASTERDATA',
    'routeType',
    'ListSoSinh',
    'optionChild'
  ],
  data () {
    return {
      hasData: false,
      icd10Code: ['IPDMRPTICDTANSx', 'IPDMRPTICDKANSx', 'IPDMRPTICDCANSx', 'IPDMRPTICDPANS', 'IPDMRPTICDTANSx', 'IPDMRPTICDKANSx', 'IPDMRPEICDCANSx', 'IPDMRPEICDPANS'],
      InterHospitalInfoTo: '',
      InterHospitalInfo: [
        {
          ViName: '1. Tuyến trên',
          EnName: '1. Tuyến trên',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITTR',
          Value: ''
        },
        {
          ViName: '2. Tuyến dưới',
          EnName: '2. Tuyến dưới',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITDU',
          Value: ''
        },
        {
          ViName: '3. Chuyên khoa',
          EnName: '3. Chuyên khoa',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVICKH',
          Value: ''
        }
      ],
      VisitTypes: [
        {
          ViName: '1. Cấp cứu',
          EnName: '1. Cấp cứu',
          DataType: 'Checkbox',
          Value: 'ED'
        },
        {
          ViName: '2. Khoa khám bệnh',
          EnName: '2. Khoa khám bệnh',
          DataType: 'Checkbox',
          Value: 'OPD'
        },
        {
          ViName: '3. Khoa điều trị',
          EnName: '3. Khoa điều trị',
          DataType: 'Checkbox',
          Value: 'IPD'
        }
      ],
      NgheNghiepMeCode: null,
      NgheNghiepBoCode: null,
      dex: [],
      indexs: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ObstetricsPrint1,
    GynecologicalPrint1,
    OncologylPrint1,
    BMTIMMACH1Print
  },
  mounted () {
    if (this.MASTERDATA['IPDMRPTTTTV']) {
      // 1. Trong 24h vào viện
      // 2. Sau 24 giờ vào viện
      // 2. Trong 48 giờ vào viện
      // 3. Trong 72 giờ vào viện
      this.MASTERDATA['IPDMRPTTTTV'].Items.map((e, index) => {
        if (index === 0) {
          e.ViName = '1. Trong 24 giờ vào viện'
          e.EnName = '1. Within 24 hours of admission'
        }
        if (index === 1) {
          e.ViName = '2. Sau 24 giờ vào viện'
          e.EnName = '2. After 24 hours of admission'
        }
        if (index === 2) {
          if (this.routeType === 'Gynecological' || this.routeType === 'Eye') {
            e.ViName = '2. Sau 48 giờ vào viện'
          } else {
            e.ViName = '2. Trong 48 giờ vào viện'
          }
          e.EnName = '2. After 48 hours of admission'
        }
        if (index === 3) {
          e.ViName = '3. Trong 72 giờ vào viện'
          e.EnName = '3. Within 72 hours of admission'
        }
      })
      if (this.routeType === 'Gynecological' || this.routeType === 'Neonatal' || this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V' || this.routeType === 'Eye') {
        this.indexs = [0, 2, 3]
      } else {
        this.indexs = [0, 1]
      }
    }
    if (this.MASTERDATA['IPDMRPTHTRV']) {
      this.MASTERDATA['IPDMRPTHTRV'].Items[0].ViName = '1. Ra viện'
      this.MASTERDATA['IPDMRPTHTRV'].Items[0].EnName = '1. Discharge'
    }
    if (this.MASTERDATA['IPDMRPTTTTV'] && (this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V' || this.routeType === 'Eye')) {
      this.MASTERDATA['IPDMRPTTTTV'].Items[2].ViName = '2. Sau 48 giờ vào viện'
      this.MASTERDATA['IPDMRPTTTTV'].Items[2].EnName = '2. After 48 hours of admission'
    }
    if (this.MASTERDATA['IPDMRPEKQDT'] && this.routeType === 'Obstetrics') {
      this.MASTERDATA['IPDMRPEKQDT'].Items[4].ViName = '6. Tử vong'
      this.MASTERDATA['IPDMRPEKQDT'].Items[4].EnName = '6. Deceased'
    }
    this.InterHospitalInfo.forEach(e => {
      e.Value = this.Data.GeneralDatas.find(f => f.Code === e.Code && (f.Value === 'True'))
    })
    this.dex = this.getIndex(this.$route.meta.type)
    this.getJobList()
    if (this.Data.MoveIn) {
      this.InterHospitalInfoTo = this.Data.MoveIn
    }
    setTimeout(() => {
      this.hasData = true
    }, 500)
  },
  computed: {
    DataSubmitReadOnlyICD21 () {
      if (this.Data.ReadOnly.TwentyOne && this.Data.ReadOnly.TwentyOne.CurrentICD) {
        var CurrentICD = this.JSONParse(this.Data.ReadOnly.TwentyOne.CurrentICD)
        return JSON.stringify(CurrentICD ? [CurrentICD[0]] : [])
      }
      return '[]'
    },
    DataSubmitReadOnlyICD20 () {
      if (this.MASTERDATA['IPDMRPOMICD'].Items[0].Value) {
        var CurrentICD = this.JSONParse(this.MASTERDATA['IPDMRPOMICD'].Items[0].Value)
        return JSON.stringify(CurrentICD ? [CurrentICD[0]] : [])
      }
      return '[]'
    },
    HealthInsuranceNumberFormated () {
      if (this.Data.Customer && this.Data.Customer.HealthInsuranceNumber) {
        var arr = this.Data.Customer.HealthInsuranceNumber.split(' ')
        return arr.length === 4 ? arr : [0, 0, 0, 0]
      }
      return [0, 0, 0, 0]
    },
    age () {
      if (this.Data && this.Data.Customer) {
        return this.Data.Customer.AgeFormated.split('-')
      }
      return ''
    }
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    getICD10Codex (icd) {
      return this.JSONParse(icd, true)
    },
    getICD10Codex2 (icd) {
      let check = false
      if (this.JSONParse(icd)) {
        check = true
      }
      return check
    },
    getName (name) {
      let str = ''
      if (name === '1. Ra viện theo chỉ định') {
        str = '1. Ra viện'
      } else {
        str = name
      }
      return str
    },
    setJobCode (val, data) {
      this.NgheNghiepMeCode = data ? (data.find(e => e.ViName === val) || {}).Note : this.NgheNghiepMeCode
    },
    setJobCode2 (val, data) {
      this.NgheNghiepBoCode = data ? (data.find(e => e.ViName === val) || {}).Note : this.NgheNghiepBoCode
    },
    getJobList () {
      this.getRawMasterDatas({Form: 'GENJOBB'}, (data) => {
        if (data) {
          if (this.MASTERDATA['IPDMRPO66'] && this.MASTERDATA['IPDMRPO66'].Items[0].Value) {
            this.setJobCode(this.MASTERDATA['IPDMRPO66'].Items[0].Value, data)
          }
          if (this.MASTERDATA['IPDMRPO60'] && this.MASTERDATA['IPDMRPO60'].Items[0].Value) {
            this.setJobCode2(this.MASTERDATA['IPDMRPO60'].Items[0].Value, data)
          }
        }
      })
    },
    getRawMasterDatas (query, callback) {
      new MasterDatas(query)
        .all()
        .then(response => {
          callback(response)
        })
    },
    checkRoute () {
      let check = true
      if (
        this.routeType === 'Gynecological' ||
        this.routeType === 'Obstetrics' ||
        this.routeType === 'A01_195_050919_V' ||
        this.routeType === 'A01_040_050919_V' ||
        this.routeType === 'A01_039_050919_V' ||
        this.routeType === 'Pediatric' ||
        this.routeType === 'Eye' ||
        this.routeType === 'Neonatal'
      ) {
        check = false
      }
      return check
    },
    checkDich () {
      let check = false
      if (
        !this.routeType ||
        this.routeType === 'Gynecological' ||
        this.routeType === 'Obstetrics' ||
        this.routeType === 'A01_195_050919_V' ||
        this.routeType === 'A01_040_050919_V' ||
        this.routeType === 'A01_039_050919_V' ||
        this.routeType === 'Pediatric' ||
        this.routeType === 'Eye' ||
        this.routeType === 'Neonatal' ||
        this.routeType === 'CardiovascularForm'
      ) {
        check = true
      }
      return check
    },
    getTypeAge (str) {
      let obj = {}
      if (str === 'DD') {
        obj = {
          ViName: 'Ngày',
          EnName: 'Day'
        }
      }
      if (str === 'MM') {
        obj = {
          ViName: 'Tháng',
          EnName: 'Month'
        }
      }
      if (str === 'YYYY') {
        obj = {
          ViName: 'Năm',
          EnName: 'Year'
        }
      }
      return obj
    }
  }
}
</script>
<style scoped>
.tuoi {
  top: 25px!important;
}
</style>
