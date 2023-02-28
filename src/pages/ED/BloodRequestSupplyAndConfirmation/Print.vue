<template>
  <div>
    <div class="a4-page box hidden" id="printMe" v-if="Data">
      <template v-if="hasShow(1)">
        <table width="100%">
          <tr>
            <td width="20%" valign="top">
              <p><img src="/static/Logo Vinmec International Hospitall 1.png" /></p>
              <p>Số:</p>
            </td>
            <td class="text-center" style="padding: 5px 20px">
              <div class="font20 font-bold text-center">PHIẾU DỰ TRÙ, CUNG CẤP VÀ XÁC NHẬN THỰC HIỆN MÁU - CHẾ PHẨM MÁU</div>
              <i class="font12 font-italic text-center">Liên I: Lưu tại khoa cung cấp máu/ chế phẩm máu</i>
            </td>
            <td width="30%" valign="top">
              <div style="padding: 5px 10px;border: 1px solid;position: relative;font-size: 12px;" v-if="Data.Customer">
                <div class="text-center mg-bt-5"><i>{{__t('Dán PID người bệnh vào đây')}} </i></div>
                <div class="mg-bt-5">{{__t('Họ và tên')}}: {{Data.Customer.Fullname}}</div>
                <div class="mg-bt-5">{{__t('Số PID')}}:  {{Data.Customer.PID}}</div>
                <div class="mg-bt-5">{{__t('Ngày tháng năm sinh')}}: {{Data.Customer.DateOfBirth}}</div>
                <div style="margin: 0;">{{__t('Giới tính')}}: {{Data.Customer.Gender}}</div>
                <div style="padding-left: 60px;padding-top: 7px;position: absolute;">
                  <div class=""><b style="font-size: 20px"> {{!Data.IsFrequently ? '&#9745;' : '&#9744;'}}</b> Cấp cứu</div>
                  <div class=""><b style="font-size: 20px"> {{Data.IsFrequently ? '&#9745;' : '&#9744;'}}</b> Thường quy</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <br/>
        <p class="font16 font-bold">I. DỰ TRÙ MÁU VÀ CHẾ PHẨM MÁU</p>
        <p>Chẩn đoán: {{Data.Diagnosis}}</p>
        <p>Khoa/ phòng: {{this.$store.state.account.Specialty.ViName}}</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="33%">Nhóm máu ABO: {{Data.BloodTypeABO}}</td>
            <td width="33%">Nhóm máu RH: {{Data.BloodTypeRH}}</td>
            <td width="33%">Số lần đã truyền {{Data.TransfusionTime}}</td>
          </tr>
        </table>
        <table width="100%" class="ptag">
          <tr :key="index" v-for="(item, index) in Data.BloodRequestDatas">
            <td v-if="index === 0" style="vertical-align: text-top;" width="200px" :rowspan="Data.BloodRequestDatas.length">Loại chế phẩm cần truyền:</td>
            <td>{{item.Name || ''}}</td>
            <td width="90px" class="no-wrap">Số lượng: {{item.Quanlity}}</td>
            <td width="90px" class="no-wrap">đv ( {{item.Capacity}} ml)</td>
          </tr>
        </table>
        <p class="text-right">Hồi ............ giờ ............ Ngày ............ tháng ............ năm ............</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="50%" >
              <p class="text-center mg-bt-5">Trưởng khoa điều trị</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
            <td>
              <p class="text-center mg-bt-5">Trưởng khoa điều trị</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
          </tr>
        </table>
        <p class="font16 font-bold">II. CUNG CẤP MÁU VÀ CHẾ PHẨM MÁU</p>
        <div :key="index + '-2'" v-for="(supply, index) in Data.BloodSupplyDatas">
          <table width="100%" class="ptag" >
            <tr>
              <td>Loại chế phẩm đã cấp: {{supply.Name || '....................................................'}}</td>
              <td width="1" class="no-wrap">Số lượng {{supply.Quanlity || '................'}} đơn vị</td>
            </tr>
          </table>
          <table width="100%" class="ptag">
            <tr>
              <td colspan="3">Bao gồm các đơn vị máu và chế phẩm có tên người cho / mã hiệu như sau:</td>
            </tr>
            <tr :key="ind + '-' + index" v-for="(item, ind) in supply.Datas">
              <td>{{ind + 1}} {{item.Code}}</td>
              <td width="1" class="no-wrap" style="padding-left: 7px"> Nhóm máu {{item.BloodTypeABO}} {{item.BloodTypeRH}}</td>
              <td width="1" class="no-wrap" style="padding-left: 7px"> Thể tích: {{item.Capacity}} ml</td>
            </tr>
          </table>
          <table width="100%" class="ptag">
            <tr>
              <td width="33%">
                <p class="text-center mg-bt-5">Điều dưỡng</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td>
                <p class="text-center mg-bt-5">Người phụ trách</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td width="33%">
                <p class="text-center mg-bt-5">Người phát máu</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
            </tr>
          </table>
        </div>
        <p class="BreakPage"></p>
      </template>
      <template v-if="hasShow(2)">
        <br/>
        <table width="100%">
          <tr>
            <td width="20%" valign="top">
              <p><img src="/static/Logo Vinmec International Hospitall 1.png" /></p>
              <p>Số:</p>
            </td>
            <td class="text-center" style="padding: 5px 20px">
              <div class="font20 font-bold text-center">PHIẾU DỰ TRÙ, CUNG CẤP VÀ XÁC NHẬN THỰC HIỆN MÁU - CHẾ PHẨM MÁU</div>
              <i class="font12 font-italic text-center">Liên II: Lưu tại hồ sơ bệnh án của người bệnh</i>
            </td>
            <td width="30%" valign="top">
              <div style="padding: 5px 10px;border: 1px solid;position: relative;font-size: 12px;" v-if="Data.Customer">
                <div class="text-center mg-bt-5"><i>{{__t('Dán PID người bệnh vào đây')}} </i></div>
                <div class="mg-bt-5">{{__t('Họ và tên')}}: {{Data.Customer.Fullname}}</div>
                <div class="mg-bt-5">{{__t('Số PID')}}:  {{Data.Customer.PID}}</div>
                <div class="mg-bt-5">{{__t('Ngày tháng năm sinh')}}: {{Data.Customer.DateOfBirth}}</div>
                <div style="margin: 0;">{{__t('Giới tính')}}: {{Data.Customer.Gender}}</div>
                <div style="padding-left: 60px;padding-top: 7px;position: absolute;">
                  <div class=""><b style="font-size: 20px"> {{!Data.IsFrequently ? '&#9745;' : '&#9744;'}}</b> Cấp cứu</div>
                  <div class=""><b style="font-size: 20px"> {{Data.IsFrequently ? '&#9745;' : '&#9744;'}}</b> Thường quy</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <br/>
        <p class="font16 font-bold">I. DỰ TRÙ MÁU VÀ CHẾ PHẨM MÁU</p>
        <p>Chẩn đoán: {{Data.Diagnosis}}</p>
        <p>Khoa/ phòng: {{this.$store.state.account.Specialty.ViName}}</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="33%">Nhóm máu ABO: {{Data.BloodTypeABO}}</td>
            <td width="33%">Nhóm máu RH: {{Data.BloodTypeRH}}</td>
            <td width="33%">Số lần đã truyền {{Data.TransfusionTime}}</td>
          </tr>
        </table>
        <table width="100%" class="ptag">
          <tr :key="index" v-for="(item, index) in Data.BloodRequestDatas">
            <td v-if="index === 0" style="vertical-align: text-top;" width="200px" :rowspan="Data.BloodRequestDatas.length">Loại chế phẩm cần truyền:</td>
            <td>{{item.Name || ''}}</td>
            <td width="90px" class="no-wrap">Số lượng: {{item.Quanlity}}</td>
            <td width="90px" class="no-wrap">đv ( {{item.Capacity}} ml)</td>
          </tr>
        </table>
        <p class="text-right">Hồi ............ giờ ............ Ngày ............ tháng ............ năm ............</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="50%" >
              <p class="text-center mg-bt-5">Trưởng khoa điều trị</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
            <td>
              <p class="text-center mg-bt-5">Trưởng khoa điều trị</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
          </tr>
        </table>
        <p class="font16 font-bold">II. CUNG CẤP MÁU VÀ CHẾ PHẨM MÁU</p>
        <div :key="index + '-tbl2'" v-for="(supply, index) in Data.BloodSupplyDatas">
          <table width="100%" class="ptag" >
            <tr>
              <td>Loại chế phẩm đã cấp: {{supply.Name || '....................................................'}}</td>
              <td width="1" class="no-wrap">Số lượng {{supply.Quanlity || '................'}} đơn vị</td>
            </tr>
          </table>
          <table width="100%" class="ptag">
            <tr>
              <td colspan="3">Bao gồm các đơn vị máu và chế phẩm có tên người cho / mã hiệu như sau:</td>
            </tr>
            <tr :key="ind + '-' + index" v-for="(item, ind) in supply.Datas">
              <td>{{ind + 1}} {{item.Code}}</td>
              <td width="1" class="no-wrap" style="padding-left: 7px"> Nhóm máu {{item.BloodTypeABO}} {{item.BloodTypeRH}}</td>
              <td width="1" class="no-wrap" style="padding-left: 7px"> Thể tích: {{item.Capacity}} ml</td>
            </tr>
          </table>
          <table width="100%" class="ptag">
            <tr>
              <td width="33%">
                <p class="text-center mg-bt-5">Điều dưỡng</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td>
                <p class="text-center mg-bt-5">Người phụ trách</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td width="33%">
                <p class="text-center mg-bt-5">Người phát máu</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
            </tr>
          </table>
        </div>
        <p class="font16 font-bold">III. XÁC NHẬN THỰC HIỆN TRUYỀN MÁU VÀ CHẾ PHẨM MÁU</p>
        <table width="100%" class="ptag">
          <tr>
            <td colspan="2">Đã thực hiện truyền </td>
          </tr>
          <tr :key="index" v-for="(tran, index) in Data.BloodTransDatas">
            <td>{{index + 1}}: {{tran.Code || '....................................................'}}</td>
            <td width="1" class="no-wrap">Số lượng {{tran.Quanlity || '................'}} đv ( {{tran.Capacity}} ml)</td>
          </tr>
        </table>
        <p class="text-right">Hồi ............ giờ ............ Ngày ............ tháng ............ năm ............</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="50%" >
            </td>
            <td>
              <p class="text-center mg-bt-5">Người thực hiện</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
          </tr>
        </table>
        <p class="BreakPage"></p>
      </template>
      <template v-if="hasShow(3)">
        <br/>
        <table width="100%">
          <tr>
            <td width="20%" valign="top">
              <p><img src="/static/Logo Vinmec International Hospitall 1.png" /></p>
              <p>Số:</p>
            </td>
            <td class="text-center" style="padding: 5px 20px">
              <div class="font20 font-bold text-center">PHIẾU DỰ TRÙ, CUNG CẤP VÀ XÁC NHẬN THỰC HIỆN MÁU - CHẾ PHẨM MÁU</div>
              <i class="font12 font-italic text-center">Liên III: Lưu tại Hồ sơ thanh toán của người bệnh</i>
            </td>
            <td width="30%" valign="top">
              <div style="padding: 5px 10px;border: 1px solid;position: relative;font-size: 12px;" v-if="Data.Customer">
                <div class="text-center mg-bt-5"><i>{{__t('Dán PID người bệnh vào đây')}} </i></div>
                <div class="mg-bt-5">{{__t('Họ và tên')}}: {{Data.Customer.Fullname}}</div>
                <div class="mg-bt-5">{{__t('Số PID')}}:  {{Data.Customer.PID}}</div>
                <div class="mg-bt-5">{{__t('Ngày tháng năm sinh')}}: {{Data.Customer.DateOfBirth}}</div>
                <div style="margin: 0;">{{__t('Giới tính')}}: {{Data.Customer.Gender}}</div>
                <div style="padding-left: 60px;padding-top: 7px;position: absolute;">
                  <div class=""><b style="font-size: 20px"> {{!Data.IsFrequently ? '&#9745;' : '&#9744;'}}</b> Cấp cứu</div>
                  <div class=""><b style="font-size: 20px"> {{Data.IsFrequently ? '&#9745;' : '&#9744;'}}</b> Thường quy</div>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <br/>
        <p class="font16 font-bold">I. DỰ TRÙ MÁU VÀ CHẾ PHẨM MÁU</p>
        <p>Chẩn đoán: {{Data.Diagnosis}}</p>
        <p>Khoa/ phòng: {{this.$store.state.account.Specialty.ViName}}</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="33%">Nhóm máu ABO: {{Data.BloodTypeABO}}</td>
            <td width="33%">Nhóm máu RH: {{Data.BloodTypeRH}}</td>
            <td width="33%">Số lần đã truyền {{Data.TransfusionTime}}</td>
          </tr>
        </table>
        <table width="100%" class="ptag">
          <tr :key="index" v-for="(item, index) in Data.BloodRequestDatas">
            <td v-if="index === 0" style="vertical-align: text-top;" width="200px" :rowspan="Data.BloodRequestDatas.length">Loại chế phẩm cần truyền:</td>
            <td>{{item.Name || ''}}</td>
            <td width="90px" class="no-wrap">Số lượng: {{item.Quanlity}}</td>
            <td width="90px" class="no-wrap">đv ( {{item.Capacity}} ml)</td>
          </tr>
        </table>
        <p class="text-right">Hồi ............ giờ ............ Ngày ............ tháng ............ năm ............</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="50%" >
              <p class="text-center mg-bt-5">Trưởng khoa điều trị</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
            <td>
              <p class="text-center mg-bt-5">Trưởng khoa điều trị</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
          </tr>
        </table>
        <p class="font16 font-bold">II. CUNG CẤP MÁU VÀ CHẾ PHẨM MÁU</p>
        <div :key="index + '-tbl32'" v-for="(supply, index) in Data.BloodSupplyDatas">
          <table width="100%" class="ptag" >
            <tr>
              <td>Loại chế phẩm đã cấp: {{supply.Name || '....................................................'}}</td>
              <td width="1" class="no-wrap">Số lượng {{supply.Quanlity || '................'}} đơn vị</td>
            </tr>
          </table>
          <table width="100%" class="ptag">
            <tr>
              <td colspan="3">Bao gồm các đơn vị máu và chế phẩm có tên người cho / mã hiệu như sau:</td>
            </tr>
            <tr :key="ind + '-' + index" v-for="(item, ind) in supply.Datas">
              <td>{{ind + 1}} {{item.Code}}</td>
              <td width="1" class="no-wrap" style="padding-left: 7px"> Nhóm máu {{item.BloodTypeABO}} {{item.BloodTypeRH}}</td>
              <td width="1" class="no-wrap" style="padding-left: 7px"> Thể tích: {{item.Capacity}} ml</td>
            </tr>
          </table>
          <table width="100%" class="ptag">
            <tr>
              <td width="33%">
                <p class="text-center mg-bt-5">Điều dưỡng</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td>
                <p class="text-center mg-bt-5">Người phụ trách</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
              <td width="33%">
                <p class="text-center mg-bt-5">Người phát máu</p>
                <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
                <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              </td>
            </tr>
          </table>
        </div>
        <p class="font16 font-bold">III. XÁC NHẬN THỰC HIỆN TRUYỀN MÁU VÀ CHẾ PHẨM MÁU</p>
        <table width="100%" class="ptag">
          <tr>
            <td colspan="2">Đã thực hiện truyền </td>
          </tr>
          <tr :key="index" v-for="(tran, index) in Data.BloodTransDatas">
            <td>{{index + 1}}: {{tran.Code || '....................................................'}}</td>
            <td width="1" class="no-wrap">Số lượng {{tran.Quanlity || '................'}} đv ( {{tran.Capacity}} ml)</td>
          </tr>
        </table>
        <p class="text-right">Hồi ............ giờ ............ Ngày ............ tháng ............ năm ............</p>
        <table width="100%" class="ptag">
          <tr>
            <td width="50%" >
            </td>
            <td>
              <p class="text-center mg-bt-5">Người thực hiện</p>
              <p class="text-center mg-bt-5"><i>(Họ tên và chữ ký)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
          </tr>
        </table>
      </template>
    </div>
    <modal name="printType" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('Xác nhận in')}}.</h3>
          <div style="color: #fff">{{__t('Chọn các liên muốn in')}}</div>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <div class="group-radio">
              <span :data="item" :key="'EIOSOSCSIAIDR-' + index" v-for="(item,index) in PrintTypes">
                <input type="checkbox" :id="'EIOSOSCSIAIDRradio-' + index" v-model="item.Selected">
                <label :for="'EIOSOSCSIAIDRradio-' + index">{{__label(item)}}</label>
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('printType')">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" :disabled="!hasSelected" @click="confirm()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import BloodRequestSupplyAndConfirmation from '@/services/ED/BloodRequestSupplyAndConfirmation'
import moment from 'moment'
export default {
  name: 'BloodRequestSupplyAndConfirmationPrint',
  props: ['Id'],
  data () {
    return {
      Data: null,
      PrintTypes: [
        {
          ViName: 'Liên 1',
          EnName: 'Liên 1',
          Value: 1,
          Selected: false
        },
        {
          ViName: 'Liên 2',
          EnName: 'Liên 2',
          Value: 2,
          Selected: false
        },
        {
          ViName: 'Liên 3',
          EnName: 'Liên 3',
          Value: 3,
          Selected: false
        }
      ]
    }
  },
  computed: {
    dtnow: function () {
      var now = new Date()
      var d = moment(now).format('HH:mm:DD:MM:YYYY')
      return d.split(':')
    },
    hasSelected: function () {
      return this.PrintTypes.find(e => e.Selected)
    }
  },
  methods: {
    hasShow (index) {
      return this.PrintTypes.find(e => e.Selected && e.Value === index)
    },
    confirm () {
      new BloodRequestSupplyAndConfirmation().find(this.Id + '?hidemsg=' + true).then(response => {
        this.Data = response
        setTimeout(() => {
          this.$htmlToPaper('printMe', false, 'A03_027_050919_V')
        }, 500)
      })
      this.$modal.hide('printType')
    },
    print () {
      this.$modal.show('printType')
    }
  }
}
</script>
