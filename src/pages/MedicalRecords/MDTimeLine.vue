<template>
<div class="MDTimeLine" v-if="dataTimeLine && dataTimeLine.length">
  <div class="XTimeline">
    <template v-for="(item, index) in dataTimeLine">
      <div class="box-content flex on-top" :id="getCheckBN(item.Status) ? 'checkBN' : ''" :key="index" :class="index === (dataTimeLine.length - 1) ? 'end-box-content' : ''">
        <div class="box-date-in mrr40">
          <div class="fw600">{{item.AdmittedDate | formatDateWithoutSecon}}</div>
          <div class="big-box-size" @mouseenter="handleShowHsba(index)" @mouseleave="handleShowHsba(index)">
            <div class="fw600 box-site dont-click"
              v-if="item && item.VisitList && item.VisitList.length"
              :id="'dropdownHsba' + index"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">{{getName(item.VisitList)}}</div>
            <div class="dropdown-menu-new" :aria-labelledby="'dropdownHsba' + index" style="height:30px;width:100px; border-radius: 10px;">
              <router-link target='_blank' :to="{name: 'RecordV2', params: {PID: item.PID, Id: getId(item), TYPE: item.VisitType, index: index, VisitType: getVisitType(item), TypeVisit: item.VisitType}}">
                  <div class="view-hsba-new" style="color:#000">{{__t('Xem tổng HSBA')}}</div>
              </router-link>
              <!-- <div class="tamgiac"></div> -->
            </div>
          </div>
        </div>
        <div v-if="item && item.VisitList" class="box-slide" :class="item.VisitList.length >= 4 ? 'on-scroll' : ''">
          <template v-for="(elm, dex) in item.VisitList">
            <div class="box-mini-content mrr20" :key="dex + 'VisitList' + index">
              <div class="box-visit-type mrb10" :class="getClassColorType(elm.Type)">{{elm.Type}}</div>
              <div><b>- Visit: </b>{{elm.VisitCode}}</div>
              <div><b>- {{__t('Vào')}}: </b>{{elm.ExaminationTime | formatDateWithoutSecon}}</div>
              <div v-if="elm && elm.Specialty"><b>- {{__t('Khoa-tl')}}: </b>{{getSpecialty(elm.Specialty)}}</div>
              <div>
                <div v-if="elm.DoctorUsername || elm.NurseUsername" class="fw600 inline">- </div>
                <div class="inline" v-if="elm.DoctorUsername"><b>{{__t('BS')}}: </b><ad-Info :ad="elm.DoctorUsername" /></div>
                <div v-if="elm.NurseUsername" class="inline" style="white-space: nowrap;" :style="!elm.DoctorUsername ? '' : 'margin-left: 9px;'"><b>{{__t('ĐD')}}: </b><ad-Info :ad="elm.NurseUsername" /></div>
              </div>
              <div v-if="getDiagnosis(elm.DiagnosisInfo)"><b>- {{__t('CĐ')}}: </b>{{getDiagnosis(elm.DiagnosisInfo)}}</div>
            </div>
          </template>
        </div>
        <div v-if="item && item.Status">
          <div class="box-status flex">
            <div class="box-dot mrr5"></div>
            <div>
              <div><b>{{__label(item.Status)}}</b></div>
              <div>{{item.DischargeDate | formatDateWithoutSecon}}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</div>
