<template>
  <div>
    <basepopup name="PopupViHC" width="1100" :fixed="true" :isShowFooter="false" :clickToClose="true">
      <div slot="title" class="text-center d-flex flex-center justify-content-center">
        <h3 class="m-0" style="flex: 1">THÔNG TIN LƯỢT KHÁM TỪ VIHC/ <i>HEALTH CHECK CERTIFICATE</i></h3>
        <i style="cursor: pointer; font-size: 20px;" @click="handleClose()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i>
      </div>
      <template v-if="loaded">
        <template v-if="Data.name" id="PopupViHC-Print" class="main-content disable_ccp">
          <div class="row" style="margin-top: 45px;">
            <div class="col-md-6 text-center">
              <p>Bệnh viện Đa khoa Quốc Tế Vinmec/ <i>Vinmec International Hospital</i></p>
              <p><span class="text-underline">{{Data.systemHospitalName}}</span></p>
              <p>Số: {{Data.reportOrderNumber}} /GKSK - {{Data.systemHospitalCode}}</p>
            </div>
            <div class="col-md-6 text-center">
              <p class="textUppercase font-title">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
              <p class="textUppercase font-title mb-5"><i>SOCIALIST REPUBLIC OF VIETNAM</i></p>
              <p><span class="text-underline font-title">Độc lập - Tự do - Hạnh phúc</span></p>
              <p><span class="text-underline font-title"><i>Independence – Freedom - Happiness</i></span></p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <p class="main-title font-title textUppercase text-center">Giấy khám sức khoẻ/ <i>Health Check Certificate</i></p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <div class="d-flex flex-center justify-content-center img-box">
                <p>Ảnh (4 x 6cm)</p>
              </div>
            </div>
            <div class="col-md-9">
              <p>Họ và tên <i>(Chữ in hoa)</i>/ <i>Full name (Capital letters)</i>: <span class="textUppercase font-bold">{{Data.name}}</span></p>
              <div class="d-flex">
                <p class="mr-5">Giới tính/ <i>Gender</i>:</p>
                <div class="d-flex flex-center mr-10" style="margin-bottom: 7px;">
                  <label class="font-normal mr-5" for="cboFemale">Nam/ <i>Male</i></label>
                  <input class="m-0 pointer-none" style="transform: translateY(-2px);" type="checkbox" id="cboFemale" value="Male" v-model="checkedGender"/>
                </div>
                <div class="d-flex flex-center mr-20" style="margin-bottom: 7px;">
                  <label class="font-normal mr-5" for="cboMale">Nữ/ <i>Female</i></label>
                  <input class="m-0 pointer-none" style="transform: translateY(-2px);" type="checkbox" id="cboMale" value="Female" v-model="checkedGender"/>
                </div>
                <p class="mr-20">Tuổi/ <i>Age</i>: {{Data.age}}</p>
                <p>Mã số/ PID: {{Data.pid}}</p>
              </div>
              <div class="d-flex">
                <p class="mr-20">Số CMND hoặc Hộ chiếu/ <i>Identity card or passport</i>: {{Data.idCardOrPassport}}</p>
                <p>Ngày cấp/ <i>Date of issue</i>: {{Data.dateOfissueOfIdCardOrPassport}}</p>
              </div>
              <p>Nơi cấp/ <i>Place of issue</i>: {{Data.placeOfissueOfIdCardOrPassport}}</p>
              <p>Chỗ ở hiện tại/ <i>Current address</i>: {{Data.address}}</p>
              <p>Lý do khám sức khỏe/ <i>Reason for health check</i>: {{Data.reasonforhealthcheck}}</p>
              <p class="textUppercase font-bold" style="margin: 15px 0;">TIỀN SỬ BỆNH CỦA ĐỐI TƯỢNG KHÁM SỨC KHỎE/ <i>ANAMNESIS</i></p>
            </div>
          </div>
          <div>
            <p><b>1. Tiền sử gia đình/</b> <i>Family medical history</i>:</p>
            <p>Có ai trong gia đình ông (bà) mắc một trong các bệnh: truyền nhiễm, tim mạch, đái tháo đường, lao, hen phế quản, ung thư, động kinh, rối loạn tâm thần, bệnh khác/ <i>Does anyone in your family have one of the following diseases: infectious disease, cardiovascular disease, diabetes, tuberculosis, bronchial asthma, cancer, epilepsy, mental disorder, other diseases:</i></p>
            <div class="d-flex flex-center">
              <div class="d-flex flex-center mr-20">
                <p class="mr-5">a) Không</p>
                <i v-if="!Data.tienSuGiaDinhCoBenh" class="fa fa-check-square-o">;</i>
                <i v-else class="fa fa-square-o">;</i>
              </div>
              <div class="d-flex flex-center mr-20">
                <p class="mr-5">b) Có</p>
                <i v-if="Data.tienSuGiaDinhCoBenh" class="fa fa-check-square-o">;</i>
                <i v-else class="fa fa-square-o">;</i>
              </div>
              <p>Nếu "có", đề nghị ghi cụ thể tên bệnh/ <i>If "yes", please specify the name of the disease</i>: <span class="content-fill">{{Data.tienSuGiaDinh}}</span></p>
            </div>
          </div>
          <div>
            <p><b>2. Tiền sử bản thân/</b> <i>Medical history</i>:</p>
            <p>Ông (bà) đã/đang mắc bệnh, tình trạng bệnh nào sau đây không: Bệnh truyền nhiễm, bệnh tim mạch, đái tháo đường, lao, hen phế quản, ung thư, động kinh, rối loạn tâm thần, bệnh khác/ <i>Have you had any of the following conditions: Infectious diseases, cardiovascular disease, diabetes, tuberculosis, bronchial asthma, cancer, epilepsy, mental disorders, other diseases</i>:</p>
            <div class="d-flex flex-center">
              <div class="d-flex flex-center mr-20">
                <p class="mr-5">a) Không</p>
                <i v-if="!Data.tienSuBanThanCoBenh" class="fa fa-check-square-o">;</i>
                <i v-else class="fa fa-square-o" style="transform: translateY(-2px);">;</i>
              </div>
              <div class="d-flex flex-center mr-20">
                <p class="mr-5">b) Có</p>
                <i v-if="Data.tienSuBanThanCoBenh" class="fa fa-check-square-o">;</i>
                <i v-else class="fa fa-square-o" style="transform: translateY(-2px);">;</i>
              </div>
              <p>Nếu "có", đề nghị ghi cụ thể tên bệnh/ <i>If "yes", please specify the name of the disease</i>: <span class="content-fill">{{Data.tienSuBanThan}}</span></p>
            </div>
          </div>
          <div>
            <p><b>3. Câu hỏi khác</b>/ <i>Other questions</i></p>
            <p>a) Ông (bà) có đang điều trị bệnh gì không? Nếu có, xin hãy liệt kê các thuốc đang dùng và liều lượng/ <i>Are you currently being treated? If yes, please list your medications and dosages</i>: <span class="content-fill">{{Data.dangSudungThuoc_LieuLuong}}</span></p>
            <p>b) Tiền sử thai sản (Đối với phụ nữ)/ <i>Maternity history (For women)</i>: <span class="content-fill">{{Data.tienSuThaiSan}}</span></p>
          </div>
          <div class="row mt-10">
            <div class="col-md-6">
              <p>Tôi xin cam đoan những điều khai trên đây hoàn toàn đúng với sự thật theo sự hiểu biết của tôi./ <i>I solemnly declare that the above statements are true to the best of my knowledge</i>.</p>
            </div>
            <div class="col-md-6 text-center">
              <p><i>{{ examinationDateFormat(Data.examinationDateString) }}</i></p>
              <p><b>Người đề nghị khám sức khỏe</b>/ <i>The person offer</i></p>
              <p><i>(Ký và ghi rõ họ, tên)/ (Name, signature)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </div>
          </div>
          <div>
            <p><b>I. KHÁM THỂ LỰC</b>/ <i>PHYSICAL EXAMINATION</i></p>
            <div class="d-flex flex-center group-vitalsigns">
              <p>Chiều cao/ <i>Height</i>: {{Data.physicalHeightResult || '....'}} cm;</p>
              <p>Cân nặng/ <i>Weight</i>: {{Data.physicalWeightResult || '....'}} kg;</p>
              <p>Chí số BMI/ <i>BMI</i>: {{Data.physicalBmiResult || '....'}} kg/m2</p>
              <p>Vòng ngực/ <i>Chest</i>: {{Data.chestValue || '....'}} cm</p>
            </div>
            <div class="d-flex flex-center group-vitalsigns">
              <p>Mạch/ <i>Pulse</i>: {{Data.circuitResult || '....'}} lần/phút <i>(times/minute)</i>;</p>
              <p>Huyết áp/ <i>Blood pressure</i>: {{Data.bloodPressureMax || '....'}}/ {{Data.bloodPressureMin || '....'}} mmHg (--lấy HA tối đa/ HA tối thiểu);</p>
              <p>Vòng bụng/ <i>Waist circumference</i>: {{Data.physicalWaistCircumResult || '....'}} cm</p>
            </div>
            <p>Phân loại thể lực/ <i>Physical classification</i>: <b>{{Data.classifyAnthropometry || 'Không phân loại'}}</b></p>
          </div>
          <div class="table-vihc" style="margin-top: 20px;">
            <p><b>II. KHÁM LÂM SÀNG</b>/ <i>CLINICAL EXAMINATION</i></p>
            <table style="width: 100%;">
              <thead>
                <th width="70%"><p style="padding: 5px;"><b>Nội dung khám</b>/ <i>Content examination</i></p></th>
                <th width="30%"><p style="padding: 5px;"><b>Họ tên, Chữ ký của Bác Sĩ</b>/ <i>Doctor's Full Name, Signature</i></p></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p><b>1. Nội khoa</b>/ <i>Internal medicine</i>: <span class="content-fill">{{Data.circulatoryExamResult}}</span></p>
                    <p>1.1. Tuần hoàn/ <i>Circulatory</i></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: {{Data.classifyCirculatory}}</p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgCardiologistSignature" style="width: 100%;" :src="Data.imgCardiologistSignature" alt="imgCardiologistSignature">
                    </div>
                    <p v-if="Data.hoTenBSTimMach" class="content-fill text-center mb-5">{{Data.hoTenBSTimMach}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1.2. Hô hấp/ <i>Respiratory</i>: <span class="content-fill">{{Data.respiratoryExamResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: {{Data.classifyRespiratory}}</p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgRespiratoryDoctorSignature" style="width: 100%;" :src="Data.imgRespiratoryDoctorSignature" alt="imgRespiratoryDoctorSignature">
                    </div>
                    <p v-if="Data.hoTenBSHoHap" class="content-fill text-center mb-5">{{Data.hoTenBSHoHap}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1.4. Thận - Tiết niệu/ <i>Kidney - Urology</i>: <span class="content-fill">{{Data.kidneyUrologyExamResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: {{Data.classifyKidneyUrology}}</p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgNephrologistSignature" style="width: 100%;" :src="Data.imgNephrologistSignature" alt="imgNephrologistSignature">
                    </div>
                    <p v-if="Data.hoTenBSThanTietNieu" class="content-fill text-center mb-5">{{Data.hoTenBSThanTietNieu}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1.5. Cơ-xương-khớp/ <i>Musculoskeletal</i>: <span class="content-fill">{{Data.musculoskeletalExamResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyMusculoskeletal}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgMusculoskeletalDoctorSignature" style="width: 100%;" :src="Data.imgMusculoskeletalDoctorSignature" alt="imgMusculoskeletalDoctorSignature">
                    </div>
                    <p v-if="Data.hoTenBSCoXuongKhop" class="content-fill text-center mb-5">{{Data.hoTenBSCoXuongKhop}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1.6. Thần kinh/ <i>Neurology</i>: <span class="content-fill">{{Data.neurologyExamResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyNeurology}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgNeurosurgeonSignature" style="width: 100%;" :src="Data.imgNeurosurgeonSignature" alt="imgNeurosurgeonSignature">
                    </div>
                    <p v-if="Data.hoTenBSThanKinh" class="content-fill text-center mb-5">{{Data.hoTenBSThanKinh}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1.7. Tâm thần/ <i>Mental</i>: <span class="content-fill">{{Data.mentalExamResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyMental}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgPsychiatristSignature" style="width: 100%;" :src="Data.imgPsychiatristSignature" alt="imgPsychiatristSignature">
                    </div>
                    <p v-if="Data.hoTenBSTamThan" class="content-fill text-center mb-5">{{Data.hoTenBSTamThan}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>1.8. Nội tiết/ <i>Endocrinology</i>: <span class="content-fill">{{Data.noiTietResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.noiTietClassify}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imageNoiTiet" style="width: 100%;" :src="Data.imageNoiTiet" alt="imageNoiTiet">
                    </div>
                    <p v-if="Data.hoTenBSNoiTiet" class="content-fill text-center mb-5">{{Data.hoTenBSNoiTiet}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>2. Ngoại khoa</b>/ <i>Surgery</i>: <span class="content-fill">{{Data.surgeryExamResult}}</span></p>
                    <p class="ml-5">Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifySurgery}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgSurgerySignature" style="width: 100%;" :src="Data.imgSurgerySignature" alt="imgSurgerySignature">
                    </div>
                    <p v-if="Data.hoTenBSNgoaiKhoa" class="content-fill text-center mb-5">{{Data.hoTenBSNgoaiKhoa}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>3. Mắt</b>/ <i>Eyes</i>:</p>
                    <p class="ml-5">- Kết quả khám thị lực/ <i>Result of eyesight test</i>:</p>
                    <div class="d-flex flex-center group-vitalsigns" style="margin-left: 30px;">
                      <p>Không kính <i>Without glass</i>:</p>
                      <p>mắt phải/ eye right: <span class="content-fill">{{Data.eyeRightWithoutGlassResult }}</span></p>
                      <p>mắt trái/ eye left: <span class="content-fill">{{Data.eyeLeftWithoutGlassResult}}</span></p>
                    </div>
                    <p class="ml-5">- Các bệnh về mắt (nếu có)/ <i>Eye diseases (if have)</i>: <span class="content-fill">{{Data.eyeDiseasesResult}}</span></p>
                    <p class="ml-5">- Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyEye}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgOphthalmologistSignature" style="width: 100%;" :src="Data.imgOphthalmologistSignature" alt="imgOphthalmologistSignature">
                    </div>
                    <p v-if="Data.hoTenBSMat" class="content-fill text-center mb-5">{{Data.hoTenBSMat}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>4. Tai - Mũi - Họng</b>/ <i>E.N.T</i>:</p>
                    <p class="ml-5">- Kết quả khám thính lực/ <i>Result of hearing test</i>:</p>
                    <div style="margin-left: 30px;">
                      <p>Tai trái: Nói thường/ Ear feft: Speak normal: <span class="content-fill">{{Data.earLeftSpeakNormalExamResult}}</span> m; Nói thầm/ Whisper <span class="content-fill">{{Data.earLeftwhisperExamResult}}</span> m</p>
                      <p>Tai phải: Nói thường/ Ear right: Speak normal: <span class="content-fill">{{Data.earRightSpeakNormalExamResult}}</span> m; Nói thầm/ Whisper <span class="content-fill">{{Data.earRightwhisperExamResult}}</span> m</p>
                    </div>
                    <p class="ml-5">- Các bệnh về tai mũi họng (nếu có)/ <i>E.N.T diseases (if have)</i>: <span class="content-fill">{{Data.enTdiseasesExamResult}}</span></p>
                    <p class="ml-5">- Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyENT}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgRespiratoryDoctorSignature" style="width: 100%;" :src="Data.imgRespiratoryDoctorSignature" alt="imgRespiratoryDoctorSignature">
                    </div>
                    <p v-if="Data.hoTenBSTaiMuiHong" class="content-fill text-center mb-5">{{Data.hoTenBSTaiMuiHong}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>5. Răng-Hàm-Mặt</b>/ <i>Dentomaxillofacial</i>:</p>
                    <p class="ml-5">- Kết quả khám/ <i>Result of examination</i>:</p>
                    <div style="margin-left: 30px;">
                      <p>+ Hàm trên/ <i>Upper jaw</i>: <span class="content-fill">{{Data.upperJawExamResult}}</span></p>
                      <p>+ Hàm dưới/ <i>Lower jaw</i>: <span class="content-fill">{{Data.lowerJawExamResult}}</span></p>
                    </div>
                    <p class="ml-5">- Các bệnh về Răng-Hàm-Mặt (nếu có)/ <i>Teeth-Jaw-Face diseases (if have)</i>: <span class="content-fill">{{Data.teethJawFaceDiseasesExamResult}}</span></p>
                    <p class="ml-5">- Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyDentistry}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgDentistSignature" style="width: 100%;" :src="Data.imgDentistSignature" alt="imgDentistSignature">
                    </div>
                    <p v-if="Data.hoTenBSRangHamMat" class="content-fill text-center mb-5">{{Data.hoTenBSRangHamMat}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>6. Da liễu</b>/ <i>Dermatology</i>: <span class="content-fill">{{Data.dermatologyExamResult}}</span></p>
                    <p class="ml-5">- Phân loại/ <i>Classify</i>: <span class="content-fill">{{Data.classifyDermatology}}</span></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgDermatologistSignature" style="width: 100%;" :src="Data.imgDermatologistSignature" alt="imgDermatologistSignature">
                    </div>
                    <p v-if="Data.hoTenBSDaLieu" class="content-fill text-center mb-5">{{Data.hoTenBSDaLieu}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-vihc" style="margin-top: 20px;">
            <p><b>III. KHÁM CẬN LÂM SÀNG</b>/ <i>CLINICAL EXAMINATION</i></p>
            <table style="width: 100%;">
              <thead>
                <th width="70%"><p style="padding: 5px;"><b>Nội dung khám</b>/ <i>Content examination</i></p></th>
                <th width="30%"><p style="padding: 5px;"><b>Họ tên, Chữ ký của Bác Sĩ</b>/ <i>Doctor's Full Name, Signature</i></p></th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p><b>1. Chẩn đoán hình ảnh</b>/ <i>Image examination</i>:</p>
                    <p class="content-fill mb-5" v-html="Data.imageExamResult"></p>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imgImageExamDoctorSignature" style="width: 100%;" :src="Data.imgImageExamDoctorSignature" alt="imageExamDoctorSignature ">
                    </div>
                    <p v-if="Data.hoTenBSTKCDHA" class="content-fill text-center mb-5">{{Data.hoTenBSTKCDHA}}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>2. Kết quả cận lâm sàng khác</b>/ <i>Other results of subclinical tests</i>:</p>
                    <span class="content-fill" v-html="Data.doctorGPSummaryContentSub"></span>
                  </td>
                  <td>
                    <div>
                      <img v-if="Data.imageGPCLSKSignature" style="width: 100%;" :src="Data.imageGPCLSKSignature" alt="imageGPCLSKSignature ">
                    </div>
                    <p v-if="Data.hoTenBSGPCLSK" class="content-fill text-center mb-5">{{Data.hoTenBSGPCLSK}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="margin-top: 20px;">
            <p><b>IV. KẾT LUẬN</b>/ <i>CONCLUSION</i></p>
            <p><b>1. Phân loại sức khỏe</b>/ <i>Health classify</i>: <span class="content-fill">{{Data.classifyHealthy || 'Không phân loại'}}</span></p>
            <p><b>2. Các bệnh, tật (nếu có)</b>/ <i>The diseases (if have)</i>:</p>
            <span class="content-fill" v-html="Data.doctorGPSummaryContentResult"></span>
          </div>
          <div class="row">
            <div class="col-md-6 col-md-offset-6 text-center">
              <p>{{conclusionGPDate | bilingualFormatDateViHC}}</p>
              <p><b class="textUppercase">NGƯỜI KẾT LUẬN</b></p>
              <p><i>(Ký và ghi rõ họ, tên)/ (Name, signature)</i></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-center" style="margin-top: 35px; padding: 10px 0;">{{__t('Không có thông tin!')}}</div>
        </template>
      </template>
      <div v-else class="loading-text"><v-loading/></div>
      <div slot="footer">
        <div class="d-flex align-center" style="padding: 0 250px; justify-content: center;">
          <div>
            <button type="button" class="btn btn-block v-white-btn" style="width: 150px" @click="handleClose()">{{__t('Đóng')}}</button>
          </div>
        </div>
      </div>
    </basepopup>
  </div>
</template>

<script>
import ApiReport from '@/services/ApiReport'
import moment from 'moment'
export default {
  name: 'PopupViHC',
  props: {
    vihcItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loaded: false,
      params: {
        PID: '',
        SiteCode: '',
        VisitCode: ''
      },
      checkedGender: [],
      Data: {},
      conclusionGPDate: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    examinationDateFormat (time) {
      let formatTime = time.split('/')
      return `Ngày/ date ${formatTime[0]} tháng/ month ${formatTime[1]} năm/ year ${formatTime[2]}`
    },
    getGender (val) {
      this.checkedGender = []
      val === 'F' ? this.checkedGender = ['Female'] : this.checkedGender = ['Male']
    },
    getData () {
      this.params = {
        PID: this.CurrentPatientObj.PID || this.$route.params.Id,
        SiteCode: this.vihcItem.SiteCode,
        VisitCode: this.vihcItem.VisitCode
      }
      new ApiReport(this.params).find('MohFinalReport')
        .then(response => {
          this.Data = response
          this.getGender(response.sex)
          this.conclusionGPDate = moment(response.conclusionGPDate).format('HH:mm DD/MM/YYYY')
          this.loaded = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleClose () {
      this.$emit('closePopup', false)
      this.$modal.hide('PopupViHC')
    }
  }
}
</script>

<style scoped>
.mr-20 {
  margin-right: 20px;
}
p {
  margin-bottom: 5px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
}
.font-title {
  font-weight: bold;
  font-size: 18px;
}
.main-title {
  font-size: 25px;
  margin: 20px 0;
}
.img-box {
  width: 150px;
  text-align: center;
  height: 200px;
  border: 1px solid black;
  margin: 0 auto;
}
.group-vitalsigns p:not(:last-child) {
  margin-right: 10px;
}
.content-fill {
  border-bottom: 1px dotted black;
  font-style: italic;
}
.table-vihc table, th, td{
  border: 1px solid;
  border-collapse: collapse;
}
.table-vihc th > p {
  margin: 0;
  padding-right: 5px;
}
.table-vihc td {
  padding: 0 5px;
  border-bottom: none;
}
</style>
