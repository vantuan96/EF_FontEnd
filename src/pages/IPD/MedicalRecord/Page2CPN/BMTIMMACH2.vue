<template>
  <div v-if="MASTERDATA">
    <template v-for="(e, index) in array1" v-if="box1">
      <div :key="index" class="flex" :class="getClass(e)">
        <MdRadiosInput4 class="mrr10" style="min-width: 448px;" v-if="MASTERDATA['IPDMRPT3000']" :indexs="[e]" :readonly="readonly" v-model="MASTERDATA['IPDMRPT3000']"/>
        <MDText v-if="MASTERDATA['IPDMRPT3000'].Items[e].Value" :id="MASTERDATA['IPDMRPT3000'].Items[e + 9].Code" :placeholder="__t('Nhập')" :readonly="readonly" :rows="'1'" v-model="MASTERDATA['IPDMRPT3000'].Items[e + 9].Value"/>
      </div>
    </template>
    <div v-if="box2">
      <div class="fw600 mrb10">3. {{__label(MASTERDATA['IPDMRPT3010'])}}:</div>
      <div class="bg-gray-2">
        <div class="box-prom mrb10">
          <div class="fw600 mrb20 title">{{__label(MASTERDATA['IPDMRPT3010'].Items[2])}}</div>
          <div class="prom-content">
            <template v-if="PromHistoryForHeartFailure && PromHistoryForHeartFailure.length">
              <template v-for="(item, index) in PromHistoryForHeartFailure">
                <MDCollapse :key="index" :id="`collapse1-${index}`" :rowClick="true">
                  <div slot="label">
                    <div class="fw600">{{getLabel(item)}}<span v-if="item.Username"> - </span><ad-Info v-if="item.Username" :ad="item.Username" /></div>
                  </div>
                  <div slot="content" class="box-bmtimmach-content">
                    <div class="box-header-bmtim fw600">{{__t('Kết luận')}}</div>
                    <div class="flex space-between mini-box-content">
                      <div v-if="item.PromSumaries" style="width: 750px;">
                        <p>{{getKL(item.PromSumaries)}}</p>
                      </div>
                      <div class="cursor box-detail" @click="showPopupDetail('PROM suy tim', item)">{{__t(' Xem chi tiết')}}</div>
                    </div>
                  </div>
                </MDCollapse>
              </template>
            </template>
            <div class="null text-center" v-else>{{__t('Chưa có thông tin')}}</div>
          </div>
        </div>
        <div class="box-prom mrb10">
          <div class="fw600 mrb20 title">{{__label(MASTERDATA['IPDMRPT3010'].Items[3])}}</div>
          <div class="prom-content">
            <template v-if="PromHistoryForCoronaryDiseases && PromHistoryForCoronaryDiseases.length">
              <template v-for="(item, index) in PromHistoryForCoronaryDiseases">
                <MDCollapse :key="index" :id="`collapse2-${index}`" :rowClick="true">
                  <div slot="label">
                    <div class="fw600">{{getLabel(item)}}<span v-if="item.Username"> - </span><ad-Info v-if="item.Username" :ad="item.Username" /></div>
                  </div>
                  <div slot="content" class="box-bmtimmach-content">
                    <div class="box-header-bmtim fw600">{{__t('Kết luận')}}</div>
                    <div class="flex space-between mini-box-content">
                      <div v-if="item.PromSumaries" style="width: 750px;">
                        <p>{{getKL(item.PromSumaries)}}</p>
                      </div>
                      <div class="cursor box-detail" @click="showPopupDetail('PROM mạch vành', item)">{{__t(' Xem chi tiết')}}</div>
                    </div>
                  </div>
                </MDCollapse>
              </template>
            </template>
            <div class="null text-center" v-else>{{__t('Chưa có thông tin')}}</div>
          </div>
        </div>
        <div v-if="MASTERDATA['IPDMRPT3010']" style="padding: 0px 10px 0 17px;">
          <MdRadiosInput4 class="mrb10" :readonly="true" v-model="prom"/>
          <div v-if="prom && prom.Items[0].Value">
            <MdRadiosInput4 class="mrb10" :indexs="[0]" :readonly="true" v-model="prom2"/>
            <div style="padding: 0 8px 0 5px;">
              <template v-if="PromHistoryForHeartFailureNew && PromHistoryForHeartFailureNew.length">
                <template v-for="(item, index) in PromHistoryForHeartFailureNew">
                  <MDCollapse :key="index" :id="`collapse3-${index}`" :rowClick="true">
                    <div slot="label">
                      <div class="fw600">{{getLabel(item)}}<span v-if="item.Username"> - </span><ad-Info v-if="item.Username" :ad="item.Username" /></div>
                    </div>
                    <div slot="content" class="box-bmtimmach-content">
                      <div class="box-header-bmtim fw600">{{__t('Kết luận')}}</div>
                      <div class="flex space-between mini-box-content">
                        <div v-if="item.PromSumaries" style="width: 750px;">
                          <p>{{getKL(item.PromSumaries)}}</p>
                        </div>
                        <div class="cursor box-detail" @click="showPopupDetail('PROM suy tim', item)">{{__t(' Xem chi tiết')}}</div>
                      </div>
                    </div>
                  </MDCollapse>
                </template>
              </template>
            </div>
            <MdRadiosInput4 class="mrb10" :indexs="[1]" :readonly="true" v-model="prom2"/>
            <div style="padding: 0 8px 0 5px;">
              <template v-if="PromHistoryForCoronaryDiseasesNew && PromHistoryForCoronaryDiseasesNew.length">
                <template v-for="(item, index) in PromHistoryForCoronaryDiseasesNew">
                  <MDCollapse :key="index" :id="`collapse4-${index}`" :rowClick="true">
                    <div slot="label">
                      <div class="fw600">{{getLabel(item)}}<span v-if="item.Username"> - </span><ad-Info v-if="item.Username" :ad="item.Username" /></div>
                    </div>
                    <div slot="content" class="box-bmtimmach-content">
                      <div class="box-header-bmtim fw600">{{__t('Kết luận')}}</div>
                      <div class="flex space-between mini-box-content">
                        <div v-if="item.PromSumaries" style="width: 750px;">
                          <p>{{getKL(item.PromSumaries)}}</p>
                        </div>
                        <div class="cursor box-detail" @click="showPopupDetail('PROM mạch vành', item)">{{__t(' Xem chi tiết')}}</div>
                      </div>
                    </div>
                  </MDCollapse>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pop-detail-prom :title="tile" :VisitId="VisitId" :VisitType="VisitType"/>
  </div>
