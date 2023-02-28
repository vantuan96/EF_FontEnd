<template>
  <div class="btn-group btn-group-none-style">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getPosition($event)">
      <span class="glyphicon glyphicon-option-vertical"></span>
    </button>
    <div class="dropdown-menu v-dropdown-menu v-context-menu ed-menu" :class="menuClass">
      <div class="v-selectmenu sm-advanced">
        <div class="sm-tabs">
          <div>
            <span @click="setRole(role.id, $event)" :class="{'active': role.id === current}" :data="role" :key="'i-' + i" v-for="(role ,i) in listRoles">
              <a href="javascript:void(0);">{{__label(role)}}</a>
            </span>
          </div>
        </div>
        <div class="sm-result-area sm-scroll-limit">
          <ul class="sm-results">
            <li v-if="hasRole(link)" :class="{'active': activeClass(link)}" :data="link" :key="i" v-for="(link ,i) in menuItems"><a :href="'#/' + Type + '/' + link.Type + '/' + EdId">{{__label(link)}}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <ul>
      <li :data="link" :key="i" v-for="(link ,i) in items"><a :href="'#/' + Type + '/' + link.Type + '/' + EdId">{{__label(link)}}</a></li>
    </ul> -->
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'EdContextMenu',
  props: ['items', 'EdId', 'Type', 'MenuPositon'],
  components: {},
  data () {
    return {
      countOfForm: 10,
      heightItemLi: 30,
      menuClass: '',
      menuTop: 0,
      menuItems: [
        {
          ViName: 'Phân loại cấp cứu',
          EnName: 'Emergency triage record',
          Type: 'ETR',
          Role: [2],
          Group: 2
        },
        {
          ViName: 'Ghi nhận thực hiện thuốc',
          EnName: 'Standing Order',
          Type: 'StandingOrder',
          Role: [2]
        },
        {
          ViName: 'Ghi nhận thực hiện thuốc NB dịch vụ lẻ',
          EnName: 'Standing Order For Retail Service',
          Type: 'StandingOrderForRetailService',
          Role: [2]
        },
        {
          ViName: 'Bệnh án cấp cứu',
          EnName: 'Emergency record',
          Type: 'ER0',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Thêm theo dõi',
          EnName: 'Add observation',
          Type: 'OS0',
          Role: [2, 1, 3]
        },
        {
          ViName: 'Đánh giá kết thúc',
          EnName: 'Discharge information',
          Type: 'DI0',
          Role: [1, 3],
          Group: 9
        },
        {
          ViName: 'Bảng kiểm bàn giao người bệnh trước mổ',
          EnName: 'Pre-operative verification and handover checklist',
          Type: 'PHC',
          Role: [2],
          Group: 6
        },
        {
          ViName: 'Báo cáo y tế',
          EnName: 'Medical report',
          Type: 'KLM',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Báo cáo y tế ra viện',
          EnName: 'Discharge medical report',
          Type: 'DMR',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy ra viện',
          EnName: 'DischargeCertificate',
          Type: 'NPQ',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy chuyển tuyến',
          EnName: 'Transfer Letter',
          Type: 'OPDTransferLetter',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Bàn giao vận chuyển',
          EnName: 'Hand over form for patients being transferred',
          Type: 'MCA',
          Role: [2, 4],
          Group: 9
        },
        {
          ViName: 'Biên bản bàn giao người bệnh chuyển khoa',
          EnName: 'Patient hand over record',
          Type: 'PHR',
          Role: [2, 4]
        },
        {
          ViName: 'Giấy chuyển viện',
          EnName: 'ReferralLetter',
          Type: 'RL0',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Phiếu GDSK cho NB và thân nhân',
          EnName: 'Patient and family education form',
          Type: 'PFEF',
          Role: [2],
          Group: 9
        },
        {
          ViName: 'Giấy xác nhận BN cấp cứu',
          EnName: 'Emergency confirmation',
          Type: 'EMCO',
          Role: [4],
          Group: 10
        },
        {
          ViName: 'Xét nghiệm sinh hóa máu',
          EnName: 'Chemical biology test',
          Type: 'PointOfCareTesting/ChemicalBiologyTest',
          Role: [1, 3, 2],
          Group: 7
        },
        {
          ViName: 'Xét nghiệm khí máu động mạch',
          EnName: 'Arterial blood gas test',
          Type: 'PointOfCareTesting/ArterialBloodGasTest',
          Role: [1, 3, 2],
          Group: 7
        },
        {
          ViName: 'Kết quả test da',
          EnName: 'Skin test result',
          Type: 'SkinTestResult',
          Role: [1, 2, 3],
          Group: 7
        },
        {
          ViName: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
          EnName: 'Minutes of consultation for patient using drug with an asterisk mark(*)',
          Type: 'ConsultationDrugWithAnAsterisk',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Biên bản hội chẩn thông qua mổ',
          EnName: 'Joint-Consultation for approval of surgery',
          Type: 'JointConsultationForApprovalOfSurgery',
          Role: [1, 3],
          Group: 6
        }
      ],
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
      current: 3
    }
  },
  created () {
    if (this.$store.state.account.Position.includes('Doctor')) {
      this.Doctor.id = 1
      this.current = 1
    } else {
      this.current = 2
    }
  },
  computed: {
    listRoles: function () {
      return (_.sortBy([this.Doctor, this.Nurse], o => o.id)).concat([
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
      const url = `#/ed/${link.Type}`
      return window.location.hash.toLowerCase().includes(url.toLowerCase())
    },
    hasRole (link) {
      return link.Role.includes(this.current)
    },
    setRole (role, e) {
      this.current = role
      e.stopPropagation()
    },
    getPosition (event) {
      let offset = event.target.getBoundingClientRect()
      let menuHeight = 420
      // if (menuHeight > 700) {
      //   menuHeight = 700
      // }
      let windowHeight = window.innerHeight
      let bottomY = windowHeight - offset.height - offset.y
      let topY = offset.y
      if (this.MenuPositon) {
        this.menuClass = this.MenuPositon
      } else if (bottomY > menuHeight) {
        this.menuClass = 'v-bottom'
      } else if (topY > menuHeight) {
        this.menuClass = 'v-top'
      } else {
        this.menuClass = 'v-middle'
      }
    }
  }
}
</script>