</template>
<script>
export default {
  name: 'MDTimeLine',
  props: ['value', 'dataTimeLine', 'dataCustomer'],
  data () {
    return {
    }
  },
  methods: {
    handleViewHSBA (index, item) {
      console.log('item', item.Id)
      this.$router.push({name: 'RecordV2', params: {PID: this.$route.params.Id, Id: item.Id, TYPE: item.VisitType, index: index, VisitType: item.VisitType}})
    },
    getClassColorType (type) {
      let str = ''
      if (type === 'ED') {
        str = 'color-red'
      }
      if (type === 'OPD') {
        str = 'color-origin'
      }
      if (type === 'EOC') {
        str = 'color-blue'
      }
      return str
    },
    getDiagnosis (DataDiagnosis) {
      let str = ''
      let str2 = ''
      if (DataDiagnosis) {
        if (DataDiagnosis.Diagnosis) {
          str += DataDiagnosis.Diagnosis
        }
        if (DataDiagnosis.DiagnosisOption) {
          if (str) {
            str += ', '
          }
          str += DataDiagnosis.DiagnosisOption
        }
        if (DataDiagnosis.ICD && this.JSONParse(DataDiagnosis.ICD || [], true)) {
          str2 += this.JSONParse(DataDiagnosis.ICD || [], true).map(e => e.code).join(', ')
        }
        if (DataDiagnosis.ICDOption && this.JSONParse(DataDiagnosis.ICDOption || [], true)) {
          if (str2) {
            str2 += '/ '
          }
          str2 += this.JSONParse(DataDiagnosis.ICDOption || [], true).map(e => e.code).join(', ')
        }
        if (str2) {
          str += ' (' + str2 + ')'
        }
      }
      return str2
    },
    handleCheckNB (Status) {
      console.log('Status: ', Status)
      let str = ''
      if (Status && Status.EnName) {
        str += Status.EnName.trim().toLowerCase().replaceAll(' ', '-')
      }
      return str
    },
    handleShowHsba (index) {
      document.getElementById(`dropdownHsba${index}`).click()
    },
    getName (VisitList) {
      let name = ''
      VisitList.forEach(e => {
        if (e.Specialty.Site && !name.includes(e.Specialty.Site)) {
          if (name) {
            name += ', '
          }
          name += e.Specialty.Site
        }
      })
      return name
    },
    getSpecialty (Specialty) {
      let name = ''
      if (Specialty) {
        if (Specialty.ApiCode) {
          name += Specialty.ApiCode
        }
        if (name) {
          name += ' - '
        }
        name += this.__label(Specialty)
      }
      return name
    },
    getCheckBN (Status) {
      let check = false
      if (Status && Status.Code) {
        if (
          Status.Code !== 'IPDDC' &&
          Status.Code !== 'EDDC' &&
          Status.Code !== 'OPDDC' &&
          Status.Code !== 'EOCDC' &&
          Status.Code !== 'IPDDD' &&
          Status.Code !== 'EDDD' &&
          Status.Code !== 'OPDDD' &&
          Status.Code !== 'EOCDD' &&
          Status.Code !== 'IPDNE' &&
          Status.Code !== 'EDNE' &&
          Status.Code !== 'OPDNE' &&
          Status.Code !== 'EOCNE' &&
          Status.Code !== 'IPDTFIH' &&
          Status.Code !== 'EDTFIH' &&
          Status.Code !== 'OPDTFIH' &&
          Status.Code !== 'EOCTFIH' &&
          Status.Code !== 'IPDUDT' &&
          Status.Code !== 'EDUDT' &&
          Status.Code !== 'OPDUDT' &&
          Status.Code !== 'EOCUDT' &&
          Status.Code !== 'IPDUD' &&
          Status.Code !== 'EDCUD' &&
          Status.Code !== 'OPDUD' &&
          Status.Code !== 'EOCUD' &&
          Status.Code !== 'IPDCOTM' &&
          Status.Code !== 'EDCOTM' &&
          Status.Code !== 'OPDCOTM' &&
          Status.Code !== 'EOCCOTM' &&
          Status.Code !== 'EDIHT' &&
          Status.Code !== 'IPDIHT' &&
          Status.Code !== 'EOCIHT' &&
          Status.Code !== 'OPDIHT'
        ) {
          check = true
        }
      }
      return check
    },
    getId (item) {
      let id = ''
      if (item && item.VisitList && item.VisitList.length) {
        let index = item.VisitList.length - 1
        id = item.VisitList[index].Id
      }
      return id
    },
    getVisitType (item) {
      let VisitType = ''
      if (item && item.VisitList && item.VisitList.length) {
        let index = item.VisitList.length - 1
        VisitType = item.VisitList[index].Type
      }
      return VisitType
    }
  }
}
</script>
<style scoped lang="stylus">
#checkBN:before {
  background-color: #03e603!important;
}
.color-red {
  background: #dc3545!important;
  border: 1px solid #dc3545!important;
  color: #fff!important;
}
.color-origin {
  background: #dda80a!important;
  border: 1px solid #dda80a!important;
}
.color-blue {
  background: #337ab7!important;
  color: #fff!important;
  border: 1px solid #337ab7!important;
}
.MDTimeLine {
  font-size: 14px;
  color: #525f7f;
  .XTimeline {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    .box-content {
      background: #fff;
      margin: 10px 0 0 0;
      min-height: 127px;
      position: relative;
      border-bottom: 1px solid #cccccc6b;
      padding: 5px 20px;
      .box-mini-content {
        min-width: 183px!important;
      }
      .box-date-in {
        padding: 5px 5px 0 5px;
        min-width: 153px;
        .big-box-size {
          position relative;
          height: 100px;
          .box-site {
            cursor: default;
            color: rgb(51, 122, 183);
          }
          .dropdown-menu {
            min-width: 130px!important;
            color: #409eff;
            background: #ecf5ff;
            border-color: #b3d8ff;
            top: 22px!important;
            .view-hsba {
              text-align: center;
              border-radius: 10px;
              width: 100px;
              padding: 5px;
              cursor: pointer;
              margin: 0 auto;
            }
            .tamgiac {
              width: 0;
              height: 0;
              border-left: 10px solid transparent;
              border-right: 10px solid transparent;
              border-bottom: 10px solid #ecf5ff;
              position absolute;
              top: -7px;
              left: 15px;
            }
          }
          .dropdown-menu-new {
            min-width: 130px!important;
            color: #409eff;
            background: #ecf5ff;
            border-color: #b3d8ff;
            top: 22px!important;
            .view-hsba-new {
              text-align:center;
              border-radius: 10px;
              padding: 5px;
              cursor: pointer;
              margin: 0 auto;
            }
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            .tamgiac {
              border-bottom: 10px solid #409eff;
            }
          }
          .dropdown-menu:hover{
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            .tamgiac {
              border-bottom: 10px solid #409eff;
            }
          }
        }
      }
      .box-slide {
        display: flex;
      }
      .on-scroll {
        overflow-x: scroll;
        width: 840px;
      }
      ::-webkit-scrollbar {
        width: 5px;
        height: 11px;
        // min-height: 50px;
        -webkit-transition: width 0.3s;
        transition: width 0.3s;
      }
      ::-webkit-scrollbar-thumb {
        background: #9b9b9b;
        border-radius: 5px;
      }
      ::-webkit-scrollbar-track {
          background-color: #dbdbdb;
          // background-color: transparent;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #9b9b9b;
      }
      .box-visit-type {
        border: 1px solid #ffdb71;
        background: #ffdb71;
        border-radius: 10px;
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        padding: 5px;
        width: 100px;
        color: black;
      }
      .box-status {
        width: 157px;
        .box-dot {
          border: 7px solid #88e9f6;
          width: 25px;
          height: 25px;
          border-radius: 100%;
        }
      }
    }
    .box-content:before {
      content: "";
      width: 25px;
      height: 25px;
      position: absolute;
      background-color: white;
      border: 4px solid #909399;
      border-radius: 100%;
      left: 153px;
      top: 14%;
      transform: translateY(-50%);
      z-index: 2;
    }
    .box-content:after {
      content: "";
      width: 2px;
      height: 111%;
      background: #909399;
      position: absolute;
      top: 10%;
      left: 164px;
      z-index: 1;
    }
    .end-box-content:after {
      content: none;
    }
  }
}
</style>
