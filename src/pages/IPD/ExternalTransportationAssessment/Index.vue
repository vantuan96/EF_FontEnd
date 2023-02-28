<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <table :class="{ 'disabel-table-2': isConfirmed }" class="table standing-order-tbl td-re">
          <tr>
            <th colspan="6">
              1. {{ __t("Nhân lực") }}
              <span class="note-text">{{
                ___t("(Đánh giá người bệnh và tích &#10004; vào ô tương ứng)")
              }}</span>
            </th>
          </tr>
          <tr>
            <td width="70px" class="bg-F5F5F5 text-center">
              <b>{{ __t("Hệ cơ quan") }}</b>
            </td>
            <td class="bg-F5F5F5 text-center">
              <b>{{ __t("Tiêu chí") }}</b>
            </td>
            <td class="bg-F5F5F5 text-center"><b>NA</b></td>
            <td class="bg-337AB7 text-center w300">
              <b>{{ __t("Xanh") }}</b>
            </td>
            <td class="bg-DC3545 text-center w300" colspan="2">
              <b>{{ __t("Đỏ") }}</b>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETRSAS']">
            <td width="1px" rowspan="9" class="text-center">
              <img src="/static/than_kinh.png" class="hidden" />
              <div class="font18 font-bold text-rotate-90 no-wrap">
                {{ __t("Thần kinh") }}
              </div>
            </td>
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETRSAS'])"
              ></div>
              <GENTDBM :datas="dataGentdbm" :type="1" />
            </td>
            <td
              :key="index + 'EIOAEFETRSAS'"
              v-for="(item, index) in MASTERDATA['EIOAEFETRSAS'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETRSAS'].Items, item)
                    "
                    :id="'EIOAEFETRSAS-' + index"
                    :name="'EIOAEFETRSAS-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETRSAS-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                  <!-- <CheckboxsValue :data="MASTERDATA['EIOAEFETRSAS'].Items" :showall="true" :hideLabel="true"></CheckboxsValue> -->
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETGLCS']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETGLCS'])"
              ></div>
              <GENTDBM :datas="dataGentdbm" :type="3" />
            </td>
            <td
              :key="index + 'EIOAEFETGLCS'"
              v-for="(item, index) in MASTERDATA['EIOAEFETGLCS'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETGLCS'].Items, item)
                    "
                    :id="'EIOAEFETGLCS-' + index"
                    :name="'EIOAEFETGLCS-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETGLCS-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETAVPU']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETAVPU'])"
              ></div>
              <GENTDBM :datas="dataGentdbm" :type="2" />
            </td>
            <td
              :key="index + 'EIOAEFETAVPU'"
              v-for="(item, index) in MASTERDATA['EIOAEFETAVPU'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETAVPU'].Items, item)
                    "
                    :id="'EIOAEFETAVPU-' + index"
                    :name="'EIOAEFETAVPU-' + index"
                    v-model="item.Value"
                  />

                  <label
                    :for="'EIOAEFETAVPU-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETCTCS']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETCTCS'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETCTCS'"
              v-for="(item, index) in MASTERDATA['EIOAEFETCTCS'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETCTCS'].Items, item)
                    "
                    :id="'EIOAEFETCTCS-' + index"
                    :name="'EIOAEFETCTCS-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETCTCS-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETYTHU']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETYTHU'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETYTHU'"
              v-for="(item, index) in MASTERDATA['EIOAEFETYTHU'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETYTHU'].Items, item)
                    "
                    :id="'EIOAEFETYTHU-' + index"
                    :name="'EIOAEFETYTHU-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETYTHU-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label">{{ __label(item) }}</span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETALNS']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETALNS'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETALNS'"
              v-for="(item, index) in MASTERDATA['EIOAEFETALNS'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETALNS'].Items, item)
                    "
                    :id="'EIOAEFETALNS-' + index"
                    :name="'EIOAEFETALNS-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETALNS-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETNBBL']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETNBBL'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETNBBL'"
              v-for="(item, index) in MASTERDATA['EIOAEFETNBBL'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETNBBL'].Items, item)
                    "
                    :id="'EIOAEFETNBBL-' + index"
                    :name="'EIOAEFETNBBL-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETNBBL-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label">{{ __label(item) }}</span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETCOGI']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETCOGI'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETCOGI'"
              v-for="(item, index) in MASTERDATA['EIOAEFETCOGI'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETCOGI'].Items, item)
                    "
                    :id="'EIOAEFETCOGI-' + index"
                    :name="'EIOAEFETCOGI-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETCOGI-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETLAHT']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETLAHT'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETLAHT'"
              v-for="(item, index) in MASTERDATA['EIOAEFETLAHT'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETLAHT'].Items, item)
                    "
                    :id="'EIOAEFETLAHT-' + index"
                    :name="'EIOAEFETLAHT-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETLAHT-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETMTDT']">
            <td width="1px" rowspan="6" class="text-center">
              <img src="/static/tuan_hoan.png" class="hidden" />
              <div class="font18 font-bold text-rotate-90 no-wrap">
                {{ __t("Tuần hoàn") }}
              </div>
            </td>
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETMTDT'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETMTDT'"
              v-for="(item, index) in MASTERDATA['EIOAEFETMTDT'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETMTDT'].Items, item)
                    "
                    :id="'EIOAEFETMTDT-' + index"
                    :name="'EIOAEFETMTDT-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETMTDT-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETDANG']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETDANG'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETDANG'"
              v-for="(item, index) in MASTERDATA['EIOAEFETDANG'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETDANG'].Items, item)
                    "
                    :id="'EIOAEFETDANG-' + index"
                    :name="'EIOAEFETDANG-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETDANG-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETMATN']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETMATN'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETMATN'"
              v-for="(item, index) in MASTERDATA['EIOAEFETMATN'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETMATN'].Items, item)
                    "
                    :id="'EIOAEFETMATN-' + index"
                    :name="'EIOAEFETMATN-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETMATN-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETVAMA']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETVAMA'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETVAMA'"
              v-for="(item, index) in MASTERDATA['EIOAEFETVAMA'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETVAMA'].Items, item)
                    "
                    :id="'EIOAEFETVAMA-' + index"
                    :name="'EIOAEFETVAMA-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETVAMA-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETLONH']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETLONH'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETLONH'"
              v-for="(item, index) in MASTERDATA['EIOAEFETLONH'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETLONH'].Items, item)
                    "
                    :id="'EIOAEFETLONH-' + index"
                    :name="'EIOAEFETLONH-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETLONH-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETBOPD']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETBOPD'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETBOPD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETBOPD'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETBOPD'].Items, item)
                    "
                    :id="'EIOAEFETBOPD-' + index"
                    :name="'EIOAEFETBOPD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETBOPD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label">{{ __label(item) }}</span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETNTDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETNTDD'].Items[1].Value,
            }"
          >
            <td width="1px" rowspan="6" class="text-center">
              <img src="/static/ho_hap.png" class="hidden" />
              <div class="font18 font-bold text-rotate-90 no-wrap">
                {{ __t("Hô hấp") }}
              </div>
            </td>
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETNTDD'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETNTDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETNTDD'].Items"
              class="has-checkbox"
              :class="{ 'lasst-td': index === 1 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETNTDD'].Items, item)
                    "
                    :id="'EIOAEFETNTDD-' + index"
                    :name="'EIOAEFETNTDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETNTDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETNTDD'].Items[1].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETNTBS'].Items,
                        MASTERDATA['EIOAEFETNTBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETNTBS-' + index"
                    :name="'EIOAEFETNTBS-' + index"
                    v-model="MASTERDATA['EIOAEFETNTBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETNTBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETNTBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
            <td rowspan="7" class="bg-FFC107 bd-FFC107 padding12">
              <div class="font14 font-bold text-rotate-90 w-auto">
                {{ __t("Bác sĩ phải tái đánh giá (tích vào ô màu vàng)") }}
              </div>
            </td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETFHDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETFHDD'].Items[2].Value,
            }"
          >
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETFHDD'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETFHDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETFHDD'].Items"
              class="has-checkbox"
              :class="{ 'lass2t-td': index === 2 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETFHDD'].Items, item)
                    "
                    :id="'EIOAEFETFHDD-' + index"
                    :name="'EIOAEFETFHDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETFHDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETFHDD'].Items[2].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETFHBS'].Items,
                        MASTERDATA['EIOAEFETFHBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETFHBS-' + index"
                    :name="'EIOAEFETFHBS-' + index"
                    v-model="MASTERDATA['EIOAEFETFHBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETFHBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETFHBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETDTDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETDTDD'].Items[1].Value,
            }"
          >
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETDTDD'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETDTDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETDTDD'].Items"
              class="has-checkbox"
              :class="{ 'lass2t-td': index === 1 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETDTDD'].Items, item)
                    "
                    :id="'EIOAEFETDTDD-' + index"
                    :name="'EIOAEFETDTDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETDTDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETDTDD'].Items[1].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETDTBS'].Items,
                        MASTERDATA['EIOAEFETDTBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETDTBS-' + index"
                    :name="'EIOAEFETDTBS-' + index"
                    v-model="MASTERDATA['EIOAEFETDTBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETDTBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETDTBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETTMDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETTMDD'].Items[1].Value,
            }"
          >
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETTMDD'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETTMDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETTMDD'].Items"
              class="has-checkbox"
              :class="{ 'lass2t-td': index === 1 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETTMDD'].Items, item)
                    "
                    :id="'EIOAEFETTMDD-' + index"
                    :name="'EIOAEFETTMDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETTMDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETTMDD'].Items[1].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETTMBS'].Items,
                        MASTERDATA['EIOAEFETTMBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETTMBS-' + index"
                    :name="'EIOAEFETTMBS-' + index"
                    v-model="MASTERDATA['EIOAEFETTMBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETTMBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETTMBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETTKDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETTKDD'].Items[1].Value,
            }"
          >
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETTKDD'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETTKDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETTKDD'].Items"
              class="has-checkbox"
              :class="{ 'lass2t-td': index === 1 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETTKDD'].Items, item)
                    "
                    :id="'EIOAEFETTKDD-' + index"
                    :name="'EIOAEFETTKDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETTKDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETTKDD'].Items[1].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETTKBS'].Items,
                        MASTERDATA['EIOAEFETTKBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETTKBS-' + index"
                    :name="'EIOAEFETTKBS-' + index"
                    v-model="MASTERDATA['EIOAEFETTKBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETTKBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETTKBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label">{{ __label(item) }}</span>
            </td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETPHDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETPHDD'].Items[2].Value,
            }"
          >
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETPHDD'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETPHDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETPHDD'].Items"
              class="has-checkbox"
              :class="{ 'lass2t-td': index === 2 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETPHDD'].Items, item)
                    "
                    :id="'EIOAEFETPHDD-' + index"
                    :name="'EIOAEFETPHDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETPHDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETPHDD'].Items[2].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETPHBS'].Items,
                        MASTERDATA['EIOAEFETPHBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETPHBS-' + index"
                    :name="'EIOAEFETPHBS-' + index"
                    v-model="MASTERDATA['EIOAEFETPHBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETPHBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETPHBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
          </tr>
          <tr
            v-if="MASTERDATA['EIOAEFETOBDD']"
            :class="{
              'has-padding-2': MASTERDATA['EIOAEFETOBDD'].Items[2].Value,
            }"
          >
            <td width="1px" rowspan="2" class="text-center">
              <img src="/static/tieu_hoa.png" class="hidden" />
              <div class="font18 font-bold text-rotate-90">
                {{ __t("Tiêu hóa") }}
              </div>
            </td>
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETOBDD'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETOBDD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETOBDD'].Items"
              class="has-checkbox"
              :class="{ 'lass3t-td': index === 2 }"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETOBDD'].Items, item)
                    "
                    :id="'EIOAEFETOBDD-' + index"
                    :name="'EIOAEFETOBDD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETOBDD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
                <div
                  class="v-checkbox yellow-checkbox"
                  v-if="MASTERDATA['EIOAEFETOBDD'].Items[2].Value"
                >
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(
                        MASTERDATA['EIOAEFETOBBS'].Items,
                        MASTERDATA['EIOAEFETOBBS'].Items[index]
                      )
                    "
                    :id="'EIOAEFETOBBS-' + index"
                    :name="'EIOAEFETOBBS-' + index"
                    v-model="MASTERDATA['EIOAEFETOBBS'].Items[index].Value"
                  />
                  <label
                    :for="'EIOAEFETOBBS-' + index"
                    :class="{
                      'isReadonly-checkbox': isReadonlyCheckbox(
                        MASTERDATA['EIOAEFETOBBS'].Items[index]
                      ),
                    }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETBTDG']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETBTDG'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETBTDG'"
              v-for="(item, index) in MASTERDATA['EIOAEFETBTDG'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETBTDG'].Items, item)
                    "
                    :id="'EIOAEFETBTDG-' + index"
                    :name="'EIOAEFETBTDG-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETBTDG-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETCHMA']">
            <td width="1px" rowspan="4" class="text-center">
              <img src="/static/khac.png" class="hidden" />
              <div class="font18 font-bold text-rotate-90">
                {{ __t("Khác") }}
              </div>
            </td>
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETCHMA'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETCHMA'"
              v-for="(item, index) in MASTERDATA['EIOAEFETCHMA'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETCHMA'].Items, item)
                    "
                    :id="'EIOAEFETCHMA-' + index"
                    :name="'EIOAEFETCHMA-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETCHMA-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETDUTR']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETDUTR'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETDUTR'"
              v-for="(item, index) in MASTERDATA['EIOAEFETDUTR'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETDUTR'].Items, item)
                    "
                    :id="'EIOAEFETDUTR-' + index"
                    :name="'EIOAEFETDUTR-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETDUTR-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETHTOD']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETHTOD'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETHTOD'"
              v-for="(item, index) in MASTERDATA['EIOAEFETHTOD'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETHTOD'].Items, item)
                    "
                    :id="'EIOAEFETHTOD-' + index"
                    :name="'EIOAEFETHTOD-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETHTOD-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETDPCL']">
            <td>
              <div
                class="padding-10"
                v-html="__label(MASTERDATA['EIOAEFETDPCL'])"
              ></div>
            </td>
            <td
              :key="index + 'EIOAEFETDPCL'"
              v-for="(item, index) in MASTERDATA['EIOAEFETDPCL'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETDPCL'].Items, item)
                    "
                    :id="'EIOAEFETDPCL-' + index"
                    :name="'EIOAEFETDPCL-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETDPCL-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span
                class="checkbox-label"
                v-if="index"
                v-html="__label(item)"
              ></span>
            </td>
            <td class="f-td"></td>
          </tr>
          <tr v-if="MASTERDATA['EIOAEFETTPDV']">
            <td colspan="2">
              <div
                class="padding-10 font18 font-bold text-center"
                v-html="__label(MASTERDATA['EIOAEFETTPDV'])"
              ></div>
            </td>
            <td></td>
            <td
              :key="index + 'EIOAEFETTPDV'"
              v-for="(item, index) in MASTERDATA['EIOAEFETTPDV'].Items"
              class="has-checkbox"
            >
              <div class="v-checkbox-box cb0x">
                <div class="v-checkbox">
                  <input
                    :disabled="isConfirmed"
                    type="checkbox"
                    @click="
                      checkbox2Radios(MASTERDATA['EIOAEFETTPDV'].Items, item)
                    "
                    :id="'EIOAEFETTPDV-' + index"
                    :name="'EIOAEFETTPDV-' + index"
                    v-model="item.Value"
                  />
                  <label
                    :for="'EIOAEFETTPDV-' + index"
                    :class="{ 'isReadonly-checkbox': isReadonlyCheckbox(item) }"
                  ></label>
                </div>
              </div>
              <span class="checkbox-label" v-html="__label(item)"></span>
            </td>
            <td class="f-td"></td>
          </tr>
        </table>
        <p>
          <i>*{{ __t("Trừ một số tình huống đặc biệt (Tham khảo quy trình)") }}</i>
        </p>
        <table class="table standing-order-tbl no-margin">
          <tr>
            <th>2. {{ __t("Phương tiện, công cụ/ dụng cụ, thuốc") }}</th>
          </tr>
        </table>
        <table class="table standing-order-tbl no-margin">
          <tr>
            <td width="1" class="bg-F5F5F5 text-center">
              <b>{{ __t("Stt") }}</b>
            </td>
            <td class="bg-F5F5F5 text-center">
              <b>{{ __t("Công cụ/ dụng cụ, thiết bị, thuốc") }}</b>
            </td>
            <td class="bg-F5F5F5 text-center no-wrap" width="1">
              <b>{{ __t("Tính cần thiết") }}</b>
            </td>
            <td class="bg-F5F5F5 text-center">
              <b>{{ __t("Ghi chú") }}</b>
            </td>
          </tr>
          <tr
            :key="index"
            v-for="(item, index) in DataSubmit.Equipments"
            v-if="!item.Removed"
          >
            <template v-if="isConfirmed || isDoctor()">
              <td style="text-align: center">{{ index + 1 }}</td>
              <td>
                <p>{{ item.Name }}</p>
              </td>
              <td class="text-center no-wrap" width="1">
                {{ IsNeededValue(item) }}
              </td>
              <td width="300">
                <p>{{ item.Note }}</p>
              </td>
            </template>
            <template v-else>
              <template v-if="index <= 4">
                <td style="text-align: center">{{ index + 1 }}</td>
                <td>
                  <p>{{ item.Name }}</p>
                </td>
                <td width="1">
                  <div class="flex-box">
                    <div class="group-radio">
                      <span style="margin-right: 5px">
                        <input
                          type="radio"
                          @click="uncheck(item, 'true')"
                          :id="index + 'yes'"
                          :name="index + 'IsNeeded'"
                          value="true"
                          v-model="item.IsNeeded"
                        />
                        <label class="no-margin" :for="index + 'yes'">{{
                          __t("Có")
                        }}</label>
                      </span>
                      <span>
                        <input
                          type="radio"
                          @click="uncheck(item, 'false')"
                          :id="index + 'no'"
                          :name="index + 'IsNeeded'"
                          value="false"
                          v-model="item.IsNeeded"
                        />
                        <label class="no-margin" :for="index + 'no'">{{
                          __t("Không")
                        }}</label>
                      </span>
                    </div>
                  </div>
                </td>
                <td width="300">
                  <textarea-autosize
                    :placeholder="__t('Ghi chú')"
                    class="form-control"
                    rows="1"
                    v-model="item.Note"
                  />
                </td>
              </template>
              <template v-else>
                <td class="text-center" style="position: relative">
                  <button
                    v-if="!item.Id"
                    class="btn-pos-left"
                    @click="item.Removed = true"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <p>{{ index + 1 }}</p>
                </td>
                <td>
                  <textarea-autosize
                    :placeholder="__t('Nhập công cụ')"
                    class="form-control"
                    rows="1"
                    v-model="item.Name"
                  />
                </td>
                <td width="1">
                  <div class="flex-box">
                    <div class="group-radio">
                      <span style="margin-right: 5px">
                        <input
                          type="radio"
                          @click="uncheck(item, 'true')"
                          :id="index + 'yes'"
                          :name="index + 'IsNeeded'"
                          value="true"
                          v-model="item.IsNeeded"
                        />
                        <label class="no-margin" :for="index + 'yes'">{{
                          __t("Có")
                        }}</label>
                      </span>
                      <span>
                        <input
                          type="radio"
                          @click="uncheck(item, 'false')"
                          :id="index + 'no'"
                          :name="index + 'IsNeeded'"
                          value="false"
                          v-model="item.IsNeeded"
                        />
                        <label class="no-margin" :for="index + 'no'">{{
                          __t("Không")
                        }}</label>
                      </span>
                    </div>
                  </div>
                </td>
                <td width="300">
                  <textarea-autosize
                    :placeholder="__t('Ghi chú')"
                    class="form-control"
                    rows="1"
                    v-model="item.Note"
                  />
                </td>
              </template>
            </template>
          </tr>
        </table>
        <div
          class="text-center"
          v-if="
            !isConfirmed && !$store.state.account.Position.includes('Doctor')
          "
        >
          <button @click="newEquipments" class="btn v-green-btn v-bottom-btn">
            <i aria-hidden="true" class="fa fa-plus"></i> THÊM CÔNG CỤ/ DỤNG CỤ,
            THIẾT BỊ, THUỐC
          </button>
        </div>
        <br />
        <br />
        <p>
          <b>3. {{ __t("Các lưu ý khác (nếu có)") }}</b>
        </p>
        <template v-if="MASTERDATA['EIOAEFETCLYK']">
          <md-input-text
            :placeholder="__t('Nhập')"
            :hidelabel="true"
            v-if="
              !isConfirmed && !$store.state.account.Position.includes('Doctor')
            "
            v-model="MASTERDATA['EIOAEFETCLYK']"
          />
          <p v-else>{{ MASTERDATA["EIOAEFETCLYK"].Items[0].Value }}</p>
        </template>
        <br />
        <br />
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.NurseTime">
              <p>{{ DataSubmit.NurseTime }}</p>
              <eform-signature
                :ad="DataSubmit.Nurse.Username"
                :title="__t('Điều dưỡng thực hiện')"
              />
            </template>
            <template v-else>
              <p>
                <b>{{ __t("Điều dưỡng thực hiện") }}:</b>
              </p>
              <p v-if="!viewOnly">
                <button
                  @click="showDoctorConfirm('Nurse', 'Điều dưỡng thực hiện')"
                  class="btn v-white-btn"
                >
                  {{ __t("Xác nhận") }}
                </button>
              </p>
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.DoctorTime">
              <p>{{ DataSubmit.DoctorTime }}</p>
              <eform-signature
                :ad="DataSubmit.Doctor.Username"
                :title="__t('Bác sĩ thực hiện')"
              />
            </template>
            <template v-else>
              <p>
                <b>{{ __t("Bác sĩ thực hiện") }}:</b>
              </p>
              <p v-if="!viewOnly">
                <button
                  @click="showDoctorConfirm('Doctor', 'Bác sĩ thực hiện')"
                  class="btn v-white-btn"
                >
                  {{ __t("Xác nhận") }}
                </button>
              </p>
            </template>
          </div>
        </div>
        <br />
        <logs
          v-if="!isConfirmed"
          :EdId="this.$route.params.Id"
          :Type="'ExternalTransportationAssessment'"
          :noDetail="true"
        />
        <p>A02_055_050919_V</p>
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
                {{ __t("Vui lòng nhập tài khoản ad để xác nhận") }}
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
                <span
                  class="glyphicon glyphicon-user form-control-feedback"
                ></span>
              </div>
              <div class="form-group has-feedback">
                <input
                  v-model="user.password"
                  type="password"
                  class="form-control current-password"
                  :placeholder="__t('Mật khẩu')"
                />
                <span
                  class="glyphicon glyphicon-lock form-control-feedback"
                ></span>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <button
                    type="button"
                    class="btn btn-block v-white-btn"
                    @click="$modal.hide('doctorConfirm')"
                  >
                    {{ __t("Thoát") }}
                  </button>
                </div>
                <div class="col-xs-6">
                  <button
                    type="button"
                    class="btn btn-block v-yellow-btn"
                    @click="confirm()"
                  >
                    {{ __t("Xác nhận") }}
                  </button>
                </div>
              </div>
              <p style="margin-top: 10px; text-align: center">
                {{ __t("Sử dụng tài khoản máy tính") }}
              </p>
              <p style="margin-top: 10px; text-align: center">
                {{
                  __t(
                    "Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu"
                  )
                }}
              </p>
            </div>
          </div>
        </modal>
        <!-- <div class="status-float-block" v-if="!isConfirmed">
          <div class="action-btn-block">
            <div class="container">
              <div class="content-container">
                <div class="row">
                  <div class="col-md-2 col-sm-2">
                    <div class="form-group1">
                      <button
                        class="btn btn-block v-white-btn"
                        type="button"
                        @click="handleBack()"
                      >
                        <i
                          class="fa fa-angle-double-left"
                          aria-hidden="true"
                        ></i>
                        {{ __t("Quay lại") }}
                      </button>
                    </div>
                  </div>
                  <div class="col-md-5 col-sm-5">
                    <div class="form-group1"></div>
                  </div>
                  <div class="col-md-5 col-sm-5">
                    <div class="form-group1">
                      <button
                        v-if="!isConfirmed"
                        class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                        v-shortkey="['ctrl', 's']"
                        @shortkey="save()"
                        type="button"
                        @click="save()"
                      >
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                        {{ __t("btn.luu") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- footer -->
        <FloatBlock  v-if="!isConfirmed" :openBack="true" @handleBack="handleBack">
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
    </template>
    <div v-else class="loading-text"><v-loading /></div>
  </div>
</template>
<script>
/*
api/IPD/ExternalTransportationAssessment/{id}
api/IPD/ExternalTransportationAssessment/Create/{id}
api/IPD/ExternalTransportationAssessment/{id}
api/IPD/ExternalTransportationAssessment/Confirm/{id}
GENTDBM : thang điểm
EIOAEFET: form
*/
import ExternalTransportationAssessment from '@/services/IPD/ExternalTransportationAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import VDatePicker from '@/components/VDateTimePicker.vue'
import GENTDBM from './GENTDBM.vue'
import Logs from '@/components/Logs.vue'

// import $ from 'jquery'
import _ from 'lodash'
// import moment from 'moment'
export default {
  name: 'ExternalTransportationAssessmentIndex',
  mixins: [MixinMasterData],
  props: ['VisitId', 'VisitType', 'viewOnly', 'formId'],
  data () {
    return {
      user: {},
      DataSubmit: null,
      loaded: false,
      users: [],
      progressDatas: [],
      popupTitle: '',
      dataGentdbm: null,
      IsLocked: false,
      EIOExternalTransportationAssessments: [],
      firstData: null
    }
  },
  components: {
    VDatePicker,
    Logs,
    GENTDBM
  },
  mounted () {
    this.getData()
    // this.getList()
    this.getRawMasterDatas(
      {
        Form: 'GENTDBM'
      },
      (data) => {
        this.dataGentdbm = data
        this.dataGentdbm[0].Items = data[0].Items.sort((a, b) =>
          a.Order < b.Order ? 1 : -1
        )
      }
    )
  },
  computed: {
    isConfirmed: function () {
      return (
        this.DataSubmit.DoctorTime ||
        this.DataSubmit.NurseTime ||
        this.viewOnly
      )
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
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    }
  },
  watch: {
    formId (val) {
      this.getData()
    }
  },
  methods: {
    IsNeededValue (item) {
      if (item.IsNeeded === null) return 'N/A'
      return item.IsNeeded ? (item.IsNeeded === 'true' ? 'Có' : 'Không') : ''
    },
    newEquipments () {
      this.DataSubmit.Equipments.push({
        IsNeeded: '',
        Name: '',
        Note: '',
        Removed: false
      })
    },
    uncheck (val, type) {
      if (val.IsNeeded === type) {
        val.IsNeeded = ''
      }
    },
    checkbox2RadioInput (item, value) {
      item.IsNeeded = value
    },
    isReadonlyCheckbox (item) {
      return !this.$store.state.account.Position.includes(item.Note)
    },
    checkbox2Radios (items, item) {
      items.forEach((element) => {
        if (element.Code !== item.Code) {
          element.Value = false
        }
      })
    },
    getData () {
      new ExternalTransportationAssessment({}, this._VisitType)
        .find(this._VisitId + '/' + this._ItemId + '?hidemsg=' + true)
        .then((response) => {
          this.DataSubmit = response
          this.IsLocked = response.IsLocked
          if (response.IsLocked) {
            this.viewOnly = true
          }
          this.DataSubmit.Equipments.forEach((e) => {
            if (e.IsNeeded === true) e.IsNeeded = 'true'
            if (e.IsNeeded === false) e.IsNeeded = 'false'
          })
          this.loaded = true
          this.getMasterDatas({ Form: 'EIOAEFET' }, () => {
            for (const property in this.MASTERDATA) {
              if (this.MASTERDATA[property].Items) {
                this.MASTERDATA[property].Items.forEach((item) => {
                  var code = item.Code
                  var exited = _.find(this.DataSubmit.Datas, { Code: code })
                  if (exited) {
                    if (
                      this.checkString(item.DataType, 'CheckBox') ||
                      this.checkString(item.DataType, 'Radio')
                    ) {
                      var isTrue = exited.Value === 'True'
                      item.Value = isTrue
                    } else {
                      item.Value = exited.Value
                    }
                  }
                })
              }
            }
          })
          setTimeout(() => {
            this.firstData = JSON.stringify(this.MASTERDATA)
          }, 500)
        })
        .catch((e) => {
          if (e.data !== undefined) {
            this.IsLocked = e.data.IsLocked
            this.loaded = true
          } else {
            this.loaded = true
            this.IsLocked = true
          }
        })
    },
    save () {
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            // obj[item.Code] = item.Value
          })
        }
      }
      this.DataSubmit.Equipments = this.DataSubmit.Equipments.filter(
        (e) => !e.Removed
      )
      return new ExternalTransportationAssessment({}, this._VisitType)
        .update(this.$route.params.Id + '/' + this._ItemId, this.DataSubmit)
        .then((response) => {
          this.toastedSuccess()
          this.reload()
        })
        .catch((e) => {
        })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    async confirm () {
      if (!this.isConfirmed) {
        await this.save2()
      }
      new ExternalTransportationAssessment({}, this._VisitType)
        .update(this.$route.params.Id + '/' + this._ItemId, this.user, 'Confirm/')
        .then((response) => {
          this.$modal.hide('doctorConfirm')
          this.toastedSuccess()
          this.reload()
        })
        .catch((e) => {
        })
    },
    handleBack () {
      this.edited = false
      if (this.firstData !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
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
              this.back()
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
    save2 () {
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
          })
        }
      }
      this.DataSubmit.Equipments = this.DataSubmit.Equipments.filter(
        (e) => !e.Removed
      )
      return new ExternalTransportationAssessment({}, this._VisitType)
        .update(this.$route.params.Id + '/' + this._ItemId, this.DataSubmit)
        .then(() => {
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
