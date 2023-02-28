<template>
  <div>
    <table v-if="listItems.length > 0" v-dragscroll.x="true" @mousedown="cursorGrap = false" @mouseup="cursorGrap = true" :class="{'cursor-grapbing': !cursorGrap, 'cursor-grap': cursorGrap }" class="standing-order-tbl table-hover">
    <!-- <table> -->
      <tr>
        <th style="min-width: 180px;" colspan="2" class="no-wrap table-head">Ngày/giờ thực hiện</th>
        <td></td>
        <td class="text-center" v-for="(item, index) in listItems" :key="index">
          <button class="btn v-yellow-btn btn-edit" v-if="$store.state.account.Username === item.CreatedBy && hasRole('MEWS03') && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button>
        </td>
      </tr>
      <tr>
        <th colspan="2" class="table-head">Dấu hiệu</th>
        <th class="table-head">MEWS</th>
        <td class="text-center" v-for="(item, index) in listItems" :key="index">
          {{item.TransactionDate | formatDateWithoutSecon}}
        </td>
      </tr>
      <!-- Nhip tho -->
      <tr class="text-center">
        <th class="text-center no-wrap table-head__sticky" rowspan="8">
          <b>Nhịp thở (*)</b>
          <p class="font-normal">(Lần/ phút)</p>
          <v-popover :placement="'right'" :trigger="'click'">
            <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
            <template slot="popover">
              <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Breath'"/>
            </template>
          </v-popover>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 35</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate > 35">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">30-34</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate >= 30 && item.BreathRate <= 34">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">25-29</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate >= 25 && item.BreathRate <= 29">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">20-24</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate >= 20 && item.BreathRate <= 24">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">15-19</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate >= 15 && item.BreathRate <= 19">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">10-14</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate >= 10 && item.BreathRate <= 14">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">6-9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate >= 6 && item.BreathRate <= 9">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 5</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.BreathRate <= 5">{{item.BreathRate}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- SpO2 -->
      <tr class="text-center">
        <th class="text-center no-wrap table-head__sticky" rowspan="8">
          <b>SpO<sub>2</sub></b>
          <p class="font-normal">(%)</p>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 95</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 95 && !item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 88 với COPD</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 88 && item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-94</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 90 && item.SPO2 <= 94 && !item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">86-87 với COPD</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 86 && item.SPO2 <= 87 && item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">85-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 85 && item.SPO2 <= 89 && !item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">84-85 với COPD</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 84 && item.SPO2 <= 85 && item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">6-9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 >= 6 && item.SPO2 <= 9 && !item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 5</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.SPO2 <= 5 && !item.COPD">{{item.SPO2 ? item.SPO2 : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Huyet ap -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" rowspan="6">
          <b>Huyết áp</b>
          <p class="font-normal">(mmHg)</p>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 180</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.HighBP >= 180">{{item.HighBP ? item.HighBP : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">160-179</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.HighBP >= 160 && item.HighBP <= 179">{{item.HighBP ? item.HighBP : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">150-159</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.HighBP >= 150 && item.HighBP <= 159">{{item.HighBP ? item.HighBP : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-149</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.HighBP >= 90 && item.HighBP <= 149">{{item.HighBP ? item.HighBP : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">80-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.HighBP >= 80 && item.HighBP <= 89">{{item.HighBP ? item.HighBP : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8804; 79</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.HighBP <= 79">{{item.HighBP ? item.HighBP : ''}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Mạch -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" rowspan="12">
          <b>Mạch (*)</b>
          <p class="font-normal">(Nhịp/ phút)</p>
          <v-popover :placement="'right'" :trigger="'click'">
            <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
            <template slot="popover">
              <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Pulse'"/>
            </template>
          </v-popover>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 140</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 140">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">130-139</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 130 && item.Pulse <= 139">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">120-129</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 120 && item.Pulse <= 129">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">110-119</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 110 && item.Pulse <= 119">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">100-109</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 100 && item.Pulse <= 109">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">90-99</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 90 && item.Pulse <= 99">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">80-89</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 80 && item.Pulse <= 89">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">70-79</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 70 && item.Pulse <= 79">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">60-69</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 60 && item.Pulse <= 69">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">50-59</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 50 && item.Pulse <= 59">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">40-49</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse >= 40 && item.Pulse <= 49">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#60; 39</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Pulse < 39">{{item.Pulse}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Thân nhiệt -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" rowspan="10">
          <b>Thân nhiệt (*)</b>
          <p class="font-normal">(<sup>o</sup>C)</p>
          <v-popover :placement="'right'" :trigger="'click'">
            <span class="tooltip-target b3"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
            <template slot="popover">
              <page-chart-v2 style="width: 800px" :DataChart="DataChart" :ChartType="'Temperature'"/>
            </template>
          </v-popover>
        </th>
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#8805; 41</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 41">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">40-40.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 40 && item.Temperature <= 40.9">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">39-39.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 39 && item.Temperature <= 39.9">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">38.5-38.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 38.5 && item.Temperature <= 38.9">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">38-38.4</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 38 && item.Temperature <= 38.4">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">37-37.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 37 && item.Temperature <= 37.9">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">36-36.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">0</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 36 && item.Temperature <= 36.9">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">35.5-35.9</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">1</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 35.5 && item.Temperature <= 35.9">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">35-35.4</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature >= 35 && item.Temperature <= 35.4">{{item.Temperature}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th class="font-normal table-head__sticky table-head__sticky--row1">&#60; 35</th>
        <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Temperature < 35">{{item.Temperature}}</span>
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
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Sense === 'A'">{{item.Sense}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">V (9-12)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">2</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Sense === 'V'">{{item.Sense}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">P (6-8)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Sense === 'P'">{{item.Sense}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
          <th class="font-normal table-head__sticky table-head__sticky--row1">U (&#60; 5)</th>
          <th class="font-normal table-head__sticky table-head__sticky--row2">3</th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.Sense === 'U'">{{item.Sense}}</span>
          <span v-else></span>
        </td>
      </tr>
      <tr class="text-center">
        <th :colspan="Math.ceil((listItems.length - 1) / 2) + 3">
          <p class="mb-0 font-bold">Cộng thêm vào điểm PEWS 2 điểm nếu NB có thở oxy hỗ trợ</p>
        </th>
        <th :colspan="listItems.length - Math.ceil((listItems.length - 1) / 2)">
          <p class="mb-0 font-bold">Ký hiệu thời điiẻm đo đường máu toàn phần: Trước bữa ăn sáng(T1)/trưa(T2)/tối(T3) - Sau bữa ăn sáng(S1)/trưa(S2)/tối(S3) </p>
        </th>
      </tr>
      <!-- Tổng MEWS -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Tổng PEWS</b>
        </th>
        <td :class="getColor(item.TotalMews)" v-for="(item, index) in listItems" :key="index">
          <span>{{item.TotalMews}}</span>
        </td>
      </tr>
      <!-- Điểm đau -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Điểm đau</b>
        </th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.PainScore">{{item.PainScore}}</span>
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
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.RespiratorySupport === 'Oxy mask'">{{item.RespiratorySupport}}</span>
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
          <span v-if="item.RespiratorySupport === 'Oxy kính'">{{item.RespiratorySupport}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Đường máu mao mạch -->
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
        <td v-for="(item, index) in CapillaryBlood" :key="index">
          <span v-if="item.Data">{{item.Data}}</span>
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
        <td v-for="(item, index) in CapillaryBlood" :key="index">
          <span v-if="item.Result">{{item.Result}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Đánh giá ven truyền (VIP Score) -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Đánh giá ven truyền (VIP Score)</b>
        </th>
        <td style="width: 102px; vertical-align: unset" :class="getColorXuTri(item.VIPScore)" v-for="(item, index) in listItems" :key="index">
          <span v-if="item.VIPScore">{{item.VIPScore}} -
            <span v-tooltip="item.VIPScore_Vi"><i style="cursor: pointer;" class="fa fa-info-circle" aria-hidden="true"></i></span>
          </span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Số lượng dịch vào -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b class="text-center mb-0">Số lượng dịch vào (ml)</b>
        </th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.FluidIn">{{item.FluidIn}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Tổng dịch vào -->
      <tr>
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b class="text-center mb-0">Tổng dịch vào (ml)</b>
        </th>
        <td class="text-center" style="vertical-align: unset" v-for="(item, index) in listItems" :key="index">
          <span v-if="item.TotalFluidIn">{{item.TotalFluidIn}}ml</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Số lượng dịch ra -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b class="text-center mb-0">Số lượng dịch ra (ml)</b>
        </th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.FluidOut">{{item.FluidOut}}</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Tổng dịch ra -->
      <tr>
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b class="text-center mb-0">Tổng dịch ra (ml)</b>
        </th>
        <td class="text-center" style="vertical-align: unset" v-for="(item, index) in listItems" :key="index">
          <span v-if="item.TotalFluidOut">{{item.TotalFluidOut}}ml</span>
          <span v-else></span>
        </td>
      </tr>
      <!-- Bilan dịch -->
      <tr class="text-center">
        <th class="no-wrap text-center table-head__sticky" colspan="3">
          <b>Bilan dịch</b>
        </th>
        <td v-for="(item, index) in listItems" :key="index">
          <span v-if="item.TotalBilan">{{item.TotalBilan}}ml</span>
          <span v-else></span>
        </td>
      </tr>
    </table>
    <table v-else class="standing-order-tbl">
      <tr class="text-center">
        <td>{{__t('Không có dữ liệu')}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import PageChartV2 from '@/components/IPD/VitalSigns/PediatricChartV2.vue'
import GetLineChartVitalSignAdult from '@/services/IPD/AdultVitalSigns/GetLineChartVitalSignAdult'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
import { cloneDeep } from 'lodash'
export default {
  name: 'TableForm',
  components: { PageChartV2 },
  props: {
    data: {},
    parameters: {},
    viewOnly: false,
    VisitId: ''
  },
  data () {
    return {
      cursorGrap: true,
      DataChart: {},
      listItems: [],
      listVitalSign: [],
      labelsMach: [],
      labelsNhipTho: [],
      labelsThanNhiet: [],
      params: {
        FormCode: this.FormCode,
        CreatedBy: this.$store.state.account.Username,
        DateFrom: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        DateTo: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadChartAdultVitalSigns', this.init)
    EventBus.$on('reloadTableAdultVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadChartAdultVitalSigns')
    EventBus.$off('reloadTableAdultVitalSigns')
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
      if (this.viewOnly) {
        this.params = {
          CreatedBy: '',
          DateFrom: '',
          DateTo: ''
        }
      }
      if (val) {
        this.params = {
          CreatedBy: val.CreatedBy,
          DateFrom: val.DateFrom,
          DateTo: val.DateTo
        }
      }
      if (!this._VisitId) return
      new GetLineChartVitalSignAdult().hideErrorMsg()
        .update(this._VisitId, this.params)
        .then((res) => {
          this.getDataChart(res)
        })
    },
    async getDataChart (res) {
      this.DataChart = await res
      this.listItems = await cloneDeep(this.data)
      this.CapillaryBlood = []
      this.listItems.map(item => {
        this.CapillaryBlood.push({
          Result: item.CapillaryBlood.slice(item.CapillaryBlood.lastIndexOf('-') + 1),
          Data: item.CapillaryBlood.substring(0, item.CapillaryBlood.indexOf('-'))
        })
      })
    },
    getColor (num) {
      let colorClass = ''
      if (num === '' || num === null) {
        colorClass = ''
      }
      if (num <= 2 && num >= 0 && num !== '' && num !== null) {
        colorClass = 'color-blue2'
      }
      if (num <= 4 && num >= 3) {
        colorClass = 'color-green3'
      }
      if (num < 7 && num >= 5) {
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
}
.cursor-grapbing {
  cursor: url("/static/icons/closedhand.cur"), auto;
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
