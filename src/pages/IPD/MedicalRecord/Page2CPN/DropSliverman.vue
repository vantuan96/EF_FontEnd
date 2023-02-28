<template>
  <div class="dropdown cursor mrb10">
        <div class="dropdow-y-nghia" id="dropdownSliverman" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-angle-double-down"></i> Bảng chỉ số Silverman</div>
        <div class="dropdown-menu" aria-labelledby="dropdownSliverman">
          <table class="table observation-table text-center" width="100%">
            <thead>
              <tr>
                <th width="50px">Điểm</th>
                <th width="380px">Sự dãn nở lồng ngực</th>
                <th width="130px">Co kéo cơ liên sườn</th>
                <th width="130px">Co kéo mũi ức</th>
                <th width="150px">Đập cánh mũi</th>
                <th width="230px">Rên rỉ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>Điều hoà</td>
                <td>Không</td>
                <td>Không</td>
                <td>Không</td>
                <td>Không</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Xê dịch nhịp thở với di động bụng</td>
                <td>Có ít</td>
                <td>Có ít</td>
                <td>Nhẹ</td>
                <td>Nghe bằng ống nghe</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Không di động ngực bụng</td>
                <td>Thấy rõ</td>
                <td>Thấy rõ</td>
                <td>Rõ</td>
                <td>Tai thường nghe rõ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>

<script>
export default {
  name: 'dropdownSliverman'
}
</script>

<style lang="stylus" scoped>
.dropdown {
  border: 1px solid #d2d6de;
  width: 189px;
  text-align: center;
  padding: 8px;
  position relative;
  i {
    position absolute;
    top: 12px;
    left: 7px
  }
  .dropdown-menu {
    min-width: 800px;
    height: auto;
    padding: 0px;
    margin: 0px;
    border: none;
    .table {
      margin: 0px;
    }
  }
}
</style>
