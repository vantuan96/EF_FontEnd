<template>
  <div class="mt-10" v-if="loaded">
    <!-- <div class="form-control" v-if="DataSubmit.IsNew && DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div> -->
    <initial-assessment-form
      v-if="DataSubmit.InitialAssessmentForm"
      v-model="DataSubmit.InitialAssessmentForm"
      :showBtn="!allowEditDoctor"
      :FormType="'OnGoing'"
      ref="InitialAssessmentForm"
      :readonly="!((allowEditDoctor) && !IsFormLocked(DataSubmit))"
    />
    <!-- <div v-if="allowEdit && !IsFormLocked(DataSubmit)"> -->
    <div>
      <div class="tbl-title">I. {{__t('Thông tin chung')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Ngôn ngữ -->
        <tr v-if="MASTERDATA['OPDFCP1']">
          <th width="20%">{{__label(MASTERDATA['OPDFCP1'])}}</th>
          <td style="display: flex;">
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP1'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP1radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP1radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP1'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
            <textarea-autosize style=" line-height: 31px;" class="form-control  full-width" v-model="MASTERDATA['OPDFCP1'].Items[3].Value" :placeholder="__t('Nhập')" v-if="MASTERDATA['OPDFCP1'].Items[2].Value === true"/>
          </td>
        </tr>
        <!-- Tôn giáo -->
        <tr v-if="MASTERDATA['OPDFCP6']">
          <th width="20%">{{__label(MASTERDATA['OPDFCP6'])}}</th>
          <td style="display: flex">
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP6'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP6radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP6radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP6'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
            <textarea-autosize v-if="MASTERDATA['OPDFCP6'].Items[5].Value" style="line-height: 31px;" class="form-control full-width" v-model="MASTERDATA['OPDFCP6'].Items[6].Value" :placeholder="__t('Nhập')"/>
          </td>
        </tr>
        <!-- Nghề nghiệp -->
        <tr v-if="MASTERDATA['OPDFCP14']">
          <th width="20%">{{__label(MASTERDATA['OPDFCP14'])}}</th>
          <td>
            <textarea-autosize class="form-control" v-model="MASTERDATA['OPDFCP14'].Items[0].Value" :placeholder="__t('Nhập')"/>
          </td>
        </tr>
        <!-- Có phải lao động chính -->
        <tr v-if="MASTERDATA['OPDFCP16']">
          <th width="20%">{{__label(MASTERDATA['OPDFCP16'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP16'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP16radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP16radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP16'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Dị ứng -->
        <tr v-if="MASTERDATA['OPDFCP19']" class="highlightedsss">
          <th width="20%">{{__label(MASTERDATA['OPDFCP19'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP19'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'OPDIAFSTOPALLradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFSTOPALLradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP19'].Items, item)">{{__label(item)}}</label>
                </span>
                <span :key="index" v-else-if="item.DataType === 'Select'">
                  <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['OPDFCP19'].Items[0].Value"/>
                </span>
                <span :key="index" v-else style="flex-grow: 1;">
                  <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDFCP19'].Items[0].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Có thai -->
        <tr v-if="MASTERDATA['OPDFCP25']">
          <th width="20%">{{__label(MASTERDATA['OPDFCP25'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP25'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP25radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP25radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP25'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Cho con bú -->
        <tr v-if="MASTERDATA['OPDFCP29']">
          <th width="20%">{{__label(MASTERDATA['OPDFCP29'])}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP29'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP28radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP28radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP29'].Items, item)">{{__label(item)}}</label>
                </span>
                <span :key="index" v-else style="flex-grow: 1;">
                  <input type="text" class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDFCP29'].Items[3].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="tbl-title">II. {{__t('Đánh giá ban đầu')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <tr v-if="MASTERDATA['ODSTNOAP']">
          <th width="20%">{{__t('Câu hỏi sàng lọc')}}</th>
          <td>
            <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'ODST'" :version="DataSubmit.Version"/>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="tbl-title">1. {{__t('Sàng lọc ngã')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <tr>
          <th width="20%">{{__t('Sàng lọc ngã')}}</th>
          <td>
            <button class="btn-sync-data btn">
              <router-link :to="{name: 'OPDInitialAssessmentFallRiskScreening', params: { Id: this.$route.params.Id }}">
                {{__t('Sàng lọc nguy cơ ngã')}}
              </router-link>
            </button>
          </td>
        </tr>
      </table>
    </div>
    <!-- Dấu hiệu sinh tồn -->
    <div>
      <div class="tbl-title">2. {{__t('Dấu hiệu sinh tồn')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Dấu hiệu sinh tồn -->
        <tr>
          <th width="20%">{{__t('Dấu hiệu sinh tồn')}}</th>
          <td>
            <div>
              <template v-if="MASTERDATA['OPDFCP33']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP33'" v-for="(item,index) in MASTERDATA['OPDFCP33'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDFCP37']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP37'" v-for="(item,index) in MASTERDATA['OPDFCP37'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDFCP35']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP35'" v-for="(item,index) in MASTERDATA['OPDFCP35'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDFCP39']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP39'" v-for="(item,index) in MASTERDATA['OPDFCP39'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDFCP41']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP41'" v-for="(item,index) in MASTERDATA['OPDFCP41'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <input class="form-control" :placeholder="item.Note" type="text" v-model="item.Value">
                </div>
              </template>
              <template v-if="MASTERDATA['OPDFCP43']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP43'" v-for="(item,index) in MASTERDATA['OPDFCP43'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <!-- <number-input class="w-input-150" inline v-model="item.Value" :placeholder="__t('Nhập')"/> -->
                  <VNumberInput :decimal="true" v-model="item.Value" :placeholder="__t('Nhập')"/>
                </div>
              </template>
              <template v-if="MASTERDATA['OPDFCP45']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP45'" v-for="(item,index) in MASTERDATA['OPDFCP45'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <VNumberInput :decimal="true" v-model="item.Value" :placeholder="__t('Nhập')"/>
                  <!-- <number-input class="w-input-150" inline v-model="item.Value" :placeholder="__t('Nhập')"/> -->
                </div>
              </template>
              <div class="vcol150">
                <label>BMI</label>
                <!-- <input type="number" class="form-control" readonly :value="bmiCalculation"/> -->
              </div>
              <template v-if="MASTERDATA['OPDFCP49']">
                <div class="vcol150" :data="item" :key="index + 'OPDFCP49'" v-for="(item,index) in MASTERDATA['OPDFCP49'].Items">
                  <label>{{__label(item)}}<span class="unit-label" v-if="item.Note"> ({{item.Note}})</span></label>
                  <VNumberInput :decimal="true" v-model="item.Value" :placeholder="__t('Nhập')"/>
                  <!-- <number-input class="w-input-150" inline v-model="item.Value" :placeholder="__t('Nhập')"/> -->
                </div>
              </template>
              <p style="clear: both;"/>
            </div>
          </td>
        </tr>
        <!-- Thở oxy -->
        <tr v-if="MASTERDATA['OPDFCP51']">
          <th width="20%">{{__t('Thở oxy')}}</th>
          <td class="row">
            <span class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP51'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP51radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP51radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP51'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
              <template style="margin-left: 10px;" v-if="MASTERDATA['OPDFCP51'].Items[0].Value === true" :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP54'].Items">
                <span :class="index === 0 ? 'ml-20' : null" :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP54radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP54radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP54'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
              <textarea-autosize style="line-height: 36px" class="w-input-150" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP54'].Items[1].Value" v-if="MASTERDATA['OPDFCP54'].Items[0].Value === true"/>
              <textarea-autosize style="line-height: 36px" class="w-input-150" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP54'].Items[3].Value" v-if="MASTERDATA['OPDFCP54'].Items[2].Value === true"/>
              <span class="mt-10 ml-5" v-if="MASTERDATA['OPDFCP54'].Items[0].Value === true || MASTERDATA['OPDFCP54'].Items[2].Value === true"><b>lit/phút</b></span>
            </span>
          </td>
        </tr>
        <!-- Điểm PS -->
        <tr v-if="MASTERDATA['OPDFCP59']">
          <th width="20%">
            {{__t('Điểm PS')}}
            <span>
              <a id="notePopoverCheck"
                class="myPopover"
                data-toggle="popover"
                title="Chú thích"
                data-placement="bottom"
                data-trigger="click"
                data-html="true"
                data-content="This is <b style='color:red;'>Simple</b> HTML Content.">
                <i class="fa fa-angle-double-down" aria-hidden="true">{{__t('Chú thích')}}</i>
              </a>
            </span>
          </th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP59'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP59radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP59radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP59'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- Dinh dưỡng -->
    <div>
      <div class="tbl-title">3. {{__t('Dinh dưỡng')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Có tăng hay giảm cân trong 3 tháng gần đây -->
        <tr v-if="MASTERDATA['OPDFCP66']">
          <th width="20%">{{__t('Có tăng hay giảm cân trong 3 tháng gần đây?')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP66'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP66radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP66radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP66'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
              <span style="display: flex" v-if="MASTERDATA['OPDFCP66'].Items[1].Value  === true || MASTERDATA['OPDFCP66'].Items[2].Value  === true">
                <span style="display: flex; align-items: center" class="mr-5 ml-5">Bao nhiêu (kg):</span>
                <textarea-autosize style="line-height: 37px;" rows="1" class="w-input-150" v-model="MASTERDATA['OPDFCP70'].Items[0].Value"/>
                <span style="display: flex; align-items: center" class="mr-5 ml-5">Lý do:</span>
                <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP72'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input type="checkbox" :id="'OPDFCP72radio-' + index" v-model="item.Value">
                    <label :for="'OPDFCP72radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP72'].Items, item)">{{__label(item)}}</label>
                  </span>
                </template>
              </span>
            </div>
          </td>
        </tr>
        <!-- Chế độ ăn -->
        <tr v-if="MASTERDATA['OPDFCP76']">
          <th width="20%">{{__t('Chế độ ăn')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP76'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP76radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP76radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP76'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Cảm giác khi ăn -->
        <tr v-if="MASTERDATA['OPDFCP80']">
          <th width="20%">{{__t('Cảm giác khi ăn')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP80'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP80radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP80radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP80'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Đường ăn, uống -->
        <tr v-if="MASTERDATA['OPDFCP84']">
          <th width="20%">{{__t('Đường ăn, uống')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP84'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP82radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP82radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP84'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
              <span v-if="MASTERDATA['OPDFCP84'].Items[3].Value === true">
                <textarea-autosize rows="1" class="form-control" v-model="MASTERDATA['OPDFCP84'].Items[4].Value"/>
              </span>
              <span v-if="MASTERDATA['OPDFCP84'].Items[2].Value === true" style="display: flex">
                <span class="mr-5 ml-5">Loại ống thông:</span>
                <textarea-autosize rows="1" class="form-control" v-model="MASTERDATA['OPDFCP90'].Items[0].Value"/>
              </span>
            </div>
          </td>
        </tr>
        <!-- Thói quen đại tiện -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Thói quen đại tiện')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP92'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP92radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP92radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP92'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- Tình trạng da -->
    <div>
      <div class="tbl-title">4. {{__t('Tình trạng da')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Vết thương -->
        <tr v-if="MASTERDATA['OPDFCP97']">
          <th width="20%">{{__t('Vết thương')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP97'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP97radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP97radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP97'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
            <div v-if="MASTERDATA['OPDFCP97'].Items[1].Value === true">
              <!-- Vị trí -->
              <div style="display: flex; margin-top: 10px;">
                <span style="width:5%; align-items: center; display: flex;">{{__t('Vị trí')}}:</span>
                <textarea-autosize  class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP100'].Items[0].Value"/>
              </div>
              <!-- Kích thước -->
              <div style="display: flex; margin-top: 10px;">
                <span style="width:13%; align-items: center; display: flex;">{{__t('Kích thước')}}:</span>
                <span style="width:3%; align-items: center; display: flex;">{{__t('D')}}:</span>
                <MDNumberInput style="width:78px;" :code="MASTERDATA['OPDFCP102'].Items[0].Code" :decimal="true" v-model="MASTERDATA['OPDFCP102'].Items[0].Value" :placeholder="__t('Nhập')"/>
                <span style="width:3%; align-items: center; display: flex; margin-left: 36px;">{{__t('R')}}:</span>
                <MDNumberInput style="width:78px;" :code="MASTERDATA['OPDFCP102'].Items[1].Code" :decimal="true" v-model="MASTERDATA['OPDFCP102'].Items[1].Value" :placeholder="__t('Nhập')"/>
                <span style="width:4%; align-items: center; display: flex; margin-left: 42px;">{{__t('Sâu')}}:</span>
                <MDNumberInput style="width:78px;" :code="MASTERDATA['OPDFCP102'].Items[2].Code" :decimal="true" v-model="MASTERDATA['OPDFCP102'].Items[2].Value" :placeholder="__t('Nhập')"/>
              </div>
              <!-- Nền vết thương -->
              <div style="display: flex; margin-top: 10px; width:100%">
                <span style="width:13%; align-items: center; display: flex;">{{__t('Nền vết thương')}}:</span>
                <div style="width:50%;" class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP106'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDFCP106radio-' + index" v-model="item.Value">
                      <label :for="'OPDFCP106radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP106'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
                <textarea-autosize style="width: 37%; height:34px; margin-top:5px;" v-if="MASTERDATA['OPDFCP106'].Items[4].Value === true" rows="1" class="form-control" v-model="MASTERDATA['OPDFCP106'].Items[5].Value" :placeholder="__t('Nhập')"/>
              </div>
              <!-- Dịch tiết -->
              <div style="display: flex; margin-top: 10px; width:100%">
                <span style="width:13%; align-items: center; display: flex;">{{__t('Dịch tiết')}}:</span>
                <div style="width:50%;" class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP113'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDFCP113radio-' + index" v-model="item.Value">
                      <label :for="'OPDFCP113radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP113'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </div>
              <!-- Màu dịch tiết -->
              <div style="display: flex; margin-top: 10px; width:100%">
                <span style="width:13%; align-items: center; display: flex;">{{__t('Màu dịch tiết')}}:</span>
                <div style="width:50%;" class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP118'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDFCP118radio-' + index" v-model="item.Value">
                      <label :for="'OPDFCP118radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP118'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </div>
              <!-- Bờ vết thương -->
              <div style="display: flex; margin-top: 10px; width:100%">
                <span style="width:13%; align-items: center; display: flex;">{{__t('Bờ vết thương')}}:</span>
                <div style="width:23%;" class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP124'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDFCP124radio-' + index" v-model="item.Value">
                      <label :for="'OPDFCP124radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP124'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
                <textarea-autosize style="width: 64%; height:34px; margin-top:5px;" v-if="MASTERDATA['OPDFCP124'].Items[2].Value === true" rows="1" class="form-control" v-model="MASTERDATA['OPDFCP124'].Items[3].Value" :placeholder="__t('Nhập')"/>
              </div>
            </div>
          </td>
        </tr>
        <!-- Dẫn lưu -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Dẫn lưu')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP129'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP129radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP129radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP129'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
            <div v-if="MASTERDATA['OPDFCP129'].Items[1].Value === true">
              <!-- Vị trí -->
              <div style="display: flex; margin-top: 10px;">
                <span style="width:5%; align-items: center; display: flex;">{{__t('Vị trí')}}:</span>
                <textarea-autosize  class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP132'].Items[0].Value"/>
              </div>
              <!-- Loại -->
              <div style="display: flex; margin-top: 10px;">
                <span style="width:5%; align-items: center; display: flex;">{{__t('Loại')}}:</span>
                <textarea-autosize  class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP134'].Items[0].Value"/>
              </div>
              <!-- Cố định -->
              <div style="display: flex; margin-top: 10px;">
                <span style="width:8%; align-items: center; display: flex;">{{__t('Cố định')}}:</span>
                <textarea-autosize  class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP136'].Items[0].Value"/>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- HEENT -->
    <div>
      <div class="tbl-title">5. {{__t('HEENT (đầu, tai, mắt, mũi, họng)')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <tr v-if="MASTERDATA['OPDFCP138']">
          <th width="20%">{{__t('HEENT')}}</th>
          <td style="width: 100%;">
            <div class="group-radio"  style="width: 100%">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP138'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP138radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP138radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP138'].Items, item)">{{__label(item)}}</label>
                </span>
                <span v-else-if="item.DataType === 'Text' && MASTERDATA['OPDFCP138'].Items[1].Value === true" :key="index" style="flex-grow: 1;">
                  <textarea-autosize style="margin-top: 4px;" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP138'].Items[2].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="tbl-title">6. {{__t('Tình trạng tâm lý hiện tại')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Có tăng hay giảm cân trong 3 tháng gần đây -->
        <tr v-if="MASTERDATA['OPDFCP66']">
          <th width="20%">{{__t('Tâm lý hiện tại')}}</th>
          <td style="width: 100%;">
            <div class="group-radio"  style="width: 100%">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP142'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP142radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP142radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP142'].Items, item)">{{__label(item)}}</label>
                </span>
                <span v-else-if="item.DataType === 'Text' && MASTERDATA['OPDFCP142'].Items[3].Value === true" :key="index" style="flex-grow: 1;">
                  <textarea-autosize style="margin-top: 4px;" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP142'].Items[4].Value"/>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="tbl-title">7. {{__t('Đau')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Đau -->
        <tr v-if="MASTERDATA['OPDFCP148']">
          <th width="20%">{{__t('Đau')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP148'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP148radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP148radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP148'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Điểm đau -->
        <tr v-if="MASTERDATA['OPDFCP151']">
          <th width="20%">{{__t('Điểm đau')}}</th>
          <td>
            <span>
              <VSelectBox :unsetWidth="true" v-model="MASTERDATA['OPDFCP151'].Items[0].Value" :placeholder="__t('Thang điểm')" :items="pointLadder" />
            </span>
            <span>
              <VSelectBox :unsetWidth="true" v-model="MASTERDATA['OPDFCP151'].Items[1].Value" :placeholder="__t('Chọn')" :items="scores" />
            </span>
            <span>/ 10</span>
          </td>
        </tr>
        <!-- Vị trí đau -->
        <tr v-if="MASTERDATA['OPDFCP80']">
          <th width="20%">{{__t('Vị trí đau')}}</th>
          <td>
            <textarea-autosize class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP154'].Items[0].Value"/>
          </td>
        </tr>
        <!-- Tính chất đau -->
        <tr v-if="MASTERDATA['OPDFCP156']">
          <th width="20%">{{__t('Tính chất đau')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP156'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP156radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP156radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP156'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Ngày/ Thời điểm bắt đầu đau? -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Ngày/ Thời điểm bắt đầu đau?')}}</th>
          <td>
            <textarea-autosize class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDFCP159'].Items[0].Value"/>
          </td>
        </tr>
        <!-- Tần suất đau -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Tần suất đau')}}</th>
          <td>
            <div class="row">
              <template v-for="(item, index) in MASTERDATA['OPDFCP161'].Items">
                <div v-if="index !== '6'" class="col-md-3" :key="index + 'A1'">
                  <div :key="index + 'A1'" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center">
                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDFCP161radio-' + index" v-model="item.Value">
                        <label :for="'OPDFCP161radio-' + index"></label>
                      </span>
                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
                <div v-if="index === '6'" class="col-md-6" :key="index + 'A2'">
                  <span :key="index + 'A2'" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center">
                      <CheckboxValue class="mt-5" v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDFCP161radio-' + index" v-model="item.Value">
                        <label :for="'OPDFCP161radio-' + index"></label>
                      </span>
                      <span class="displaytbl no-wrap"><span>{{__label(item)}}</span></span>
                    </div>
                  </span>
                  <span v-else>
                    <textarea-autosize :key="index + 'A2'" :placeholder="__t('Nhập')" :readonly="isReadOnly" style="margin-left: 7px; line-height: 22px; height:34px;" class="form-control" :code="MASTERDATA['OPDFCP161'].Items[6].Code" v-model="MASTERDATA['OPDFCP161'].Items[6].Value"/>
                  </span>
                </div>
              </template>
            </div>
          </td>
        </tr>
        <!-- Liệu pháp giảm đau được sử dụng -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Liệu pháp giảm đau được sử dụng')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP92'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP92radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP92radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP92'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Hiệu quả của các liệu pháp giảm đau -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Hiệu quả của các liệu pháp giảm đau')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP92'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP92radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP92radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP92'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="tbl-title">8. {{__t('Dụng cụ tiêm truyền tĩnh mạch đang có')}}</div>
      <table class="table v-table-1 no-margin" v-if="!syncing">
        <!-- Có tăng hay giảm cân trong 3 tháng gần đây -->
        <tr v-if="MASTERDATA['OPDFCP66']">
          <th width="20%">{{__t('Có tăng hay giảm cân trong 3 tháng gần đây?')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP66'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP66radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP66radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP66'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
              <span style="display: flex" v-if="MASTERDATA['OPDFCP66'].Items[1].Value  === true || MASTERDATA['OPDFCP66'].Items[2].Value  === true">
                <span style="display: flex; align-items: center" class="mr-5 ml-5">Bao nhiêu (kg):</span>
                <textarea-autosize style="line-height: 37px;" rows="1" class="w-input-150" v-model="MASTERDATA['OPDFCP70'].Items[0].Value"/>
                <span style="display: flex; align-items: center" class="mr-5 ml-5">Lý do:</span>
                <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP72'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input type="checkbox" :id="'OPDFCP72radio-' + index" v-model="item.Value">
                    <label :for="'OPDFCP72radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP72'].Items, item)">{{__label(item)}}</label>
                  </span>
                </template>
              </span>
            </div>
          </td>
        </tr>
        <!-- Chế độ ăn -->
        <tr v-if="MASTERDATA['OPDFCP76']">
          <th width="20%">{{__t('Chế độ ăn')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP76'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP76radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP76radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP76'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Cảm giác khi ăn -->
        <tr v-if="MASTERDATA['OPDFCP80']">
          <th width="20%">{{__t('Cảm giác khi ăn')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP80'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP80radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP80radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP80'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
        <!-- Đường ăn, uống -->
        <tr v-if="MASTERDATA['OPDFCP84']">
          <th width="20%">{{__t('Đường ăn, uống')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP84'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP82radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP82radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP84'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
              <span v-if="MASTERDATA['OPDFCP84'].Items[3].Value === true">
                <textarea-autosize rows="1" class="form-control" v-model="MASTERDATA['OPDFCP84'].Items[4].Value"/>
              </span>
              <span v-if="MASTERDATA['OPDFCP84'].Items[2].Value === true" style="display: flex">
                <span class="mr-5 ml-5">Loại ống thông:</span>
                <textarea-autosize rows="1" class="form-control" v-model="MASTERDATA['OPDFCP90'].Items[0].Value"/>
              </span>
            </div>
          </td>
        </tr>
        <!-- Thói quen đại tiện -->
        <tr v-if="MASTERDATA['OPDFCP92']">
          <th width="20%">{{__t('Thói quen đại tiện')}}</th>
          <td>
            <div class="group-radio">
              <template :data="item"  v-for="(item,index) in MASTERDATA['OPDFCP92'].Items">
                <span :key="index" v-if="item.DataType === 'Radio'">
                  <input type="checkbox" :id="'OPDFCP92radio-' + index" v-model="item.Value">
                  <label :for="'OPDFCP92radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDFCP92'].Items, item)">{{__label(item)}}</label>
                </span>
              </template>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="this.DataSubmit.Version === 7" class="row mt-10">
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-if="ConfirmInfo.length > 0 ? ConfirmInfo[0].ConfirmBy : false">
        <p class="text-center">{{ConfirmInfo[0].ConfirmAt | formatDateWithoutSecon}}</p>
        <EformSignature2 :title="__t('Noi_tru_san.nguoi_thuc_hien')" :ad="ConfirmInfo[0].ConfirmBy || ''"/>
      </div>
      <div class="col-md-6 col-sm-6 col-md-offset-6 col-sm-offset-6 text-center" v-else>
        <p class="mt-10"><b>{{__t('Noi_tru_san.nguoi_thuc_hien')}}:</b></p>
        <ad-Info v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" :ad="DataSubmit.UpdatedBy || ''" class="mb-5"/>
        <p v-if="allowEdit && !IsFormLocked(DataSubmit)">
          <button v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" @click="showDoctorConfirm('Người thực hiện')" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
        </p>
        <div v-else >
          <p v-if="DataSubmit.UpdatedBy && !DataSubmit.IsNew" class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</p>
        </div>
      </div>
    </div>
    <div class="status-float-block">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-sm-2 col-md-1">
                <!-- <div class="form-group1">
                  <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button>
                </div> -->
              </div>
              <div class="col-sm-2 col-md-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <!-- <div class="col-sm-4 col-md-4">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'OPDInitialAssessmentFallRiskScreening', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Sàng lọc ngã')}}</button>
                </div>
              </div> -->
              <div class="col-sm-4 col-md-5">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <!-- <DoctorConfirm :popupTitle="popupTitle" @popupSave="popupSave"/> -->
    <logs :EdId="this.$route.params.Id" :Type="'OPD/InitialAssessments/ForOnGoing'" />
    <p>A02_008_080121_VE</p>
    <br/>
  </div>
  <div v-else>
    <div class="text-center p20">
      <NewForm @createForm="createPopup" :IsLocked="IsLocked" :TitleForm="''"/>
      <!-- <p>{{___t('Chưa có đánh giá người bệnh điều trị hóa trị trong ngày')}}</p>
      <button class="btn btn-warning" @click="createPopup">{{___t('Tạo mới')}}</button> -->
    </div>
  </div>
</template>
<script>
import FormApi from '@/services/FormAPI.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VSelectBox from '@/components/VSelect.vue'
// import InitialAssessment from '@/services/OPD/InitialAssessment'
// import ConfirmForms from '@/services/ConfirmForms'
import DoctorConfirm from './popup/PopupDoctorConfirm'
// import NProgress from 'nprogress'
import VDatePicker from '@/components/VDateTimePicker.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
// import ListOfCurrentMedications from '@/components/OPD/ListOfCurrentMedications.vue'
import Logs from '@/components/Logs.vue'
// import _ from 'lodash'
import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import InitialAssessmentForLongTerm from '@/components/OPD/ForOnGoingForm.vue'
import $ from 'jquery'

export default {
  name: 'InitialAssessmentLong',
  mixins: [MixinMasterData, MixinForm],
  props: ['OpdId'],
  components: {VSelectBox, VDatePicker, Logs, InitialAssessmentForm, InitialAssessmentForLongTerm, DoctorConfirm, CommunicableDiseasesScreening},
  data () {
    return {
      loaded: false,
      DataSubmit: {
        Datas: [],
        IsShowSyncButton: false,
        IsNew: false,
        PrimaryDoctor: {}
      },
      FormId: '',
      popupTitle: '',
      dataMaster: {},
      ConfirmInfo: [],
      PrimaryDoctors: [],
      syncing: false,
      List: [],
      formId: '',
      notes: [
        '0: Bình thường, không có trở ngại trong hoạt động/ Fully active, able to carry on all pre-disease performance without restriction',
        '1: Có trở ngại trong các hoạt động gắng sức nhưng đi lại được và có thể thực hiện được những công việc nhẹ nhàng như dọn dẹp nhà cửa, công việc văn phòng/ Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature, e.g., light house work, office work',
        '2: Đi lại được và có khả năng tự CS cá nhân trên 50% thời gian thức nhưng không làm việc được/ Ambulatory and capable of all selfcare but unable to carry out any work activities; up and about more than 50% of waking hours',
        '3: Có khả năng tự CS 1 phần, 50% thời gian thức phải ở trên giường hoặc ghế/ Capable of only limited selfcare; confined to bed or chair more than 50% of waking hours',
        '4: Phụ thuộc hoàn toàn và phải ở trên giường hoặc ghế hoàn toàn/ Completely disabled; cannot carry on any selfcare; totally confined to bed or chair',
        '5: Tử vong/ Dead'
      ],
      pointLadder: [
        {
          value: 'VAS',
          label: 'VAS'
        },
        {
          value: 'FLAC',
          label: 'FLAC'
        },
        {
          value: 'FACE',
          label: 'FACE'
        },
        {
          value: 'r-FLACC',
          label: 'r-FLACC'
        },
        {
          value: 'N-PASS',
          label: 'N-PASS'
        }
      ],
      scores: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        }
      ]
    }
  },
  computed: {
    _ItemId () {
      return this.formId || this.$route.params.Item
    },
    // bmiCalculation: function () {
    //   var weight = this.MASTERDATA['OPDFCP45'].Items && this.MASTERDATA['OPDFCP45'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDFCP45'].Items[0].Value) : 0
    //   var height = this.MASTERDATA['OPDFCP43'].Items && this.MASTERDATA['OPDFCP43'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDFCP43'].Items[0].Value) / 100) : 0
    //   return (weight / (height * height)).toFixed(2)
    // },
    allowEdit () {
      if (this.DataSubmit.Version >= 7) {
        return (this.DataSubmit.IsNew || this.DataSubmit.UpdatedBy === this.$store.state.account.Username || this.ImSuperAdmin()) && !(this.ConfirmInfo.length > 0 ? this.ConfirmInfo[0].ConfirmBy : false)
      }
      return this.DataSubmit.IsNew || this.DataSubmit.UpdatedBy === this.$store.state.account.Username || this.ImSuperAdmin()
    },
    allowEditDoctor () {
      return this.DataSubmit.IsNew || this.DataSubmit.UpdatedBy === this.$store.state.account.Username || this.ImSuperAdmin()
    }
  },
  async mounted () {
    this.getMasterDatas({Form: 'OPDFORCP'}, () => {
      // this.getClinics()
      // this.getData()
    })
    this.APIService = await new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'NBDTHTTN'
    })
    this.getList()
  },
  // created () {
  //   this.getMasterDatas({Form: 'OPDFORCP'}, () => {
  //     this.getClinics()
  //     // this.getData()
  //   })
  // },
  methods: {
    showNotes () {
      console.log('join showNotes')
      $('#notePopoverCheck').popover({
        html: true,
        content: function () {
          console.log(this, 'check this')
          var elementId = $(this).attr('data-popover-content')
          return $(elementId).html()
        }
      })
      var notesHtml = ''
      for (let index = 0; index < this.notes.length; index++) {
        notesHtml += this.$t(this.notes[index]) + '<br>'
      }
      $('#notePopoverCheck').attr('data-content', notesHtml)
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ban đầu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    create () {
      console.log(this.APIService, 'check API service')
      this.APIService.CreateForm({}).then(res => {
        this.toastedSuccess()
        this.reload()
      })
    },
    getList () {
      this.APIService.GetList().then(res => {
        if (res.FORM_NOT_FOUND && res.FORM_NOT_FOUND.ViMessage === 'Form không tồn tại') {
        } else {
          console.log(res, 'check rés')
          this.List = res.Datas
          // this.$route.params.Item = this.Datas[0].Id
          this.formId = res.Datas[0].Id
          console.log(this.formId, 'check formID')
        }
        this.getData()
      }).catch((e) => {
        this.loaded = true
      })
    },
    getData () {
      this.APIService.GetDetail(this.formId + '?hidemsg=' + true).then(res => {
        console.log(res, 'check res')
        // this.DataSubmit = res.data
        // this.IsLocked = res.IsLock24h
        this.$store.dispatch('setCurrentFormId', this.DataSubmit.Id)
        // this.mapData()
        this.loaded = true
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
  >>>.popover-content {
    color: black;
  }
  >>>#notePopoverCheck{
    color: black;
    margin-left: 12px;
    cursor: pointer;
  }
  >>>#notePopoverCheck:hover {
    color: red;
  }
  >>>#detailNotes {
    color: black;
    margin-left: 12px;
  }
  >>>.popover {
    max-width: 600px;
  }
  .v-table2 {
    tbody {
      tr:nth-of-type(even) {
        background-color: #fff !important;
      }
      tr:hover {
        background: #fff !important;
      }
      tr {
        cursor: auto!important;
      }
    }
  }
</style>
