<template>
  <div class="btn-group btn-group-none-style">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getPosition($event)">
      <span class="glyphicon glyphicon-option-vertical"></span>
    </button>
    <div :id="menuId" class="dropdown-menu v-dropdown-menu v-context-menu ed-menu" :class="menuClass">
      <div class="v-selectmenu sm-advanced" style="position: relative;">
        <!-- menu gây mê -->
        <div class="sm-tabs" v-if="IsAnesthesia">
          <div>
            <span @click="setRole(role.id, $event)" class="active" :class="{'active': role.id === current}" :data="role" :key="'i-' + i" v-for="(role ,i) in roleIsAthena">
              <a href="javascript:void(0);">{{__label(role)}}</a>
            </span>
          </div>
        </div>
        <!-- menu bình thường -->
        <div class="sm-tabs" v-else>
          <div>
            <span @click="setRole(role.id, $event)" :class="{'active': role.id === current}" :data="role" :key="'i-' + i" v-for="(role ,i) in listRoles">
              <a href="javascript:void(0);">{{__label(role)}}</a>
            </span>
          </div>
        </div>
        <input v-if="!IsAnesthesia" type="text" v-model="search" class="form-control input-search" :placeholder="__t('Tìm kiếm')">
        <div class="sm-result-area sm-scroll-limit" v-if="IsAnesthesia">
          <ul class="sm-results" v-if="menuItems.length > 0">
            <template v-for="(link ,i) in menuItems">
              <li v-if="hasRolee(link)" :class="{'active': activeClass(link)}" :id="'menu-' + (link.Id || link.Type)" :data="link" :key="i"><a :href="url(link)">{{__label(link)}}</a></li>
            </template>
          </ul>
        </div>
        <div class="sm-result-area sm-scroll-limit" v-else>
          <ul class="sm-results" v-if="menuSearch.length > 0">
            <template v-for="(link ,i) in menuSearch">
              <li v-if="hasRolee(link)" :class="{'active': activeClass(link)}" :id="'menu-' + (link.Id || link.Type)" :data="link" :key="i"><a :href="url(link)">{{__label(link)}}</a></li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import $ from 'jquery'
