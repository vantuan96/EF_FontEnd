<template>
  <div class="page-table-vital">
    <div class="box-table mrb30">
      <table v-if="listItems.length > 0" v-dragscroll.x="true" @mousedown="cursorGrap = false" @mouseup="cursorGrap = true" :class="{'cursor-grapbing': !cursorGrap, 'cursor-grap': cursorGrap }" class="standing-order-tbl table-hover">
      <!-- <table> -->
        <tr>
          <th style="min-width: 180px;" colspan="2" class="no-wrap table-head">Ngày/giờ thực hiện</th>
          <td></td>
          <td class="text-center" v-for="(item, index) in listItems" :key="index">
            <button class="btn v-yellow-btn btn-edit" v-if="$store.state.account.Username === item.CreatedBy && hasRole('IPDNOC3') && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button>
          </td>
        </tr>
        <tr>
          <th colspan="2" class="table-head">Dấu hiệu</th>
          <th class="table-head">NEWS</th>
          <td class="text-center" v-for="(item, index) in listItems" :key="index">
            {{item.TransactionDate | formatDateWithoutSecon}}
          </td>
        </tr>
        <!-- Nhip tho -->
        <tr class="text-center">
          <th class="text-center no-wrap table-head__sticky" rowspan="14">
            <b>Nhịp thở (*)</b>
            <p class="font-normal">(Lần/ phút)</p>
            <v-popover :placement="'right'" :trigger="'hover'">
              <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
              <template slot="popover">
                <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Breath'"/>
              </template>
            </v-popover>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 80</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 80">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">75-79</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 75 && item <= 79">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">70-74</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 70 && item <= 74">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">65-69</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 65 && item <= 69">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">60-64</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 60 && item <= 64">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">55-59</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 55 && item <= 59">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">50-54</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 50 && item <= 54">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">45-49</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 45 && item <= 49">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">40-44</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 40 && item <= 44">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">35-39</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 35 && item <= 39">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">30-34</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 30 && item <= 34">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">25-29</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 25 && item <= 29">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">20-24</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item >= 20 && item <= 24">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 19</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsNhipTho" :key="index">
            <span v-if="item <= 19">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Suy ho hap -->
        <tr class="text-center">
          <th class="text-center no-wrap table-head__sticky" rowspan="4">
            <b>Suy hô hấp</b>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">Nặng</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.SuyHoHap === 'Nặng'">3</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">Vừa</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.SuyHoHap === 'Vừa'">2</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">Nhẹ</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.SuyHoHap === 'Nhẹ'">1</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">Không</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.SuyHoHap === 'Không'">0</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- SpO2 -->
        <tr class="text-center">
          <th class="text-center no-wrap table-head__sticky" rowspan="4">
            <b>SpO<sub>2</sub></b>
            <p class="font-normal">(%)</p>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 95</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 >= 95">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">91 - 94</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 >= 91 && item.Spo2 <= 94">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">85-90</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 >= 85 && item.Spo2 <= 90">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 84</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Spo2 <= 84">{{item.Spo2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Mạch -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="13">
            <b>Mạch (*)</b>
            <p class="font-normal">(Nhịp/ phút)</p>
            <v-popover :placement="'right'" :trigger="'hover'">
              <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
              <template slot="popover">
                <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Pulse'"/>
              </template>
            </v-popover>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 180</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 180">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">170-179</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 170 && item <= 179">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">160-169</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 160 && item <= 169">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">150-159</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 150 && item <= 159">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">140-149</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 140 && item <= 149">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">130-139</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 130 && item <= 139">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">120-129</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 120 && item <= 129">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">110-119</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 110 && item <= 119">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">100-109</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 100 && item <= 109">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">90-99</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 90 && item <= 99">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">80-89</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 80 && item <= 89">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">70-79</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item >= 70 && item <= 79">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 69</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsMach" :key="index">
            <span v-if="item <= 69">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Thân nhiệt -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="8">
            <b>Thân nhiệt (*)</b>
            <p class="font-normal">(<sup>o</sup>C)</p>
            <v-popover :placement="'right'" :trigger="'hover'">
              <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
              <template slot="popover">
                <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Temperature'"/>
              </template>
            </v-popover>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 41</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 41">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">40-40.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 40 && item <= 40.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">39-39.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 39 && item <= 39.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">38-38.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 38 && item <= 38.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">37.5-37.9</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 37.5 && item <= 37.9">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">36.5-37.4</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 36.5 && item <= 37.4">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">35.5-36.4</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item >= 35.5 && item <= 36.4">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 35.4</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in labelsThanNhiet" :key="index">
            <span v-if="item <= 35.4">{{item}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Tri giác -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="4">
            <b>Tri giác</b>
          </th>
          <th class="font-normal table-head__sticky table-head__sticky--row1">A (13-15)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'A'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">V (9-12)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'V'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">P (6-8)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'P'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">U (&#8804; 5)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TriGiac === 'U'">{{item.TriGiac}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Tổng NEWS -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Tổng NEWS</b>
          </th>
          <td :class="getColor(item.MEWSTotal, item.IsYellow)" v-for="(item, index) in listItems" :key="index">
            <span>{{item.MEWSTotal}}</span>
          </td>
        </tr>
        <!-- Điểm đau -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Điểm đau</b>
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DiemDau1">{{item.DiemDau1}}-{{item.DiemDau2}}</span>
          </td>
        </tr>
        <!-- Hỗ trợ hô hấp -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="2">
            <b>Hỗ trợ hô hấp</b>
          </th>
          <th class="text-center table-head__sticky table-head__sticky--row1">
            <b>Oxy mask</b>
          </th>
          <th style="font-size: 18px;" class="text-center table-head__sticky table-head__sticky--row2">
            &#8594;
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.HoTroHoHap === 'Oxy mask'">{{item.HoTroHoHap}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="text-center table-head__sticky table-head__sticky--row1">
            <b>Oxy kính</b>
          </th>
          <th style="font-size: 18px;" class="text-center table-head__sticky table-head__sticky--row2">
            &#8594;
          </th>
          <td v-for="(item, index) in listItems" :key="index">
            <span v-if="item.HoTroHoHap === 'Oxy kính'">{{item.HoTroHoHap}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Cân nặng -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="2">
            <b>Cân nặng</b>
          </th>
          <th class="text-center table-head__sticky table-head__sticky--row2">
            <b>kg</b>
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.CanNang">{{item.CanNang}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Đường máu toàn phần -->
        <tr class="text-center">
          <th class="no-wrap table-head__sticky" rowspan="2">
            <b>Đường máu toàn phần</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row1">
            <p class="mb-0">Khoảng tham chiếu</p>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            Thời điểm
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DuongMauToanPhan1">{{item.DuongMauToanPhan1}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="text-center font-normal table-head__sticky table-head__sticky--row1">
            <p class="mb-0 no-wrap">T: 4.4 - 7.2 mmol/L</p>
            <p class="mb-0">S: &#60; 10 mmol/L</p>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            Kết quả
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DuongMauToanPhan2">{{item.DuongMauToanPhan2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Ăn -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="2">
            <b>Ăn</b>
          </th>
          <th class="text-center table-head__sticky table-head__sticky--row1">
            <b>Miệng</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            ml
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.AnMieng">{{item.AnMieng}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="text-center table-head__sticky table-head__sticky--row1">
            <b>Miệng</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            ml
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.AnSonde">{{item.AnSonde}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Nước tiểu -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="2">
            <b>Nước tiểu</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            ml
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.NuocTieu">{{item.NuocTieu}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Phân -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="2">
            <b>Phân</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            gram
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.Phan">{{item.Phan}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Truyền dịch -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" rowspan="2" colspan="2">
            <b>Truyền dịch</b>
          </th>
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            Loại
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TruyenDich1">{{item.TruyenDich1}}</span>
            <span v-else></span>
          </td>
        </tr>
        <tr class="text-center">
          <th class="text-center font-normal table-head__sticky table-head__sticky--row2">
            ml/h
          </th>
          <td v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.TruyenDich2">{{item.TruyenDich2}}</span>
            <span v-else></span>
          </td>
        </tr>
        <!-- Đánh giá ven truyền (VIP Score) -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>Đánh giá ven truyền (VIP Score)</b>
          </th>
          <td style="max-width: 102px; vertical-align: unset" :class="getColorXuTri(item.DanhGiaVeinTruyen)" v-for="(item, index) in listVitalSign" :key="index">
            <span v-if="item.DanhGiaVeinTruyen">{{item.DanhGiaVeinTruyen}} -
              <span v-tooltip="item.DanhGiaVeinTruyenDesc"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
            </span>
            <span v-else></span>
          </td>
        </tr>
        <!-- ĐD ghi tên -->
        <tr class="text-center">
          <th class="no-wrap text-center table-head__sticky" colspan="3">
            <b>ĐD ghi tên</b>
          </th>
          <td v-for="(item, index) in listItems" :key="index">
            <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
          </td>
        </tr>
      </table>
      <table v-else class="standing-order-tbl">
        <tr class="text-center">
          <td>{{__t('Không có dữ liệu')}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import PageChart from '@/components/IPD/VitalSigns/PediatricChart.vue'
import PageChartV2 from '@/components/IPD/VitalSigns/PediatricChartV2.vue'
import IPDNeonatalVitalSign from '@/services/IPD/NeonatalVitalSigns'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
import { cloneDeep } from 'lodash'
export default {
  name: 'TableForm',
  components: { PageChart, PageChartV2 },
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    IsLocked: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    },
    FormType: {
      type: String,
      default: 'IPDNeonatalVitalSign'
    },
    FormCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cursorGrap: false,
      DataChart: {},
      listItems: [],
      listVitalSign: [],
      labelsNhipTho: [],
      labelsMach: [],
      labelsThanNhiet: [],
      loaded: false,
      params: {
        IPDId: '',
        FormCode: this.FormCode,
        Assessor: this.$store.state.account.Username,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadChart', this.init)
    EventBus.$on('reloadTableNeonatalVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadChart')
    EventBus.$off('reloadTableNeonatalVitalSigns')
  },
  computed: {
    FluidIn () {
      let FluidIn = []
      this.listVitalSign.map(item => {
        let text = ''
        if (item.SoLuongDichVaoT) {
          text += ` T(${item.SoLuongDichVaoT}ml),`
        }
        if (item.SoLuongDichVaoP) {
          text += ` T(${item.SoLuongDichVaoP}ml),`
        }
        if (item.SoLuongDichVaoM) {
          text += ` T(${item.SoLuongDichVaoM}ml),`
        }
        if (item.SoLuongDichVaoS) {
          text += ` T(${item.SoLuongDichVaoS}ml),`
        }
        if (item.SoLuongDichVaoAN) {
          text += ` T(${item.SoLuongDichVaoAN}ml),`
        }
        if (item.SoLuongDichVaoD) {
          text += ` T(${item.SoLuongDichVaoD}ml),`
        }
        if (text.lastIndexOf(',')) text = text.substring(0, text.length - 1)
        FluidIn.push(text)
      })
      return FluidIn
    },
    FluidOut () {
      let FluidOut = []
      this.listVitalSign.map(item => {
        let text = ''
        if (item.SoLuongDichRaSD) {
          text += ` T(${item.SoLuongDichRaSD}ml),`
        }
        if (item.SoLuongDichRaN) {
          text += ` T(${item.SoLuongDichRaN}ml),`
        }
        if (item.SoLuongDichRaPh) {
          text += ` T(${item.SoLuongDichRaPh}ml),`
        }
        if (item.SoLuongDichRaNT) {
          text += ` T(${item.SoLuongDichRaNT}ml),`
        }
        if (item.SoLuongDichRaDL) {
          text += ` T(${item.SoLuongDichRaDL}ml),`
        }
        if (text.lastIndexOf(',')) text = text.substring(0, text.length - 1)
        FluidOut.push(text)
      })
      return FluidOut
    }
  },
  methods: {
    init (val) {
      console.log('PageChart ~ getData')
      this.loaded = false
      if (this.viewOnly) {
        this.params = {
          Assessor: '',
          FromDate: '',
          ToDate: ''
        }
      }
      if (val) {
        this.params = {
          Assessor: val.Assessor,
          FromDate: val.FromDate,
          ToDate: val.ToDate
        }
      }
      if (!this.$route.params.Id) return
      if (this.FormType === 'IPDNeonatalVitalSign') {
        new IPDNeonatalVitalSign(this.params).find('GetByVisitId/' + this._VisitId).then(response => {
          if (response) {
            this.loaded = true
            this.getDataChart(response)
          }
        }).catch(e => {
          this.loaded = true
          if (e.status === 404) {}
        })
      }
    },
    async getDataChart (response) {
      this.listItems = []
      this.listVitalSign = []
      if (response) {
        this.DataChart = await response
        this.labelsNhipTho = (this.DataChart.NhipThoMEWS.map(d => d.MEWRate)).reverse()
        this.labelsMach = (this.DataChart.MachMEWS.map(d => d.MEWRate)).reverse()
        this.labelsThanNhiet = (this.DataChart.ThanNhietMEWS.map(d => d.MEWRate)).reverse()
      }
      if (response.listItems) {
        this.listItems = cloneDeep(response.listItems)
        this.listItems.map(item => {
          this.listVitalSign.push(item.VitalSign)
        })
      }
    },
    getColor (num, isYellow3) {
      let colorClass = ''
      if (num === '' || num === null) {
        colorClass = ''
      }
      if (!isYellow3) {
        if (num <= 2 && num >= 0 && num !== '' && num !== null) {
          colorClass = 'color-blue2'
        }
      }
      if (!isYellow3) {
        if (num <= 5 && num >= 3) {
          colorClass = 'color-green3'
        }
      }
      if (isYellow3 && num < 7) {
        colorClass = 'color-yellow3'
      }
      // eslint-disable-next-line
      if (num == 6) {
        colorClass = 'color-yellow3'
      }
      if (num >= 7) {
        colorClass = 'color-red3'
      }
      return colorClass
    },
    getColorXuTri (num) {
      let color = ''
      if (num) {
        if (num === '00') {
          color = 'colorGreen'
        } else if (num === '01') {
          color = 'colorYellow'
        } else {
          color = 'colorRed'
        }
      }
      return color
    },
    handleEdit (id) {
      this.$emit('editId', id)
    }
  }
}
</script>
<style scoped>
.standing-order-tbl td {
  cursor: unset !important;
}
.chart-wrapper {
  display: block;
  position: absolute;
  width: 900px;
  background-color: #fefefe;
  border: 1px solid #cecece;
  top: -10%;
  left: 60%;
  z-index: 1000;
}
.tooltip-chart {
  padding: 10px;
  cursor: pointer;
}
.tooltip-chart:hover + .chart-wrapper {
  display: block;
}
.table-hover {
  overflow-x: hidden;
  overflow-y: hidden;
  display: inline-block;
  position: relative;
  z-index: 1;
}
.table-hover td,
.table-hover th {
  position: relative;
}
.table-hover th {
  text-align: center;
  background-color: #fff;
  color: #000;
}
/* Row */
.table-hover td:hover::before {
  background-color: #f4f4f4;
  content: "\00a0";
  height: 100%;
  left: -5000px;
  position: absolute;
  top: 0;
  width: 10000px;
  z-index: -1;
}
/* Column */
.table-hover td:hover::after {
  background-color: #f4f4f4;
  content: "\00a0";
  height: 10000px;
  left: 0;
  position: absolute;
  top: -5000px;
  width: 100%;
  z-index: -1;
}
.table-hover .table-head {
  background-color: #337ab7;
  color: #fff;
  padding: 7px;
  border: 1px solid #ccc;
}
.table-head__sticky {
  position: sticky !important;
  left: 0;
  box-shadow: 10px 0 5px -2px #888;
  z-index: 1;
}
.table-head__sticky--row1 {
  left: 166px !important;
}
.table-head__sticky--row2 {
  left: 297px !important;
}
.cursor-grap {
  cursor: url('/static/icons/openhand.cur'), auto;
  /* cursor: grab; */
}
.cursor-grapbing {
  cursor: url("/static/icons/closedhand.cur"), auto;
  /* cursor: grabbing; */
}
.color-blue2 {
  background: #9FC5F8;
}
.color-green3 {
  background: #93C47D;
}
.color-yellow3 {
  background: #FFD966;
}
.color-red3 {
  background: #E06666;
}
.colorGreen {
  background: #43A286 !important;
  color: #FFF;
}
.colorYellow {
  background: #F4C74C !important;
  color: #FFF;
}
.colorRed {
  background: #E6472D !important;
  color: #FFF;
}
</style>