</template>
<script>
import popDetailProm from '@/pages/IPD/MedicalRecord/popup/PopDetailProm.vue'
import MDCollapse from '@/components/global/MDCollapse.vue'
export default {
  name: 'BMTIMMACH2',
  props: ['MASTERDATA', 'DataSubmit', 'readonly', 'box1', 'box2'],
  components: {
    popDetailProm,
    MDCollapse
  },
  data () {
    return {
      array1: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      prom: {
        Code: 'Prom',
        EnName: 'Prom',
        Group: 'PromGroup',
        Items: [
          {
            Code: 'Prom1',
            EnName: 'Yes',
            Group: 'Prom',
            ViName: 'Có áp dụng',
            Value: false,
            DataType: 'Radio'
          },
          {
            Code: 'Prom2',
            EnName: 'No',
            Group: 'Prom',
            ViName: 'Không áp dụng',
            Value: false,
            DataType: 'Radio'
          }
        ],
        ViName: 'Prom'
      },
      prom2: {
        Code: 'Prom3',
        EnName: 'Prom',
        Group: 'PromGroup',
        Items: [
          {
            Code: 'Prom4',
            EnName: 'PROM for heart failure',
            Group: 'Prom3',
            ViName: 'PROM suy tim',
            Value: false,
            DataType: 'Checkbox'
          },
          {
            Code: 'Prom5',
            EnName: 'PROM for coronary disease',
            Group: 'Prom3',
            ViName: 'PROM mạch vành',
            Value: false,
            DataType: 'Checkbox'
          }
        ],
        ViName: 'Prom'
      },
      PromHistoryForHeartFailure: [],
      PromHistoryForCoronaryDiseases: [],
      PromHistoryForHeartFailureNew: [],
      PromHistoryForCoronaryDiseasesNew: [],
      tile: '',
      VisitId: '',
      VisitType: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handleCheckMapMD () {
      if (this.MASTERDATA['IPDMRPT3000']) {
        if (!this.MASTERDATA['IPDMRPT3000'].Items[0].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[9].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[1].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[10].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[2].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[11].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[3].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[12].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[4].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[13].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[5].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[14].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[6].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[15].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[7].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[16].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPT3000'].Items[8].Value) {
          this.MASTERDATA['IPDMRPT3000'].Items[17].Value = ''
        }
      }
      this.validateForm()
    },
    validateForm () {
      let errors = []
      if (this.MASTERDATA['IPDMRPT3000']) {
        if (this.MASTERDATA['IPDMRPT3000'].Items[0].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[9].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[9])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[1].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[10].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[10])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[2].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[11].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[11])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[3].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[12].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[12])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[4].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[13].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[13])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[5].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[14].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[14])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[6].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[15].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[15])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[7].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[16].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[16])
        }
        if (this.MASTERDATA['IPDMRPT3000'].Items[8].Value &&
        !this.MASTERDATA['IPDMRPT3000'].Items[17].Value) {
          errors.push(this.MASTERDATA['IPDMRPT3000'].Items[17])
        }
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    getData () {
      let Prom = this.DataSubmit.Prom
      this.PromHistoryForHeartFailure = Prom.PromHistoryForHeartFailure
      this.PromHistoryForHeartFailureNew = Prom.PromHistoryForHeartFailureNew
      this.PromHistoryForCoronaryDiseases = Prom.PromHistoryForCoronaryDiseases
      this.PromHistoryForCoronaryDiseasesNew = Prom.PromHistoryForCoronaryDiseasesNew
      if (this.prom2 && this.prom) {
        // PROM suy tim
        if (Prom.PromHistoryForHeartFailureNew && Prom.PromHistoryForHeartFailureNew.length) {
          this.prom2.Items[0].Value = Prom.PromHistoryForHeartFailureNew[0].havePromHeart
        }
        // PROM mạch vành
        if (Prom.PromHistoryForCoronaryDiseasesNew && Prom.PromHistoryForCoronaryDiseasesNew.length) {
          this.prom2.Items[1].Value = Prom.PromHistoryForCoronaryDiseasesNew[0].HavePromForCoronary
        }
        if (!this.prom2.Items[0].Value && !this.prom2.Items[1].Value) {
          this.prom.Items[0].Value = false
          this.prom.Items[1].Value = true
        } else {
          this.prom.Items[0].Value = true
          this.prom.Items[1].Value = false
        }
      }
    },
    getLabel (item) {
      // 11/08/2022 - OPD Tim mạch - 68989
      let label = ''
      if (item.CreatedAt) {
        label += this.$options.filters.formatDate2(item.CreatedAt)
      }
      if (item.VisitTypeGroup) {
        if (label) {
          label += ' - '
        }
        label += item.VisitTypeGroup + ' ' + this.__label(item)
      }
      if (item.VisitCode) {
        if (label) {
          label += ' - '
        }
        label += item.VisitCode
      }
      return label
    },
    getKL (data) {
      let KL = ''
      data = data.filter(e => e.ViTitle !== 'Đề xuất hành động BS cần can thiệp')
      data.forEach((e, index) => {
        if (e) {
          if (e.ViTitle !== 'Đề xuất hành động BS cần can thiệp') {
            if (KL) {
              KL += '\n'
            }
            KL += `${index + 1}. ${this.__label({ViName: e.ViTitle, EnName: e.EnTitle})}: ${e.Point}`
            if (e.Summary) {
              KL += `\n => ${this.__label({ViName: 'Đề xuất hành động can thiệp', EnName: 'Suggestion of physicians/nurses'})}: ` + this.__t(e.Summary)
            }
          }
        }
      })
      return KL
    },
    showPopupDetail (title, item) {
      this.VisitId = item.VisitId
      this.VisitType = item.VisitTypeGroup
      this.tile = title
      setTimeout(() => {
        this.$modal.show('popDetailProm')
      }, 200)
    },
    getClass (e) {
      if (this.readonly) {
        if (this.MASTERDATA['IPDMRPT3000'] && this.MASTERDATA['IPDMRPT3000'].Items[e].Value) {
          return 'mrb10'
        }
      } else {
        return 'mrb5'
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box-prom {
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 3px;
    min-height: 90px;
    padding: 10px 20px;
    position: relative;
    &:before {
      content: "";
      border-top: 15px solid #ffc107;
      border-right: 15px solid transparent;
      width: 0;
      height: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    .prom-content {
      .box-bmtimmach-content {
        border: 1px solid #dddddd;
        border-radius: 0px 0px 4px 4px;
        .box-header-bmtim {
          background-color: #dddddd;
          padding: 5px 10px;
        }
        .mini-box-content {
          padding: 10px;
          .box-detail {
            background-color: #ddd;
            height: 28px;
            padding: 5px;
            border-radius: 4px;
          }
        }
      }
    }
  }
.box-bmtimmach-content {
    border: 1px solid #dddddd;
    border-radius: 0px 0px 4px 4px;
    .box-header-bmtim {
      background-color: #dddddd;
      padding: 5px 10px;
    }
    .mini-box-content {
      padding: 10px;
      .box-detail {
        background-color: #ddd;
        height: 28px;
        padding: 5px;
        border-radius: 4px;
      }
    }
  }
</style>
