<template>
  <div class="main-content" id="di0-page" hidden>
    <div class="a4-page box" id="printMe">
      <table class="table" style="width: 100%">
        <tr>
          <td width="22%"  style="vertical-align: top;" align="top">
            <p>
              <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
            </p>
          </td>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
            <h3 class="text-center font-bold mg-bt-0 textUppercase" style="text-align: center">{{__t('Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý')}}</h3>
          </th>
          <td width="22%" align="middle" class="text-right">
            <div style="display: inline-block;">
              <CustomerBarCode :customer="DataSubmit.Customer" :height="50"/>
            </div>
          </td>
        </tr>
      </table>
      <table class="table standing-order-tbl td-re">
        <tr>
          <th colspan="4"><h4 class="textUppercase mg-bt-5">I. {{__t('Thông tin người bệnh')}}</h4></th>
        </tr>
        <tr>
          <td width="25%"><p class="no-wrap">{{__t('Khoa2')}}: {{__label(DataSubmit.Customer.Specialty)}}</p></td>
          <td colspan="3">{{__t('Cân nặng2')}}: {{(DataSubmit.Customer.Weight || '. . . . . . . . . . . . . . . . . . . . . . .')}} kg</td>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCODOI']">
          <td><p class="no-wrap"><b>{{__label(MASTERDATA['IEOHIREANCODOI'])}}:</b></p></td>
          <td colspan="3">
            {{MASTERDATA['IEOHIREANCODOI'].Items[0].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[0])}}: {{MASTERDATA['IEOHIREANCODOI'].Items[8].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}
          </td>
        </tr>
        <tr>
          <td>
            <p>{{MASTERDATA['IEOHIREANCODOI'].Items[1].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[1])}}</p>
          </td>
          <td class="no-wrap">
            {{MASTERDATA['IEOHIREANCODOI'].Items[2].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[2])}}
          </td>
          <td>
            {{MASTERDATA['IEOHIREANCODOI'].Items[3].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[3])}}
          </td>
          <td>
            {{MASTERDATA['IEOHIREANCODOI'].Items[4].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[4])}}
          </td>
        </tr>
        <tr>
          <td>
            <p>{{MASTERDATA['IEOHIREANCODOI'].Items[5].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[5])}}</p>
          </td>
          <td colspan="3">
            {{MASTERDATA['IEOHIREANCODOI'].Items[6].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCODOI'].Items[6])}}: {{MASTERDATA['IEOHIREANCODOI'].Items[7].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}
          </td>
        </tr>
        <tr>
          <td>
            <p class="no-wrap"><b>{{__label(MASTERDATA['IEOHIREANCOLLE'])}}:</b>{{DataSubmit.Customer.IsAllergy ? '&#9744;' : '&#9745;'}} {{__t('Không')}}</p>
          </td>
          <td colspan="3">
            <p class="text-initial">{{DataSubmit.Customer.IsAllergy ? '&#9745;' : '&#9744;'}} {{__t('Có')}}: {{allergiesInfo || '. . . . . . . . . . . . . . . . . . . .'}}</p>
          </td>
        </tr>
        <tr>
          <th colspan="4"><h4 class="textUppercase mg-bt-5">II. {{__t('Lâm sàng')}}</h4></th>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCOCS']">
          <td colspan="4">
            <p class="text-initial">{{__label(MASTERDATA['IEOHIREANCOCS'].Items[0])}}: {{MASTERDATA['IEOHIREANCOCS'].Items[0].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
            <p class="text-initial">{{__label(MASTERDATA['IEOHIREANCOCA'].Items[0])}}: {{MASTERDATA['IEOHIREANCOCA'].Items[0].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
          </td>
        </tr>
        <tr>
          <th colspan="4"><h4 class="textUppercase mg-bt-5">III. {{__label(MASTERDATA['IEOHIREANCOMIR'])}}</h4></th>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCOMIR']">
          <td class="no-padding" colspan="4">
            <table class="table table-bordered no-margin" v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults">
              <template v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults.filter(e => !e.removed).length">
                <tbody>
                  <template v-for="(result, index) in DataSubmit.HighlyRestrictedAntimicrobialConsultMicrobiologicalResults">
                  <tr v-if="!result.removed" :key="index + 'tr-oddd'">
                    <td width="25%">
                      {{__t('Ngày')}}: {{result.Date || 'N/A'}}
                    </td>
                    <td>
                      {{__t('Vi khuẩn')}}: {{result.Culture || 'N/A'}}
                    </td>
                  </tr>
                  <tr v-if="!result.removed" :key="index + 'tr-odddx'">
                    <td colspan="2">
                      <p class="text-initial">{{__t('Mẫu bệnh phẩm')}}: <template v-for="(item, index) in MASTERDATA['IEOHIREANCOMIR'].Items" v-if="item.DataType === 'Checkbox'">{{result.Specimen === item.Data ? '&#9745;' : '&#9744;'}} {{__label(item)}} <i :key="index" class="tab404"></i></template>:{{result.Specimen === '6' ? (result.Others || '. . . . . . . . .') : '. . . . . . . . .'}}</p>
                    </td>
                  </tr>
                  </template>
                </tbody>
              </template>
              <template v-else>
                <tbody>
                  <tr>
                    <td class="text-center">
                      <p>{{__t('Không có kết quả')}}</p>
                    </td>
                  </tr>
                </tbody>
              </template>
            </table>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCOANO']">
          <th colspan="4">IV. {{__label(MASTERDATA['IEOHIREANCOANO'])}}</th>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCOANO']">
          <td class="no-padding" colspan="4">
            <table class="table table-bordered no-margin" v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder">
              <template v-if="DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder.filter(e => !e.removed).length">
                <tbody>
                  <tr v-for="(result, index) in DataSubmit.HighlyRestrictedAntimicrobialConsultAntimicrobialOrder" v-if="!result.removed" :key="index + 'x993'">
                    <td style="position: relative">
                      <div class="text-initial mg-rg-5">{{index + 1}}. {{__t('Kháng sinh')}}: {{result.Antimicrobial || 'N/A'}}</div>
                    </td>
                    <td style="vertical-align: top;" align="top">
                      <div class="text-initial no-wrap mg-rg-5">{{__t('Liều dùng/ lần')}}: {{result.Dose || 'N/A'}}</div>
                    </td>
                    <td style="vertical-align: top;" align="top">
                      <div class="text-initial no-wrap mg-rg-5">{{__t('Số lần/ ngày')}}: {{result.Frequency || 'N/A'}}</div>
                    </td>
                    <td style="vertical-align: top;" align="top">
                      <div class="text-initial no-wrap mg-rg-5">{{__t('Số ngày')}}: {{result.Duration || 'N/A'}}</div>
                    </td>
                  </tr>
                </tbody>
              </template>
              <template v-else>
                <tbody>
                  <tr>
                    <td class="text-center">
                      <p>{{__t('Không có dữ liệu')}}</p>
                    </td>
                  </tr>
                </tbody>
              </template>
            </table>
          </td>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCOHRA']">
          <td colspan="4"><b>{{__label(MASTERDATA['IEOHIREANCOHRA'])}}:</b></td>
        </tr>
        <tr>
          <td colspan="2">
            {{MASTERDATA['IEOHIREANCOHRA'].Items[0].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCOHRA'].Items[0])}}
          </td>
          <td colspan="2">
            <p class="no-wrap">{{MASTERDATA['IEOHIREANCOHRA'].Items[1].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCOHRA'].Items[1])}}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            {{MASTERDATA['IEOHIREANCOHRA'].Items[2].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCOHRA'].Items[2])}}
          </td>
          <td colspan="2">
            {{MASTERDATA['IEOHIREANCOHRA'].Items[3].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCOHRA'].Items[3])}}
          </td>
        </tr>
        <tr v-if="MASTERDATA['IEOHIREANCOHRA']">
          <td colspan="4">
            <p>{{MASTERDATA['IEOHIREANCOHRA'].Items[4].Value ? '&#9745;' : '&#9744;'}} {{__label(MASTERDATA['IEOHIREANCOHRA'].Items[4])}}: {{MASTERDATA['IEOHIREANCOHRA'].Items[5].Value || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top;" align="top">
            <p class="text-center no-wrap"><i>{{__t('. . . ., ngày . . . . . tháng . . . . 20 . . .')}}</i></p>
            <p class="text-center"><b>{{__t('Bác sỹ điều trị')}}</b></p>
          </td>
          <td colspan="3">
            <p class="text-center"><strong class="textUppercase">{{__t('Ý kiến của bản quản lý sử dụng kháng sinh')}}</strong></p>
            <p>&#9744; {{__t('Đồng ý sử dụng')}}</p>
            <p>&#9744; {{__t('Không đồng ý')}} <i>{{__t('(lý do)')}}</i>:. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </p>
            <p class="text-right"><i>{{__t('. . . ., ngày . . . . . tháng . . . . 20 . . .')}}</i></p>
          </td>
        </tr>
        <tr>
          <td style="vertical-align: top;" align="top">
            <p class="text-center"><b>{{__t('Trưởng khoa lâm sàng')}}</b></p>
            <br/>
            <br/>
          </td>
          <td style="vertical-align: top;" align="top" colspan="3">
            <p class="text-center"><b>{{__t('Nhóm chuyên trách QLSDKS')}}</b></p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import constant from '@/constants'
export default {
  name: 'HighlyRestrictedAntimicrobialConsultPrint',
  props: ['DataSubmit', 'MASTERDATA'],
  mixins: [],
  data () {
    return {
    }
  },
  computed: {
    allergiesInfo () {
      if (this.DataSubmit.Customer) {
        var KindOfAllergy = constant.ALLERGY.filter(e => {
          return ((this.DataSubmit.Customer.KindOfAllergy || '').split(',')).includes(e.value)
        }).map(r => r.label)
        return ([KindOfAllergy.join(','), this.DataSubmit.Customer.Allergy].filter(e => e)).join(', ')
      }
      return ''
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
