<template>
  <div id="SummaryOf15DayTreatmentItem">
   <modal
    name="doctorConfirm"
    transition="pop-out"
    id="doctor-login"
    height="auto"
    :clickToClose="false"
   >
    <div class="box v-model-content-popup">
     <div class="box-header text-center">
      <h3 class="box-title">{{ __t(popupTitle) }}.</h3>
      <div style="color: #fff">
       {{
        __t(
         "Bác sĩ đang thực hiện tao tác xác nhận biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu. Để xác nhận, nhập thông tin đăng nhập phía dưới"
        )
       }}
      </div>
     </div>
     <div class="form-confirm">
      <div class="form-group has-feedback">
       <input
        v-model="user.username"
        type="text"
        class="form-control"
        :placeholder="__t('Tên đăng nhập')"
       />
       <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
       <input
        v-model="user.password"
        type="password"
        class="form-control current-password"
        :placeholder="__t('Mật khẩu')"
       />
       <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
       <div class="col-xs-6">
        <button
         type="button"
         class="btn btn-block v-white-btn"
         @click="$modal.hide('doctorConfirm');"
        >
         {{ __t("Thoát") }}
        </button>
       </div>
       <div class="col-xs-6">
        <button
         type="button"
         class="btn btn-block v-yellow-btn"
         @click="confirm();"
        >
         {{ __t("Xác nhận") }}
        </button>
       </div>
      </div>
      <p style="margin-top: 10px; text-align:center">
       {{ __t("Sử dụng tài khoản máy tính") }}
      </p>
      <p style="margin-top: 10px; text-align:center">
       {{
        __t(
         "Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu"
        )
       }}
      </p>
     </div>
    </div>
   </modal>
   <template v-if="loaded">
    <div v-if="!readonly" class="content mt-20">
     <h4 class="text-bold">{{ __t("women.tpc") }}</h4>
     <div class="box form-content mbt30">
       <div class="flex">
         <div class="mt-5"><p class="text-bold font16">{{ __t("I. Thời gian") }}:</p></div>
         <div class="ml-5"> <v-date-picker
       :hideTooltip="true"
       class="w1510 display-inline"
       :format="'HH:mm DD/MM/YYYY'"
       v-model="MASTERDATA['IPDIAACOORDIDT'].Items[0].Value"
      /></div>
       </div>
       <div class="flex mt-10">
         <div class="mt-5"><p class="text-bold font16">{{ __t("II. Địa điểm") }}:</p></div>
         <div class="ml-5" style="margin-top: 5px"><p>{{MASTERDATA['IPDIAACOORDIASS'].Items[0].Value}}</p></div>
       </div>
      <p class="text-bold font16 mt-10">{{ __t("III. Thành phần tham dự") }}</p>
      <p class="text-bold font16 mt-10 ml-5">{{ __t("1. Bệnh viện") }}</p>
      <div class="flex">
       <div style="width:350px; margin-top:-5px">
        <p class="font16 ml-10">
         - {{ __label(MASTERDATA["IPDIAACOORDILDBV"]) }}:
        </p>
       </div>
       <div class="ml-20 mt-10" style="width:500px">
        <UsersSelect
         v-model="MASTERDATA['IPDIAACOORDILDBV'].Items[0].Value"
        />
       </div>
      </div>
      <div class="flex">
       <div style="width:350px; margin-top:-5px">
        <p class="font16 ml-10">
         - {{ __label(MASTERDATA["IPDIAACOORDITKTK"]) }}:
        </p>
       </div>
       <div class="ml-20 mt-10" style="width:500px">
        <UsersSelect
         v-model="MASTERDATA['IPDIAACOORDITKTK'].Items[0].Value"
        />
       </div>
      </div>
      <div class="flex">
       <div style="width:350px; margin-top:-5px">
        <p class="font16 ml-10">
         - {{ __label(MASTERDATA["IPDIAACOORDIBSTC"]) }}:
        </p>
       </div>
       <div class="ml-20 mt-10" style="width:500px">
        <UsersSelect
        :multiple="true"
         v-model="MASTERDATA['IPDIAACOORDIBSTC'].Items[0].Value"
        />
       </div>
      </div>
      <p class="text-bold font16 mt-10 ml-5">
       {{ __t("2. Người bệnh/ Gia đình người bệnh") }}
      </p>
      <div>
       <div class="flex">
       <div>
        <MDRadio
         v-if="MASTERDATA['IPDIAACOORDINB']"
         v-model="MASTERDATA['IPDIAACOORDINB']"
        />
       </div>
         <div><p
        v-if="MASTERDATA['IPDIAACOORDINB'].Items[0].Value"
        class="font16 mt-10 ml-10"
       > {{$store.state.account.CurrentPatientObj.Fullname || 'N/A'}}
       </p></div>
       <div v-if="MASTERDATA['IPDIAACOORDINB'].Items[0].Value" class="mt-10 ml-5">
         <label class="container-checkbox reset">
         <input
          type="checkbox"
          :id="3434"
          v-model="MASTERDATA['IPDIAACOORDICBNB'].Items[0].Value"
         />
         <span class="checkmark"></span>
        </label>
       </div>
       </div>
       <div class="mb-10">
        <MDRadio
         v-if="MASTERDATA['IPDIAACOORDIGDNB']"
         v-model="MASTERDATA['IPDIAACOORDIGDNB']"
        />
       </div>
      </div>
      <div v-if="MASTERDATA['IPDIAACOORDIGDNB'].Items[0].Value">
       <div
        class="ml-20 flex mb-5"
        v-for="(item, index) in familyList"
        :key="index"
       >
        <div style="position: relative;">
         <button class="btn-pos-left" @click="remove(index);">
          <i class="fa fa-trash" aria-hidden="true"></i>
         </button>
         <div style="width:350px">
           <textarea-autosize
          rows="1"
          :placeholder="__t('Nhập')"
          class="form-control"
          v-model="item.name"
         />
         </div>
        </div>
          <div class="w200 mr-10 ml-5">
          <v-select
           class="select-full-w"
           v-model="item.relationship"
           :placeholder="__t('mối quan hệ')"
           :items="BLOODFROUABO"
          />
         </div>
        <div
         v-if="item.relationship === 'Khác'"
         style="flex-grow: 1"
         class="flex-box flex-center ml-10"
        >
         <textarea-autosize
          rows="1"
          :placeholder="__t('Nhập')"
          class="form-control"
          v-model="item.other"
         />
        </div>
       </div>
       <div class="mt-10">
        <button class="btn-add" @click="handleAddMember">
         <i aria-hidden="true" class="fa fa-plus"></i> {{ __t("Thêm mới") }}
        </button>
       </div>
      </div>
     </div>
     <h4 class="text-bold">{{ __t("B. NỘI DUNG") }}</h4>
     <div class="box form-content mbt30">
      <p class="text-bold font16">{{ __t("I. Phần hành chính người") }}</p>
      <p class="ml-5">
       <b>- {{ __t("Họ tên người bệnh") }}:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.Fullname || "N/A" }}</span>
       <b>{{ __t("Tuổi") }}:</b> <span class="tab404">{{ $store.state.account.CurrentPatientObj.AgeFormated | formatAge }}</span>
       <b>{{ __t("Giới tính") }}:</b>
       <span class="tab404">{{ __t(GENDER[$store.state.account.CurrentPatientObj.Gender]) || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Dân tộc") }}:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.MOHEthnic || "N/A" }}</span
       >
      </p>
      <p>
       <b>- {{ __t("Nghề nghiệp") }}:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.MOHJob || "N/A" }}</span
       >
      </p>
      <p>
       <b>- {{ __t("Địa chỉ") }}:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.Address || "N/A" }}</span>
      </p>
      <p>
       <b>- PID:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.PID || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Số CMND/ Hộ chiếu") }}:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.IdentificationCard || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Vào viện lúc1") }}:</b
       ><span class="tab404">{{ $store.state.account.CurrentPatientObj.AdmittedDate || "N/A" }}</span>
      </p>
       <b>- {{ __t("Thời gian khám thai gần đây nhất") }}:</b
       ><span class="tab404"
        ><v-date-picker
         style="display: inline-block;"
         v-model="MASTERDATA['IPDIAACOORDITGKGDN'].Items[0].Value"
         :format="vDateTimeFormat"
       /></span>
       <p>
       <div class="ml-20 flex" style="font-style: italic;" v-if="DataHistory.LastPreNatal.length > 0">
         <div><p> {{ __t("Lịch sử khám") }}:</p></div>
         <div class="font12 ml-5">{{DataHistory.LastPreNatal[0].SiteCode}} - {{DataHistory.LastPreNatal[0].Area}} - {{DataHistory.LastPreNatal[0].SpecialtyViName}} {{ __t("lúc") }} {{DataHistory.LastPreNatal[0].AdmittedDate | formatDateHourMinutesDDMMYYY}}</div>
         <div class="ml-5" style="margin-top:-5px"><button
             class="btn btn-sync-data"
             @click="handleCoppy()"
             >
               {{ __t("Copy") }}
               </button></div>
       </div>
        <!-- </p> -->
      <p>
       <b>- {{ __t("Thời gian phát hiện mất tim thai lúc") }}:</b
       ><span class="tab404"
        ><v-date-picker
         style="display: inline-block;"
         v-model="MASTERDATA['IPDIAACOORDIMTTL'].Items[0].Value"
         :format="vDateTimeFormat"
       /></span>
      </p>
      <p>
       <b>- {{ __t("Thời gian sinh lúc") }}:</b
       ><span class="tab404"
        ><v-date-picker
         style="display: inline-block;"
         v-model="MASTERDATA['IPDIAACOORDITGSL'].Items[0].Value"
         :format="vDateTimeFormat"
       /></span>
      </p>
      <p>
       <b style="margin-right:5px">- {{ __t("Tại khoa") }}: </b
       >
       <textarea-autosize
       class="form-control"
       rows="1"
       :placeholder="__t('Nhập')"
       v-model="MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value"
      />
       <!-- {{ __label(this.$store.state.account.Specialty) }} -->
      </p>
      <!-- II -->
      <p><b class="text-bold font16">{{ __t("II. Diễn biến bệnh") }}: </b><b>{{ __t("Tiền sử, tóm tắt diễn biến, quá trình điều trị chăm sóc, chẩn đoán") }}</b></p>
      <textarea-autosize
       class="form-control"
       rows="3"
       :placeholder="__t('Nhập')"
       v-model="MASTERDATA['IPDIAACOORDITTTS'].Items[0].Value"
      />
      <p class="text-bold font16">
       {{ __t("III. Đánh giá hình thái bên ngoài") }}:
      </p>
      <textarea-autosize
       class="form-control"
       rows="3"
       :placeholder="__t('Nhập')"
       v-model="MASTERDATA['IPDIAACOORDICAKT'].Items[0].Value"
      />
      <div class="pomc-upload-area mb-10 mt-10">
       <div class="row" v-if="readonly">
        <div class="col-md-12 col-sm-12">
         <drop-files
          id="mini-upload"
          :readonly="true"
          v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value"
          :dataDropfile="dataDropfile"
         />
        </div>
       </div>
       <div class="row">
        <div class="col-md-7 col-sm-7">
         <p>
          <b>{{ __t("Upload ảnh") }}:</b>
         </p>
         <p>
          <button
           @click="openFile();"
           class="btn v-white-btn font16 font-bold btn-upload"
          >
           <i class="fa fa-upload" aria-hidden="true"></i>
           {{ __t("UPLOAD TỪ THIẾT BỊ") }}
          </button>
         </p>
         <p>
          {{
           __t(
            "Đính kèm bản scan xác nhận1"
           )
          }}
         </p>
        </div>
        <div class="col-md-5 col-sm-5">
         <drop-files
          id="mini-upload"
          v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value"
          :dataDropfile="dataDropfile"
         />
        </div>
       </div>
      </div>
      <p class="text-bold font16">
       {{ __t("IV. Các xét nghiệm lâm sàng cần làm") }}:
      </p>
      <p>
       <b>1. {{ __t("Xét nghiệm nhiễm sắc đồ") }}:</b>
      </p>
      <div class="mb-5">
       <MDRadio
        v-if="MASTERDATA['IPDIAACOORDIXNNSD']"
        v-model="MASTERDATA['IPDIAACOORDIXNNSD']"
       />
      </div>
      <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
      <div class="mb-5" v-if="MASTERDATA['IPDIAACOORDIXNNSD'].Items[1].Value">
       <textarea-autosize
        :class="validateBox1 ? 'colorError form-control' : 'form-control'"
        rows="2"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDIAACOORDIXNNSD'].Items[2].Value"
       />
       <p v-if="validateBox1" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
      </div>
      <p>
       <b
        >2. {{
         __t("Xét nghiệm nuôi cấy vi sinh dây rốn, màng rau, nước ối")
        }}:</b
       >
      </p>
      <div class="mb-5">
       <MDRadio
        v-if="MASTERDATA['IPDIAACOORDIXNNCVS']"
        v-model="MASTERDATA['IPDIAACOORDIXNNCVS']"
       />
      </div>
      <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
      <div class="mb-5" v-if="MASTERDATA['IPDIAACOORDIXNNCVS'].Items[1].Value">
       <textarea-autosize
        :class="validateBox2 ? 'colorError form-control' : 'form-control'"
        rows="2"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDIAACOORDIXNNCVS'].Items[2].Value"
       />
       <p v-if="validateBox2" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
      </div>
      <p>
       <b>3. {{ __t("Giải phẫu bệnh bánh rau") }}:</b>
      </p>
      <div class="mb-5">
       <MDRadio
        v-if="MASTERDATA['IPDIAACOORDIGPBBR']"
        v-model="MASTERDATA['IPDIAACOORDIGPBBR']"
       />
      </div>
      <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
      <div class="mb-5" v-if="MASTERDATA['IPDIAACOORDIGPBBR'].Items[1].Value">
       <textarea-autosize
        :class="validateBox3 ? 'colorError form-control' : 'form-control'"
        rows="2"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDIAACOORDIGPBBR'].Items[2].Value"
       />
       <p v-if="validateBox3" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
      </div>
      <p>
       <b>4. {{ __t("Khám nghiệm tử thi") }}:</b>
      </p>
      <div class="mb-5">
       <MDRadio
        v-if="MASTERDATA['IPDIAACOORDIKNTT']"
        v-model="MASTERDATA['IPDIAACOORDIKNTT']"
       />
      </div>
      <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
      <div class="mb-5" v-if="MASTERDATA['IPDIAACOORDIKNTT'].Items[1].Value">
       <textarea-autosize
        :class="validateBox4 ? 'colorError form-control' : 'form-control'"
        rows="2"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDIAACOORDIKNTT'].Items[2].Value"
       />
       <p v-if="validateBox4" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
      </div>
      <div class="mt-10">
       <p>
        <b>5. {{ __t("Khác") }}:</b>
       </p>
      </div>
      <!-- 1 -->
      <div class="mb-5" v-if="showItems1">
       <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :placeholder="__t('Nhập')"
         v-model="textOther1"
        />
       </div>
       <div style="position: relative;">
        <button class="btn-pos-left" @click="removeItems('1');">
         <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div>
         <MDRadio
          v-if="MASTERDATA['IPDIAACOORDIXNKK1']"
          v-model="MASTERDATA['IPDIAACOORDIXNKK1']"
         />
        </div>
        <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       </div>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK1'].Items[1].Value">
        <textarea-autosize
         :class="validateBox5 ? 'colorError form-control' : 'form-control'"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK1'].Items[2].Value"
        />
        <p v-if="validateBox5" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
       </div>
      </div>
      <!-- 2 -->
      <div class="mb-5 mt-10" v-if="showItems2">
       <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :placeholder="__t('Nhập')"
         v-model="textOther2"
        />
       </div>
       <div style="position: relative;">
        <button class="btn-pos-left" @click="removeItems('2');">
         <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div>
         <MDRadio
          v-if="MASTERDATA['IPDIAACOORDIXNKK2']"
          v-model="MASTERDATA['IPDIAACOORDIXNKK2']"
         />
        </div>
        <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       </div>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK2'].Items[1].Value">
        <textarea-autosize
         :class="validateBox6 ? 'colorError form-control' : 'form-control'"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK2'].Items[2].Value"
        />
        <p v-if="validateBox6" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
       </div>
      </div>
      <!-- 3 -->
      <div class="mb-5 mt-10" v-if="showItems3">
       <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :placeholder="__t('Nhập')"
         v-model="textOther3"
        />
       </div>
       <div style="position: relative;">
        <button class="btn-pos-left" @click="removeItems('3');">
         <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div>
         <MDRadio
          v-if="MASTERDATA['IPDIAACOORDIXNKK3']"
          v-model="MASTERDATA['IPDIAACOORDIXNKK3']"
         />
        </div>
        <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       </div>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK3'].Items[1].Value">
        <textarea-autosize
         :class="validateBox7 ? 'colorError form-control' : 'form-control'"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK3'].Items[2].Value"
        />
        <p v-if="validateBox7" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
       </div>
      </div>
      <!-- 4 -->
      <div class="mb-5 mt-10" v-if="showItems4">
       <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :placeholder="__t('Nhập')"
         v-model="textOther4"
        />
       </div>
       <div style="position: relative;">
        <button class="btn-pos-left" @click="removeItems('4');">
         <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div>
         <MDRadio
          v-if="MASTERDATA['IPDIAACOORDIXNKK4']"
          v-model="MASTERDATA['IPDIAACOORDIXNKK4']"
         />
        </div>
        <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       </div>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK4'].Items[1].Value">
        <textarea-autosize
         :class="validateBox8 ? 'colorError form-control' : 'form-control'"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK4'].Items[2].Value"
        />
        <p v-if="validateBox8" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
       </div>
      </div>
      <!-- 5 -->
      <div class="mb-5 mt-10" v-if="showItems5">
       <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :placeholder="__t('Nhập')"
         v-model="textOther5"
        />
       </div>
       <div style="position: relative;">
        <button class="btn-pos-left" @click="removeItems('5');">
         <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <div>
         <MDRadio
          v-if="MASTERDATA['IPDIAACOORDIXNKK5']"
          v-model="MASTERDATA['IPDIAACOORDIXNKK5']"
         />
        </div>
        <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       </div>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK5'].Items[1].Value">
        <textarea-autosize
         :class="validateBox9 ? 'colorError form-control' : 'form-control'"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK5'].Items[2].Value"
        />
        <p v-if="validateBox9" style="color: red; font-size: 12px; font-style: italic;">Lý do không được để trống</p>
       </div>
      </div>
      <div class="mt-10" v-if="!showItems1 || !showItems2 || !showItems3 || !showItems4 || !showItems5">
       <button class="btn-add" @click="handleAddOther">
        <i aria-hidden="true" class="fa fa-plus"></i> {{ __t("Thêm mới") }}
       </button>
      </div>
      <p class="text-bold font16 mt-20">{{ __t("V. Ý kiến của người bệnh") }}:</p>
     <textarea-autosize
      class="form-control"
      rows="3"
      :placeholder="__t('Nhập')"
      v-model="MASTERDATA['IPDIAACOORDIYKNBGD'].Items[0].Value"
     />
     <p class="text-bold font16 mt-10">{{ __t("VI. Kết luận") }}:</p>
     <textarea-autosize
      class="form-control"
      rows="3"
      :placeholder="__t('Nhập')"
      v-model="MASTERDATA['IPDIAACOORDICONCLU'].Items[0].Value"
     />
     </div>
     <!-- chân ký -->
     <div class="row mt-20">
       <div class="col-md-6 col-sm-6 text-center">
         <template v-if="DataSubmit.Confirm.HospitalLeadership.ConfirmAt">
           <p class="text-center">{{DataSubmit.Confirm.HospitalLeadership.ConfirmAt | formatDateHourMinutesDDMMYYY}}</p>
           <eform-signature :ad="DataSubmit.Confirm.HospitalLeadership.UserName" :title="__t('Giám đốc bệnh viện/Trưởng khoa1')" />
         </template>
         <template v-else>
           <p><b>{{ __t("Giám đốc bệnh viện/Trưởng khoa1") }}</b></p>
           <p><i v-if="checkConfirm">{{__t('Chưa xác nhận')}}</i><button v-else @click="
           showDoctorConfirm(
            'HospitalLeadership',
            'Giám đốc bệnh viện/Trưởng khoa',
           );
          " class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
         </template>
       </div>
      <!-- <div class="col-md-6 col-sm-6 text-center">
       <template v-if="DataSubmit.Confirm.HospitalLeadership.ConfirmAt && hasRole('STILLBIRTHCFPOST')">
        <p class="text-center">
         {{
          DataSubmit.Confirm.HospitalLeadership.ConfirmAt
           | formatDateHourMinutesDDMMYYY
         }}
        </p>
        <eform-signature
         :ad="DataSubmit.Confirm.HospitalLeadership.UserName"
         :title="__t('Giám đốc bệnh viện/Trưởng khoa1')"
        />
       </template>
       <template v-else>
        <p>
         <b>{{ __t("Giám đốc bệnh viện/Trưởng khoa1") }}</b>
        </p>
        <p>
         <button
          @click="
           showDoctorConfirm(
            'HospitalLeadership',
            'Giám đốc bệnh viện/Trưởng khoa',
           );
          "
          class="btn v-white-btn"
         >
          {{ __t("Xác nhận") }}
         </button>
        </p>
       </template>
      </div> -->
      <div class="col-md-6 col-sm-6 text-center">
         <template v-if="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt">
           <p class="text-center">{{DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt | formatDateHourMinutesDDMMYYY}}</p>
           <eform-signature :ad="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.UserName"
         :title="__t('Lãnh đạo khoa/ Trưởng kíp trực')" />
         </template>
         <template v-else>
           <p><b>{{ __t("Lãnh đạo khoa/ Trưởng kíp trực") }}</b></p>
           <p><i v-if="checkConfirm2">{{__t('Chưa xác nhận')}}</i><button v-else @click="
           showDoctorConfirm(
            'HeadOfDepartmentOrLeaderOfOnDutyTeam',
            'Lãnh đạo khoa/ Trưởng kíp trực'
           );
          " class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
         </template>
       </div>
      <!-- <div class="col-md-6 col-sm-6 text-center">
       <template
        v-if="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt && hasRole('STILLBIRTHCFPOST')"
       >
        <p class="text-center">
         {{
          DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt
           | formatDateHourMinutesDDMMYYY
         }}
        </p>
        <eform-signature
         :ad="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.UserName"
         :title="__t('Lãnh đạo khoa/ Trưởng kíp trực')"
        />
       </template>
       <template v-else>
        <p>
         <b>{{ __t("Lãnh đạo khoa/ Trưởng kíp trực") }}</b>
        </p>
        <p>
         <button
          @click="
           showDoctorConfirm(
            'HeadOfDepartmentOrLeaderOfOnDutyTeam',
            'Lãnh đạo khoa/ Trưởng kíp trực'
           );
          "
          class="btn v-white-btn"
         >
          {{ __t("Xác nhận") }}
         </button>
        </p>
       </template>
      </div> -->
     </div>
     <div class="pomc-upload-area mb-10 mt-10">
      <div class="row" v-if="readonly">
       <div class="col-md-12 col-sm-12">
        <drop-files
         id="mini-upload"
         :readonly="true"
         v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value"
         :dataDropfile="dataDropfile"
        />
       </div>
      </div>
      <div class="row">
       <div class="col-md-7 col-sm-7">
        <p>
         <b>{{ __t("Upload ảnh") }}:</b>
        </p>
        <p>
         <button
          @click="openFile1();"
          class="btn v-white-btn font16 font-bold btn-upload"
         >
          <i class="fa fa-upload" aria-hidden="true"></i>
          {{ __t("UPLOAD TỪ THIẾT BỊ") }}
         </button>
        </p>
        <p>
         {{
          __t(
           "Đính kèm bản scan xác nhận"
          )
         }}
        </p>
       </div>
       <div class="col-md-5 col-sm-5">
        <drop-files
         id="mini-upload"
         v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value"
         :dataDropfile="dataDropfile"
        />
       </div>
      </div>
     </div>
    </div>
    <!-- bản view -->
    <div v-else class="content mt-20">
     <h4 class="text-bold">{{ __t("women.tpc") }}</h4>
     <div class="box form-content mbt30">
       <div class="flex">
         <div class="mt-5"><p class="text-bold font16">{{ __t("I. Thời gian") }}:</p></div>
         <div class="ml-5"><FakeInput v-model="MASTERDATA['IPDIAACOORDIDT'].Items[0].Value" /></div>
       </div>
      <div class="flex mt-10">
         <div class="mt-5"><p class="text-bold font16">{{ __t("II. Địa điểm") }}:</p></div>
         <div class="ml-5" style="margin-top: 8px"><p>{{MASTERDATA['IPDIAACOORDIASS'].Items[0].Value}}</p></div>
       </div>
      <p class="text-bold font16 mt-10">{{ __t("III. Thành phần tham dự") }}</p>
      <p class="text-bold font16 mt-10 ml-5">{{ __t("1. Bệnh viện") }}</p>
      <div class="flex">
       <div style="width:350px; margin-top:-10px">
        <p class="font16 ml-10">
         - {{ __label(MASTERDATA["IPDIAACOORDILDBV"]) }}:
        </p>
       </div>
       <div class="ml-20 mt-10" style="width:500px">
        <UsersSelect
         :readonly="true"
         v-model="MASTERDATA['IPDIAACOORDILDBV'].Items[0].Value"
        />
       </div>
      </div>
      <div class="flex">
       <div style="width:350px; margin-top:-11px">
        <p class="font16 mt-10 ml-10">
         - {{ __label(MASTERDATA["IPDIAACOORDITKTK"]) }}:
        </p>
       </div>
       <div class="ml-20" style="width:500px;margin-top: 18px;">
        <UsersSelect
         :readonly="true"
         v-model="MASTERDATA['IPDIAACOORDITKTK'].Items[0].Value"
        />
       </div>
      </div>
      <div class="flex">
       <div style="width:350px; margin-top:-15px">
        <p class="font16 mt-10 ml-10">
         - {{ __label(MASTERDATA["IPDIAACOORDIBSTC"]) }}:
        </p>
       </div>
       <div class="ml-20" style="width:500px; margin-top:15px">
        <UsersSelect
         :readonly="true"
         :multiple="true"
         v-model="MASTERDATA['IPDIAACOORDIBSTC'].Items[0].Value"
        />
       </div>
      </div>
      <p class="text-bold font16 mt-10 ml-5">
       {{ __t("2. Người bệnh/ Gia đình người bệnh") }}
      </p>
      <div class="flex" v-if="MASTERDATA['IPDIAACOORDINB'].Items[0].Value">
         <div class="ml-5">{{ __t("Người bệnh") }}:</div>
         <div class="ml-5">{{$store.state.account.CurrentPatientObj.Fullname || 'N/A'}}</div>
      </div>
      <div v-if="MASTERDATA['IPDIAACOORDIGDNB'].Items[0].Value">
       <div class="ml-5">{{ __t("Gia đình người bệnh") }}:</div>
        <div
        class="flex mb-5"
        v-for="(item, index) in familyList"
        :key="index"
       >
       <div class="ml-10" v-if="item.other !== ''">{{ __t(item.other) }}:</div>
       <div class="ml-10" v-else>{{ __t(item.relationship) }}:</div>
       <div class="ml-5">{{item.name}}</div>
       </div>
       </div>
     </div>
     <h4 class="text-bold">{{ __t("B. NỘI DUNG") }}</h4>
     <div class="box form-content mbt30">
      <p class="text-bold font16">{{ __t("I. Phần hành chính người") }}</p>
      <p class="ml-5">
       <b>- {{ __t("Họ tên người bệnh") }}:</b
       ><span class="tab404">{{ Customer.Fullname || "N/A" }}</span>
       <b>{{ __t("Tuổi") }}:</b> <span class="tab404">{{ Customer.AgeFormated | formatAge }}</span>
       <b>{{ __t("Giới tính") }}:</b>
       <span class="tab404">{{ __t(GENDER[Customer.Gender]) || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Dân tộc") }}:</b
       ><span class="tab404">{{ Customer.MOHEthnic || "N/A" }}</span
       >
      <p>
       <b>- {{ __t("Nghề nghiệp") }}:</b
       ><span class="tab404">{{ Customer.MOHJob || "N/A" }}</span
       >
      </p>
      <p>
       <b>- {{ __t("Địa chỉ") }}:</b
       ><span class="tab404">{{ Customer.Address || "N/A" }}</span>
      </p>
      <p>
       <b>- PID:</b
       ><span class="tab404">{{ Customer.PID || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Số CMND/ Hộ chiếu") }}:</b
       ><span class="tab404">{{ Customer.IdentificationCard || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Vào viện lúc") }}:</b
       ><span class="tab404">{{ Customer.AdmittedDate || "N/A" }}</span>
      </p>
      <p>
       <b>- {{ __t("Thời gian khám thai gần đây nhất") }}:</b
       ><span class="tab404"
        ><FakeInput v-model="MASTERDATA['IPDIAACOORDITGKGDN'].Items[0].Value" /></span>
      </p>
      <p>
       <b>- {{ __t("Thời gian phát hiện mất tim thai lúc") }}:</b
       ><span class="tab404"
        ><FakeInput v-model="MASTERDATA['IPDIAACOORDIMTTL'].Items[0].Value" /></span>
      </p>
      <p>
       <b>- {{ __t("Thời gian sinh lúc") }}:</b
       ><span class="tab404"
        ><FakeInput v-model="MASTERDATA['IPDIAACOORDITGSL'].Items[0].Value" /></span>
      </p>
      <p>
       <b style="margin-right: 5px">- Tại khoa: </b
       ><span style="margin-left: 5px" class="tab404"
        ><FakeInput v-model="MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value" /></span>
      </p>
      <!-- II -->
      <p><b class="text-bold font16">{{ __t("II. Diễn biến bệnh") }}: </b><b>{{ __t("Tiền sử, tóm tắt diễn biến, quá trình điều trị chăm sóc, chẩn đoán") }}</b></p>
      <textarea-autosize
       :readonly="true"
       class="form-control mb-10"
       rows="3"
       :placeholder="__t('Nhập')"
       v-model="MASTERDATA['IPDIAACOORDITTTS'].Items[0].Value"
      />
      <p class="text-bold font16">
       {{ __t("III. Đánh giá hình thái bên ngoài") }}:
      </p>
      <textarea-autosize
       :readonly="true"
       class="form-control"
       rows="3"
       :placeholder="__t('Nhập')"
       v-model="MASTERDATA['IPDIAACOORDICAKT'].Items[0].Value"
      />
      <div class="pomc-upload-area mb-10 mt-10">
       <div class="row">
        <div class="col-md-12 col-sm-12">
         <drop-files
          id="mini-upload"
          :readonly="true"
          v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value"
         />
        </div>
       </div>
      </div>
      <p class="text-bold font16">
       {{ __t("IV. Các xét nghiệm lâm sàng cần làm") }}:
      </p>
      <p>
       <b>1. {{ __t("Xét nghiệm nhiễm sắc đồ") }}:</b>
      </p>
      <div>
       <MDRadioView
        v-if="MASTERDATA['IPDIAACOORDIXNNSD']"
        :data="MASTERDATA['IPDIAACOORDIXNNSD'].Items"
       />
      </div>
      <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
      <div class="mt-5" v-if="MASTERDATA['IPDIAACOORDIXNNSD'].Items[1].Value">
       <textarea-autosize
        :readonly="true"
        class="form-control"
        rows="2"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDIAACOORDIXNNSD'].Items[2].Value"
       />
      </div>
      <div class="mt-10">
       <p>
        <b
         >2.{{
          __t("Xét nghiệm nuôi cấy vi sinh dây rốn, màng rau, nước ối")
         }}:</b
        >
       </p>
       <div>
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIXNNCVS']"
         :data="MASTERDATA['IPDIAACOORDIXNNCVS'].Items"
        />
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div class="mt-5" v-if="MASTERDATA['IPDIAACOORDIXNNCVS'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNNCVS'].Items[2].Value"
        />
       </div>
      </div>
      <div class="mt-10">
       <p>
        <b
         >3. {{ __t("Giải phẫu bệnh bánh rau") }}:</b
        >
       </p>
       <div>
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIGPBBR']"
         :data="MASTERDATA['IPDIAACOORDIGPBBR'].Items"
        />
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div class="mt-5" v-if="MASTERDATA['IPDIAACOORDIGPBBR'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIGPBBR'].Items[2].Value"
        />
       </div>
      </div>
      <div class="mt-10">
       <p>
        <b
         >4. {{ __t("Khám nghiệm tử thi") }}:</b
        >
       </p>
       <div>
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIKNTT']"
         :data="MASTERDATA['IPDIAACOORDIKNTT'].Items"
        />
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div class="mt-5" v-if="MASTERDATA['IPDIAACOORDIKNTT'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIKNTT'].Items[2].Value"
        />
       </div>
      </div>
      <p>
       <b>5. {{ __t("Khác") }}:</b>
      </p>
      <!-- 1 -->
      <div class="mb-10" v-if="showItems1">
       <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :readonly="true"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK1'].Items[3].Value"
        />
       </div>
       <div style="position: relative;">
        <div class="mt-5 mb-5">
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIXNKK1']"
         :data="MASTERDATA['IPDIAACOORDIXNKK1'].Items"
        />
       </div>
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK1'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK1'].Items[2].Value"
        />
       </div>
      </div>
      <!-- 2 -->
      <div class="mb-10" v-if="showItems2">
         <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :readonly="true"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK2'].Items[3].Value"
        />
       </div>
       <div style="position: relative;">
        <div class="mt-5 mb-5">
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIXNKK2']"
         :data="MASTERDATA['IPDIAACOORDIXNKK2'].Items"
        />
       </div>
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK2'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK2'].Items[2].Value"
        />
       </div>
      </div>
      <!-- 3 -->
      <div class="mb-10" v-if="showItems3">
         <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :readonly="true"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK3'].Items[3].Value"
        />
       </div>
       <div style="position: relative;">
        <div class="mt-5 mb-5">
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIXNKK3']"
         :data="MASTERDATA['IPDIAACOORDIXNKK3'].Items"
        />
       </div>
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK3'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK3'].Items[2].Value"
        />
       </div>
      </div>
      <!-- 4 -->
      <div class="mb-10" v-if="showItems4">
         <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :readonly="true"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK4'].Items[3].Value"
        />
       </div>
       <div style="position: relative;">
        <div class="mt-5 mb-5">
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIXNKK4']"
         :data="MASTERDATA['IPDIAACOORDIXNKK4'].Items"
        />
       </div>
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK4'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK4'].Items[2].Value"
        />
       </div>
      </div>
      <!-- 5 -->
      <div class="mb-10" v-if="showItems5">
         <div>
         <textarea-autosize
         class="form-control"
         rows="1"
         :readonly="true"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK5'].Items[3].Value"
        />
       </div>
       <div style="position: relative;">
        <div class="mt-5 mb-5">
        <MDRadioView
         v-if="MASTERDATA['IPDIAACOORDIXNKK5']"
         :data="MASTERDATA['IPDIAACOORDIXNKK5'].Items"
        />
       </div>
       </div>
       <p class="ml-10"> {{ __t("Nếu không ghi rõ lí do") }}</p>
       <div v-if="MASTERDATA['IPDIAACOORDIXNKK5'].Items[1].Value">
        <textarea-autosize
         :readonly="true"
         class="form-control"
         rows="2"
         :placeholder="__t('Nhập')"
         v-model="MASTERDATA['IPDIAACOORDIXNKK5'].Items[2].Value"
        />
       </div>
      </div>
     </div>
     <div><p class="text-bold font16">{{ __t("V. Ý kiến của người bệnh") }}:</p>
     <textarea-autosize
      :readonly="true"
      class="form-control mb-20"
      rows="3"
      :placeholder="__t('Nhập')"
      v-model="MASTERDATA['IPDIAACOORDIYKNBGD'].Items[0].Value"
     /></div>
     <div style="margin-top:20px !important"><p class="text-bold font16 mt-20">{{ __t("VI. Kết luận") }}:</p>
     <textarea-autosize
      :readonly="true"
      class="form-control"
      rows="3"
      :placeholder="__t('Nhập')"
      v-model="MASTERDATA['IPDIAACOORDICONCLU'].Items[0].Value"
     /></div>
     <!-- chân ký -->
     <div class="row mt-20">
      <div class="col-md-6 col-sm-6 text-center">
       <template v-if="DataSubmit.Confirm.HospitalLeadership.ConfirmAt">
        <p class="text-center">
         {{
          DataSubmit.Confirm.HospitalLeadership.ConfirmAt
           | formatDateHourMinutesDDMMYYY
         }}
        </p>
        <eform-signature
         :ad="DataSubmit.Confirm.HospitalLeadership.UserName"
         :title="__t('Giám đốc bệnh viện/Trưởng khoa1')"
        />
       </template>
       <template v-else>
        <p>
         <b>{{ __t("Giám đốc bệnh viện/Trưởng khoa1") }}</b>
        </p>
        <p v-if="$route.name === 'IPDCoordinatingWithThePatientItem'">
         <button
          @click="
           showDoctorConfirm(
            'HospitalLeadership',
            'Giám đốc bệnh viện/Trưởng khoa',
           );
          "
          class="btn v-white-btn"
         >
          {{ __t("Xác nhận") }}
         </button>
        </p>
       </template>
      </div>
      <div class="col-md-6 col-sm-6 text-center">
       <template
        v-if="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt"
       >
        <p class="text-center">
         {{
          DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt
           | formatDateHourMinutesDDMMYYY
         }}
        </p>
        <eform-signature
         :ad="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.UserName"
         :title="__t('Lãnh đạo khoa/ Trưởng kíp trực')"
        />
       </template>
       <template v-else>
        <p>
         <b>{{ __t("Lãnh đạo khoa/ Trưởng kíp trực") }}</b>
        </p>
        <p v-if="$route.name === 'IPDCoordinatingWithThePatientItem'">
         <button
          @click="
           showDoctorConfirm(
            'HeadOfDepartmentOrLeaderOfOnDutyTeam',
            'Lãnh đạo khoa/ Trưởng kíp trực'
           );
          "
          class="btn v-white-btn"
         >
          {{ __t("Xác nhận") }}
         </button>
        </p>
       </template>
      </div>
     </div>
     <div class="pomc-upload-area mb-10 mt-10">
      <div class="row">
       <div class="col-md-12 col-sm-12">
        <drop-files
         id="mini-upload"
         :readonly="true"
         v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value"
        />
       </div>
      </div>
     </div>
    </div>
    <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
     <template slot="buttons">
       <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
       <div class="col-md-4 col-sm-4">
         <div class="form-group1">
         <button
           class="btn btn-block v-white-btn"
           type="button"
           v-shortkey="['ctrl', 'p']"
           @shortkey="print();"
           @click="print();"
         >
           <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In biên bản") }}
         </button>
         </div>
       </div>
       <div v-if="!readonly" class="col-md-6 col-sm-6">
         <div class="flex form-group1">
         <button
           class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
           type="button"
           v-shortkey="['ctrl', 's']"
           @click="save();"
         >
           <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
         </button>
         </div>
       </div>
     </template>
    </FloatBlock>
    <div class="row">
     <div class="mt-10 column ml-20">
      <p>A01_152_100122_VE</p>
       <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdateBy" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt | formatDateHourMinutesDDMMYYY}}</p>
     </div>
    </div>
    <print :MASTERDATA="MASTERDATA" :showItems1="showItems1" :showItems2="showItems2" :showItems3="showItems3" :showItems4="showItems4" :showItems5="showItems5" :familyList="familyList" :Customer="Customer" :test="123" :DataSubmit="DataSubmit" :CDHA="CDHA" :hasCDHA="hasCDHA" hidden />
   </template>
   <div v-else class="loading-text"><v-loading /></div>
  </div>
 </template>
<script>

// import Customer from '@/services/IPD/Customer'
import VSelect from '@/components/VSelect.vue'
// import moment from 'moment'
// eslint-disable-next-line import/no-duplicates
import VDateTimePicker from '@/components/VDateTimePicker.vue'
// eslint-disable-next-line import/no-duplicates
import VDatePicker from '@/components/VDateTimePicker.vue'
// import constants from '@/constants'
import DateTimePicker from 'vue2-datepicker'
import $ from 'jquery'
import _ from 'lodash'
import MixinMasterData from '@/mixins/masterdata.js'
// import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinForm from '@/mixins/form.js'
// import SummaryOf15DayTreatmentPrice from './price/SummaryOf15DayTreatmentPrice.vue'
import SyncPrincipalTest from './SyncPrincipalTest.vue'
import constants from '@/constants'
import moment from 'moment'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import DropFiles from '@/components/DropFiles.vue'
import UsersSelect from '@/components/UsersSelect.vue'
import CustomersIPD from '@/services/IPD/Customer'
import Print from './Print.vue'
import CoordinatingWithThePatientService from '@/services/IPD/CoronaryIntervention/CoordinatingWithThePatient'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  /**
  * The name of the page.
  */
  name: 'MonitorSheetForPatientItem',
  mixins: [MixinForm, MixinMasterData],
  props: ['formId', 'viewOnly', 'VisitId', 'VisitType', 'timeTMP'],
  data () {
    return {
      dataDropfile: {
        contentImg: '',
        titleImg: '',
        visittypeImg: '',
        visitidImg: '',
        formidImg: ''
      },
      removedUrl: [],
      GENDER: constants.GENDER,
      familyList: [],
      textOther1: '',
      textOther2: '',
      textOther3: '',
      textOther4: '',
      textOther5: '',
      CDHA: [],
      hasCDHA: [],
      otherTestList: [],
      testItems: [],
      showItems1: false,
      showItems2: false,
      showItems3: false,
      showItems4: false,
      showItems5: false,
      Customer: {},
      validateBox1: false,
      validateBox2: false,
      validateBox3: false,
      validateBox4: false,
      validateBox5: false,
      validateBox6: false,
      validateBox7: false,
      validateBox8: false,
      validateBox9: false,
      BLOODFROUABO: [
        {
          label: this.$t('Chồng'),
          value: 'Chồng'
        },
        {
          label: this.$t('Mẹ'),
          value: 'Mẹ'
        },
        {
          label: this.$t('Bố'),
          value: 'Bố'
        },
        {
          label: this.$t('Chị gái'),
          value: 'Chị gái'
        },
        {
          label: this.$t('Anh trai'),
          value: 'Anh trai'
        },
        {
          label: this.$t('Con gái'),
          value: 'Con gái'
        },
        {
          label: this.$t('Con trai'),
          value: 'Con trai'
        },
        {
          label: this.$t('Khác'),
          value: 'Khác'
        }
      ],
      checkBoxNb: false,
      DataHistory: {},
      tableCode: 'A01_152_100122_VE',
      age: 0,
      dataFile: '',
      listForWomen: [],
      query: '',
      tableList: [],
      dataVitalSigns: {},
      readonly: false,
      showTable: false,
      errorTimeTm: false,
      errorNameTm: false,
      timeTM: '',
      nameTM: '',
      dataHeader: 0,
      defaultText: '',
      popupTitle: '',
      TypeConfirm: '',
      DataSubmit: [],
      user: {},
      tableHeader: [],
      dataMaster: [],
      DataSubmit2: [],
      TableDelete: [],
      ICD1: [],
      ICD2: [],
      DataInfo: [],
      NullRoomId: false,
      loaded: false,
      nongDmv: false,
      stentDmv: false,
      options: [],
      tableId: this.$route.params.Item || this.formId,
      clickConfirm: false
    }
  },
  /**
  * The components that the page can use.
  */
  components: {
    VSelect,
    VDateTimePicker,
    DateTimePicker,
    SyncPrincipalTest,
    VDatePicker,
    UsersSelect2,
    DropFiles,
    UsersSelect,
    Print
  },
  async mounted () {
    await this.getDataSetup()
    this.currentUser = this.$store.state.account.Username
    // master data
    this.getMasterDatas({Form: 'IPDIAACOORDI'}, () => {
      this.getData()
    })
  },
  watch: {
    formId: function (value) {
      // this.this._ItemId = value
      this.getData()
    }
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A01_152_100122_VE')
    },
    handleCoppy () {
      this.MASTERDATA['IPDIAACOORDITGKGDN'].Items[0].Value = this.formatDateHour(this.DataHistory.LastPreNatal[0].AdmittedDate)
      this.MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value = this.DataHistory.LastPreNatal[0].SpecialtyViName
    },
    formatDateHour (value) {
      if (!value) {
        return ''
      }
      const date = new Date(value)
      return (
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ' ' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
      (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '/' +
      date.getFullYear()
      )
    },
    getDataSetup () {
      new CustomersIPD().find(this.$route.params.Id || this.$route.params.ID).then(response => {
        this.Customer = response
      }).then(er => {
        this.Customer = this.$store.state.account.CurrentPatientObj
      })
    },
    openFile1 () {
      $('#1dropzone').click()
    },
    // $('#' + this.MASTERDATA[this.MDCODE || 'IPDMRPT10002'].Items[this.index[0]].Code + ' #dropzone').click()
    openFile () {
      $('#dropzone').click()
    },
    remove (i) {
      this.familyList = this.familyList.filter((_, index) => index !== i)
    },
    removeTest (i) {
      this.otherTestList = this.otherTestList.filter((_, index) => index !== i)
    },
    handleAddMember () {
      const a = {
        relationship: '',
        other: ''
      }
      this.familyList.push(a)
    },
    removeItems (index) {
      if (index === '1') {
        this.showItems1 = false
        this.textOther1 = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[0].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[1].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[2].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[3].Value = ''
      } else if (index === '2') {
        this.showItems2 = false
        this.textOther2 = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[0].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[1].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[2].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[3].Value = ''
      } else if (index === '3') {
        this.showItems3 = false
        this.textOther3 = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[0].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[1].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[2].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[3].Value = ''
      } else if (index === '4') {
        this.showItems4 = false
        this.textOther4 = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[0].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[1].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[2].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[3].Value = ''
      } else if (index === '5') {
        this.showItems5 = false
        this.textOther5 = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[0].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[1].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[2].Value = ''
        this.MASTERDATA['IPDIAACOORDIXNKK' + index].Items[3].Value = ''
      }
    },
    getDataItems () {
      if (this.MASTERDATA['IPDIAACOORDIXNKK1'].Items[0].Value || this.MASTERDATA['IPDIAACOORDIXNKK1'].Items[1].Value) {
        this.showItems1 = true
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK2'].Items[0].Value || this.MASTERDATA['IPDIAACOORDIXNKK2'].Items[1].Value) {
        this.showItems2 = true
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK3'].Items[0].Value || this.MASTERDATA['IPDIAACOORDIXNKK3'].Items[1].Value) {
        this.showItems3 = true
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK4'].Items[0].Value || this.MASTERDATA['IPDIAACOORDIXNKK4'].Items[1].Value) {
        this.showItems4 = true
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK5'].Items[0].Value || this.MASTERDATA['IPDIAACOORDIXNKK5'].Items[1].Value) {
        this.showItems5 = true
      }
    },
    handleAddOther () {
      if (!this.showItems1) {
        this.showItems1 = true
      } else if (!this.showItems2) {
        this.showItems2 = true
      } else if (!this.showItems3) {
        this.showItems3 = true
      } else if (!this.showItems4) {
        this.showItems4 = true
      } else if (!this.showItems5) {
        this.showItems5 = true
      }
    },
    async confirm () {
      this.clickConfirm = true
      await this.save('confirm')
    },
    getDataInfo () {
      new CoordinatingWithThePatientService().find('/Info/A01_152_100122_VE/' + this._VisitId).then(res => {
        // this.dataVitalSigns = res.VitalSigns
        const data = {
          ...res.VitalSigns,
          BP: res.VitalSigns.BP ? res.VitalSigns.BP : 'N/A',
          Pulse: res.VitalSigns.Pulse ? res.VitalSigns.Pulse : 'N/A',
          RR: res.VitalSigns.RR ? res.VitalSigns.RR : 'N/A',
          SP02: 'N/A'
        }
        this.dataVitalSigns = data
      })
    },
    handleClickCoppy () {
      this.MASTERDATA['IPDIAACINVSBP'].Items[0].Value = this.dataVitalSigns.BP === 'N/A' ? '' : this.dataVitalSigns.BP
      this.MASTERDATA['IPDIAACINVSBP'].Items[1].Value = this.dataVitalSigns.Pulse === 'N/A' ? '' : this.dataVitalSigns.Pulse
      this.MASTERDATA['IPDIAACINVSBP'].Items[2].Value = this.dataVitalSigns.RR === 'N/A' ? '' : this.dataVitalSigns.RR
    },
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    copyToOPDOENPT0 (str) {
      this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = str
    },
    validateBox () {
      var count = 0
      if (this.MASTERDATA['IPDIAACOORDIXNNSD'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNNSD'].Items[2].Value === '') {
        this.validateBox1 = true
        count++
      } else {
        this.validateBox1 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIXNNCVS'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNNCVS'].Items[2].Value === '') {
        this.validateBox2 = true
        count++
      } else {
        this.validateBox2 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIGPBBR'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIGPBBR'].Items[2].Value === '') {
        this.validateBox3 = true
        count++
      } else {
        this.validateBox3 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIKNTT'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIKNTT'].Items[2].Value === '') {
        this.validateBox4 = true
        count++
      } else {
        this.validateBox4 = false
      }
      // 5
      if (this.MASTERDATA['IPDIAACOORDIXNKK1'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNKK1'].Items[2].Value === '') {
        this.validateBox5 = true
        count++
      } else {
        this.validateBox5 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK2'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNKK2'].Items[2].Value === '') {
        this.validateBox6 = true
        count++
      } else {
        this.validateBox6 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK3'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNKK3'].Items[2].Value === '') {
        this.validateBox7 = true
        count++
      } else {
        this.validateBox7 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK4'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNKK4'].Items[2].Value === '') {
        this.validateBox8 = true
        count++
      } else {
        this.validateBox8 = false
      }
      if (this.MASTERDATA['IPDIAACOORDIXNKK5'].Items[1].Value && this.MASTERDATA['IPDIAACOORDIXNKK5'].Items[2].Value === '') {
        this.validateBox9 = true
        count++
      } else {
        this.validateBox9 = false
      }
      return count
    },
    async save (dataComfirm) {
      const check = this.validateBox()
      if (check > 0) {
        console.log('validate err')
      } else {
        this.removedUrl = []
        const arr1 = this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value ? this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value : []
        const arr2 = this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value ? this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value : []
        this.removedUrl = [...arr1, ...arr2]
        this.MASTERDATA['IPDIAACOORDIGDNB'].Items[1].Value = JSON.stringify(this.familyList)
        this.DataSubmit.Intervention = JSON.stringify(this.DataSubmit.Intervention)
        // if (this.checkBoxNb) {
        //   this.MASTERDATA['IPDIAACOORDINB'].Items[0].Note = '1'
        // } else {
        //   this.MASTERDATA['IPDIAACOORDINB'].Items[0].Note = '0'
        // }
        this.MASTERDATA['IPDIAACOORDIXNKK1'].Items[3].Value = this.textOther1
        this.MASTERDATA['IPDIAACOORDIXNKK2'].Items[3].Value = this.textOther2
        this.MASTERDATA['IPDIAACOORDIXNKK3'].Items[3].Value = this.textOther3
        this.MASTERDATA['IPDIAACOORDIXNKK4'].Items[3].Value = this.textOther4
        this.MASTERDATA['IPDIAACOORDIXNKK5'].Items[3].Value = this.textOther5
        this.DataSubmit.Datas = []
        if (!this._VisitId) return
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
              } else {
              }
            })
          }
        }
        this.mapData2MDData()
        const data = Object.assign({}, this.DataSubmit)
        new CoordinatingWithThePatientService().update('/Update/A01_152_100122_VE/' + this._VisitId + '/' + this._ItemId, data).then(() => {
          this.toastedSuccess()
          this.removedFile(this.removedUrl)
          if (!dataComfirm) {
            this.toastedSuccess()
            this.reload()
          } else {
            const a = {
              ...this.user,
              TypeConfirm: this.TypeConfirm
            }
            new CoordinatingWithThePatientService(this.VisitType).update('/Confirm/IPD/' + this._VisitId + '/' + this._ItemId, a).then(response => {
              this.$modal.hide('doctorConfirm')
              this.toastedSuccess(this.$t('Xác nhận thành công'))
              this.reload()
            }).catch(e => {
              this.$modal.hide('doctorConfirm')
            })
            // this.ConfirmKyNhay2(dataComfirm)
          }
        }).catch(() => {
        })
      }
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.ID, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
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
              } else {
                item.Value = exited.Value
              }
            } else {
              // if (code === 'IPDIAAULANGANS') {
              //   item.Value = null
              // }
            }
          })
        }
      }
    },
    getInfo () {
      new CoordinatingWithThePatientService().find('/Info/A01_152_100122_VE/' + this._VisitId + '/' + this._ItemId).then(res => {
        this.DataHistory = res
        this.MASTERDATA['IPDIAACOORDIASS'].Items[0].Value = res.Specialty
        // if (res.LastPreNatal.length > 0) {
        //   this.MASTERDATA['IPDIAACOORDITGKGDN'].Items[0].Value = this.formatDateHour(res.LastPreNatal[0].AdmittedDate)
        // }
        // if (this.MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value) {
        //   this.MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value = res.Specialty
        // } else {
        //   this.MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value = this.$store.state.account.Specialty.ViName
        // }
      })
    },
    getData () {
      this.loaded = false
      new CoordinatingWithThePatientService().find('A01_152_100122_VE/' + this._VisitId + '/' + this._ItemId).then(res => {
        this.DataSubmit = res
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: res.ID
        }
        if (this.DataSubmit.IsLocked || this.$route.name !== 'IPDCoordinatingWithThePatientItem' || res.Confirm.HospitalLeadership.ConfirmAt || res.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt) {
          this.readonly = true
        }
        this.loaded = true
        // this.isConfirmed()
        // console.log('confirm', this.isConfirmed())
        this.mapData()
        this.getInfo()
        // this.MASTERDATA['IPDIAACOORDILDBV'].Items[0].Value = JSON.parse(ptvchinh[0].Value)
        // if (this.MASTERDATA['IPDIAACOORDIASS'].Items[0].Value === '') {
        //   this.MASTERDATA['IPDIAACOORDIASS'].Items[0].Value = this.$store.state.account.Specialty.ViName
        // }
        this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value = this.JSONParse(this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value)
        this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value = this.JSONParse(this.MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value)
        if (res.Datas.length === 0) {
          this.MASTERDATA['IPDIAACOORDIDT'].Items[0].Value = moment().format('HH:mm DD/MM/YYYY')
        }
        for (let i = 0; i < res.Datas.length; i++) {
          if (res.Datas[i].Code === 'IPDIAACOORDIGDNBCD2') {
            this.familyList = this.JSONParse(res.Datas[i].Value)
          }
          if (res.Datas[i].Code === 'IPDIAACOORDILDBVCD1') {
            this.MASTERDATA['IPDIAACOORDILDBV'].Items[0].Value = this.JSONParse(res.Datas[i].Value)
          }
          if (res.Datas[i].Code === 'IPDIAACOORDITKTKCD1') {
            this.MASTERDATA['IPDIAACOORDITKTK'].Items[0].Value = this.JSONParse(res.Datas[i].Value)
          }
          if (res.Datas[i].Code === 'IPDIAACOORDIBSTCCD1') {
            this.MASTERDATA['IPDIAACOORDIBSTC'].Items[0].Value = this.JSONParse(res.Datas[i].Value)
          }
          // 1
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK1CD4' && res.Datas[i].Value) {
            this.showItems1 = true
          }
          // 2
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK2CD4' && res.Datas[i].Value) {
            this.showItems2 = true
          }
          // 3
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK3CD4' && res.Datas[i].Value) {
            this.showItems3 = true
          }
          // 4
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK4CD4' && res.Datas[i].Value) {
            this.showItems4 = true
          }
          // 5
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK5CD4' && res.Datas[i].Value) {
            this.showItems5 = true
          }
          // 1
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK1CD4' && res.Datas[i].Value) {
            this.textOther1 = res.Datas[i].Value
          }
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK2CD4' && res.Datas[i].Value) {
            this.textOther2 = res.Datas[i].Value
          }
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK3CD4' && res.Datas[i].Value) {
            this.textOther3 = res.Datas[i].Value
          }
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK4CD4' && res.Datas[i].Value) {
            this.textOther4 = res.Datas[i].Value
          }
          if (res.Datas[i].Code === 'IPDIAACOORDIXNKK5CD4' && res.Datas[i].Value) {
            this.textOther5 = res.Datas[i].Value
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        console.log('family', this.familyList)
      }).catch(() => {
        this.loaded = true
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.$router.push({name: 'ListPatientInIPD'})
      }
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.$router.push({name: 'ListPatientInIPD'})
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      console.log('type', TypeConfirm)
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    syncHistoryOfPatientIllnessAndAssessment (type) {
      new CoordinatingWithThePatientService().find('Info/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.DataInfo = res
        if (res.RoomId && !type && this.NullRoomId && !this.isConfirmed) {
          this.MASTERDATA['IPDSO15DTR01'].Items[0].Value = res.RoomId
        }
        if (res.TotalMedical.ClinicalEvolution && type) {
          this.MASTERDATA['IPDSO15DTR12'].Items[0].Value = res.TotalMedical.ClinicalEvolution
        }
        if (res.TotalMedical.ResultsOfPrincipleTest && type) {
          this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = res.TotalMedical.ResultsOfPrincipleTest
        }
        if ((res.TotalMedical.Treatment.MethodTreatment || res.TotalMedical.Treatment.MainDrugsUsed) && type) {
          let str = ''
          if (res.TotalMedical.Treatment.MethodTreatment) {
            str += `Phương pháp điều trị: \n + ${res.TotalMedical.Treatment.MethodTreatment}`
          }
          if (res.TotalMedical.Treatment.MethodTreatment && res.TotalMedical.Treatment.MainDrugsUsed) {
            str += '\n'
          }
          if (res.TotalMedical.Treatment.MainDrugsUsed) {
            str += `Các thuốc chính đã dùng: \n + ${res.TotalMedical.Treatment.MainDrugsUsed}`
          }
          this.MASTERDATA['IPDSO15DTR16'].Items[0].Value = str
        }
        if (res.TotalMedical.ResultsOfTreatment && type) {
          this.MASTERDATA['IPDSO15DTR18'].Items[0].Value = res.TotalMedical.ResultsOfTreatment
        }
        if (res.TotalMedical.ContinuousTreatmentAndPrognosis && type) {
          this.MASTERDATA['IPDSO15DTR20'].Items[0].Value = res.TotalMedical.ContinuousTreatmentAndPrognosis
        }
      })
    },
    icdChange (value) {
      this.MASTERDATA['IPDIAACINCDBOD'].Items[0].Value = value
      this.MASTERDATA['IPDIAACINCDBOD'].Items[1].Value = value[0].ViName
    },
    icdChange2 (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = this.MASTERDATA['IPDSO15DTR10'].Items[0].Value || ''
      this.MASTERDATA['IPDSO15DTR10'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      if (this.ICD2) {
        const array = []
        this.ICD2.forEach(elm => {
          array.push(elm)
        })
        this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = JSON.stringify(array)
      } else {
        this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = ''
      }
    },
    popupSave (data) {
      if (!this.isConfirmed) {
        this.save(data)
      } else {
        this.ConfirmKyNhay2(data)
      }
    },
    ConfirmKyNhay2 (data) {
      new CoordinatingWithThePatientService().update('/Confirm/' + this._VisitId + '/' + this._ItemId, data).then(() => {
        this.scroll2Bottom()
        this.toastedSuccess()
        this.reload()
      }).catch(() => {
      })
    },
    handleCopy (data) {
      if (!data) return
      if (data.Type === 'main') {
        if (data.Icd) {
          this.ICD1 = this.JSONParse(data.Icd)
          this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = data.Icd
        }
        this.MASTERDATA['IPDSO15DTR06'].Items[0].Value = data.Disease
      } else {
        if (data.Icd) {
          this.ICD2 = this.JSONParse(data.Icd)
          this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = data.Icd
        }
        this.MASTERDATA['IPDSO15DTR10'].Items[0].Value = data.Disease
      }
    },
    getDataTextFill (Data, type) {
      let data = {
        Icd: '',
        Disease: '',
        CreateBy: '',
        UpdateAt: '',
        Type: ''
      }
      if (Data) {
        data = {
          Icd: '',
          Disease: '',
          CreateBy: Data.CreateBy,
          UpdateAt: Data.UpdateAt,
          Type: type
        }
        if (type === 'main') {
          data.Icd = Data.ICD10MainDisease
          data.Disease = Data.MainDisease
        } else {
          data.Icd = Data.IDC10IncludingDisease
          data.Disease = Data.IncludingDisease
        }
      }
      return data
    }
  },
  computed: {
    isConfirmed () {
      // if (this.DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt || this.DataSubmit.Confirm.HospitalLeadership.ConfirmAt || this.viewOnly || this.DataSubmit.IsLocked || (this.condition && this.condition === 'Nurse')) {
      //   return true
      // } else {
      //   return false
      // }
      return this.DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt || this.DataSubmit.Confirm.HospitalLeadership.ConfirmAt || this.viewOnly || this.DataSubmit.IsLocked || !this.hasRole('STILLBIRTHCFPOST')
    },
    checkConfirm () {
      return this.viewOnly || this.IsLocked || !this.hasRole('STILLBIRTHCFPOST') || this.DataSubmit.Confirm.HospitalLeadership.ConfirmAt
    },
    checkConfirm2 () {
      return this.viewOnly || this.IsLocked || !this.hasRole('STILLBIRTHCFPOST') || this.DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt
    },
    IPDIAAULANG: function () {
      return this.BLOODFROUABO.map((e) => e.label)
    },
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
    // this.DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.ConfirmAt ||
    // this.DataSubmit.Confirm.HospitalLeadership.ConfirmAt ||
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  }
}
</script>
 <style lang="stylus" scoped>
 .validate-style {
  border: 1px solid red;
  border-radius: 4px;
 }
 .colorError {
   border-color: red !important;
 }
 .columnCheckBox {
  float: left;
  width: 32%;
 }
 .w400 {
  width: 430px;
 }
 .column {
  float: left;
  width: 49%;
 }
 .column2 {
  float: right;
  width: 40%;
 }
 .table-info {
  border: 1px solid #efefef;
  width: 120px;
  text-align: center;
  border-radius: 4px;
 }
 .box-collapse-title {
  text-align: left !important;
 }
 .box-top-content {
  border-top: 2px solid #D2D6DE;
 }
 .content-box2 {
  margin-bottom: 5px;
  .mini-box1, .mini-box2 {
   border: 1px solid #D2D6DE;
   padding: 6px 12px 0 12px;
   border-top: 0px;
  }
  .box-ed-content {
   background: #ffd695;
   padding: 5px;
   border-radius: 0px 0px 4px 4px;
  }
 }
 </style>