export default {
  name: 'MDContextMenu',
  props: ['VisitId', 'MenuPositon', 'Customer', 'Type', 'menuItems', 'IsAnesthesia', 'IsTelehealth'],
  components: {},
  data () {
    return {
      activeMenu: 0,
      menuId: this.makeid(),
      menuClass: '',
      Doctor: {
        id: 3,
        ViName: 'Bác sĩ',
        EnName: 'Doctor',
        Active: true
      },
      Nurse: {
        id: 2,
        ViName: 'Điều dưỡng',
        EnName: 'Nurse',
        Active: false
      },
      current: 3,
      search: '',
      groupMenu: [{
        title: this.$t('Hành chính, Cam kết'),
        value: 1
      },
      {
        title: this.$t('Bệnh án hội chẩn'),
        value: 2
      },
      {
        title: this.$t('Y lệnh'),
        value: 3
      },
      {
        title: this.$t('Y lệnh khác'),
        value: 4
      },
      {
        title: this.$t('Theo dõi điều dưỡng'),
        value: 5
      },
      {
        title: this.$t('Phẫu thuật, Thủ thuật'),
        value: 6
      },
      {
        title: this.$t('Kết quả xét nghiệm'),
        value: 7
      },
      {
        title: this.$t('Kết quả CĐHA'),
        value: 8
      },
      {
        title: this.$t('Ra viện'),
        value: 9
      },
      {
        title: this.$t('Khác'),
        value: 10
      },
      {
        title: this.$t('Biểu mẫu không thuộc HSBA'),
        value: 11
      }],
      menuSearch: [],
      roleIsAthena: [{
        id: 6,
        ViName: 'Biểu mẫu',
        EnName: 'Form',
        Active: false
      }]
    }
  },
  watch: {
    menuItems (val) {
      if (val) {
        this.menuSearch = val
      }
    },
    $route (val) {
      if (val) {
        this.menuId = this.makeid()
      }
    },
    search (val) {
      if (!val) {
        this.menuSearch = this.menuItems.filter(i => i.FormCode !== 'IPDBAICU')
      } else {
        this.menuSearch = []
        this.menuItems.filter(i => i.FormCode !== 'IPDBAICU').forEach(e => {
          if (this.xoaDau(this.__label(e).trim().toLowerCase()).includes(this.xoaDau(val.trim().toLowerCase()))) {
            this.menuSearch.push(e)
          }
        })
      }
      this.menuSearch.find(e => {
        if (e.FormCode === 'BMTIMMACH') {
          e.ViName = 'Bệnh án tim mạch'
          e.EnName = 'Cardiology medical record for inpatient'
        }
      })
    }
  },
  created () {
    if (this.IsAnesthesia) {
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.menuItems[i].Type === 'InitialAssessment') {
          this.menuItems[i].Role = [1, 2, 3]
        }
      }
    }
    if (this.$store.state.account.Position.includes('Doctor')) {
      this.Doctor.id = 1
      this.current = 1
    } else {
      this.current = 2
    }
    this.menuItems.filter(i => i.FormCode !== 'IPDBAICU')
    if (this.menuItems.length > 0) {
      this.menuSearch = _.cloneDeep(this.menuItems.filter(i => i.FormCode !== 'IPDBAICU'))
      this.menuSearch.find(e => {
        if (e.FormCode === 'BMTIMMACH') {
          e.ViName = 'Bệnh án tim mạch'
          e.EnName = 'Cardiology medical record for inpatient'
        }
      })
    }
  },
  computed: {
    listRoles: function () {
      return (_.sortBy([this.Doctor, this.Nurse], o => o.id)).concat([
        {
          id: 5,
          ViName: 'Cam kết',
          EnName: 'Consent',
          Active: false
        },
        {
          id: 4,
          ViName: 'Bản in',
          EnName: 'Print Document',
          Active: false
        }
      ])
    }
  },
  methods: {
    preventClose () {
      $(document).on('click', '.v-selectmenu', function (e) {
        e.stopPropagation()
      })
    },
    checkString (str1, str2) {
      if (str1 === str2 && (str1 === null || str2 === null)) {
        return true
      }
      if (str1 !== str2 && (str1 === null || str2 === null)) {
        return false
      }
      return str1.toLowerCase() === str2.toLowerCase()
    },
    activeClass (link) {
      let url = ''
      let type = ''
      type = this.getType(link.Type)
      if (this.$route.meta.type && type && this.$route.meta.type === 'Pediatric' && type === 'MedicalRecord') {
        type = ''
      }
      if (this.$route.meta.type && type && this.$route.meta.type === 'Neonatal' && type === 'MedicalRecord') {
        type = ''
      }
      if (type) {
        url = `#/${this.Type}/${type}`
      } else {
        url = `#/${this.Type}/${link.Type}`
      }
      return window.location.hash.toLowerCase().includes(url.toLowerCase())
    },
    getType (type) {
      let name = ''
      if (type) {
        if (type === 'MortalityReport/Page1') {
          type = 'MortalityReport'
        }
        // Bệnh án nhi khoa
        if (type.includes('MedicalRecordPediatric')) {
          name = 'MedicalRecordPediatric'
        }
        // Bệnh án sơ sinh
        if (type.includes('MedicalRecordNeonatal')) {
          name = 'MedicalRecordNeonatal'
        }
        // Bệnh án sản khoa
        if (type.includes('MedicalRecordObstetrics')) {
          name = 'MedicalRecordObstetrics'
        }
        // Bệnh án phụ khoa
        if (type.includes('MedicalRecordGynecological')) {
          name = 'MedicalRecordGynecological'
        }
        // Bệnh án ung bướu
        if (type.includes('MedicalRecordOncology')) {
          name = 'MedicalRecordOncology'
        }
        // Bệnh án tai mắt
        if (type.includes('MedicalRecordEye')) {
          name = 'MedicalRecordEye'
        }
        // Bệnh án nội khoa
        if (type.includes('MedicalRecord/')) {
          name = 'MedicalRecord/'
        }
        if (type.includes('TheSurgicalMedicalRecord')) {
          name = 'TheSurgicalMedicalRecord'
        }
        // Đánh giá ban đầu
        if (type === 'InitialAssessment/ForAdult') {
          name = 'InitialAssessment'
        }
        // tiền sử thuốc nhi
        if (type === 'MedicationHistoryFormForNewBorn') {
          name = 'MedicationHistoryFormForNewBorn'
        }
        // Bệnh án tim mạch
        if (type.includes('CardiovascularForm')) {
          name = 'CardiovascularForm'
        }
        // Quản lý thai nghén OPD
        if (type === 'PregnancyFollowUpRecord/ObstetricInformation') {
          name = 'PregnancyFollowUpRecord'
        }
      }
      return name
    },
    hasRolee (link) {
      return JSON.stringify(link.Role).includes(this.current)
    },
    setRole (role, e) {
      this.current = role
      e.stopPropagation()
    },
    url (link) {
      var visitCode = this.Customer.VisitCode
      var pid = this.Customer.PID
      var visitID = this.VisitId
      var pr = {}
      if (visitCode) {
        pr.VisitCode = visitCode
      }
      if (visitID) {
        pr.VisitId = visitID
      }
      if (pid) {
        pr.PID = pid
      }
      pr.VisitType = this.Type
      if (link.Type === 'Prescription') {
        return (this.Customer.PID ? `/#/Prescription/${this.Customer.PID}` : `/#/Prescription/`) + this.getParameterString(pr)
      }
      if (link.Type === 'DoctorPlaceDiagnosticsOrder') {
        return ((this.Customer.PID && this.Customer.VisitCode) ? `/#/DoctorPlaceDiagnosticsOrder/` : `/#/DoctorPlaceDiagnosticsOrder/`) + this.getParameterString(pr)
      }
      if (link.Type === 'MedicationAdministrationRecord') {
        return `#/${link.Type}/${this.VisitId}` + this.getParameterString(pr)
      }
      return `#/${this.Type}/${link.Type}/${this.VisitId}`
    },
    getPosition (event) {
      let offset = event.target.getBoundingClientRect()
      let menuHeight = $('#' + this.menuId).height()
      let windowHeight = window.innerHeight
      let bottomY = windowHeight - offset.height - offset.y
      let topY = offset.y
      if (this.MenuPositon) {
        this.menuClass = this.MenuPositon
      } else if (bottomY > menuHeight) {
        this.menuClass = 'v-bottom'
      } else if (topY > menuHeight) {
        this.menuClass = 'v-middle'
      } else {
        this.menuClass = 'v-middle'
        if (bottomY < menuHeight / 2) {
          this.menuClass = 'v-middle-2'
        }
      }
    }
  }
}
</script>
<style scoped>
  .backColor, .backColor:hover {
    background-color: #F39C12 !important;
  }
  .input-search {
    width: 100%;
    outline: none;
  }
</style>
