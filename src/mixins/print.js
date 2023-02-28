import Logs from '@/services/Logs'
const footertext = `1. Quý khách vui lòng liên hệ số +84 24 3974 3556 trong trường hợp có thắc mắc y tế liên quan tới đợt điều trị tại Vinmec / Please kindly call +84 24 3974 3556 should you have any problems related to your hospital admission at Vinmec.<br />
2. Đảm bảo luôn mang theo báo cáo y tế này nếu quý khách có thăm khám với bác sỹ gia đình/ bác sỹ hoặc cơ sở y tế khác sau khi xuất viện / Please always bring a copy of this summary to your clinical appointment with your family physician/ other physcians or healthcare institutions after being discharged.`
const footertext2 = `<span class="ghi-chu-1">(2) Trường hợp chưa có thẻ căn cước hoặc hộ chiếu thì ghi giấy tờ tùy thân hợp lệ khác (giấy khai sinh, giấy xác nhận của công an cấp xã nơi cư trú kèm theo ảnh có đóng dấu giáp lai trên ảnh)</span> <br />
<span class="ghi-chu">Ghi chú: Giấy giới thiệu có giá trị trong vòng hai tháng kể từ ngày ký giới thiệu</span>`
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=no',
    'scrollbars=yes',
    'width=200'
  ],
  styles: [
    process.env.API_URL + '/Content/print-page.css'
  ]
}
export default {
  data () {
    return {
    }
  },
  methods: {
    loger (content) {
      new Logs({hidemsg: true, noLoading: true, notRedirect: true})
        .update('', {
          url: window.location.href,
          name: 'PRINT DOCUMENT',
          reason: content
        })
        .then(() => {
        })
    },
    addStyles (win, styles) {
      styles.forEach(style => {
        let link = win.document.createElement('link')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('type', 'text/css')
        link.setAttribute('href', style + '?v=' + (new Date().getTime()))
        win.document.getElementsByTagName('head')[0].appendChild(link)
      })
    },
    $htmlToPaperWithFooter (el, footer = '', code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
              svg {
                width: 950px !important;
                height: 500px !important ;
              }
              td {
                font-size: 15px !important ;
              }
              .divText {
                font-size: 15px !important ;
              }
              @media print {
                #breakPage {
                  page-break-before: always !important;
                }
              }
            </style>
          </head>
          <body class="A4">
            <div class="page-footer" style="font-size: 11px;">
            ${footer}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page" style="font-size: 14px;">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 14px;">
                      <br/>
                      ${footer}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }

      const customOnBeforePrint = () => {
        const smoothScroll = (h) => {
          let i = h || 0
          if (i < 200) {
            setTimeout(() => {
              window.scrollTo(window.scrollY, window.scrollY + i)
              smoothScroll(i + 10)
            }, 10)
          }
        }

        let height = document.body.scrollHeight
        let newHeight
        while (true) {
          smoothScroll(100)
          if (newHeight === height) break
          height = newHeight
        }
      }
      window.onbeforeprint = customOnBeforePrint
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaper2 (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">

            </style>
          </head>
          <body class="A4">
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext2 : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page" style="font-size: 14px;">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext2 : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperLandscape (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
              size: A4 landscape;
            }
            .no-wrap-hidden {
              width: 297mm !important;
            }
            </style>
          </head>
          <body class="">
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext2 : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext2 : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaper (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)
      console.log('element: ', element)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
              @page {
                size: A4 !important;
                margin-left: 10mm !important;
                margin-right: 10mm !important;
                margin-bottom: 10mm !important;
                margin-top: 10mm !important;
              }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=2'])
      this.addStyles(win, ['/static/stylePrice.css'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaper3 (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)
      console.log('element: ', element)
      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
              @page {
                size: A4 !important;
                margin-left: 10mm !important;
                margin-right: 10mm !important;
                margin-bottom: 10mm !important;
                margin-top: 10mm !important;
              }
              .none-mrb {
                margin-top: 0px!important;
                margin-bottom: 0px!important;
              }
              .nghieng {
                font-style: italic
              }
              .dan-cach {
                margin-bottom: 60px;
              }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext2 : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext2 : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperWithLargeHeader (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=no', 'titlebar=yes', 'scrollbars=yes', 'width=190'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
              .tbl-b > tr > td,  .tbl-b > tr > th{
                border-right: 0.5px dotted #757575 !important;
                border-bottom: 0.5px dotted #757575 !important;
                border-left: 0.5px dotted #757575 !important;
                border-top: 0.5px dotted #757575 !important;
                padding-left: 3px;
                padding-right: 0px;
              }

              div.fauxRow {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                page-break-inside: avoid !important;
              }
              table.fauxRow {border-spacing: 0;}
              table.fauxRow > tbody > tr > td {
                padding: 0;
                overflow: hidden;
              }
              table.fauxRow > tbody > tr > td > table.print {
                display: inline-table;
                vertical-align: top;
              }
              table.fauxRow > tbody > tr > td > table.print > caption {caption-side: top;}
              .noBreak {
                float: right;
                width: 100%;
                visibility: hidden;
              }
              .noBreak:before, .noBreak:after {
                display: block;
                content: "";
              }
              .noBreak:after {margin-top: -594mm;}
              .noBreak > div {
                display: inline-block;
                vertical-align: top;
                width:100%;
                page-break-inside: avoid !important;
              }
              table.print > tbody > tr {page-break-inside: avoid !important;}
              table.print > tbody > .metricsRow > td {border-top: none !important;}

            /* THE FOLLOWING CSS IS REQUIRED, but the values may be adjusted. */
              /* NOTE: All size values that can affect an element's height should use the px unit! */
              table.fauxRow, table.print {
                line-height: 20px;
                width: 100%;
              }

              .print {
                border: none;
                width: 100%
              }

              body {
                width: 210mm;
                margin: 0px;
              }
              table.fauxRow > td {
                text-align: center;
              }

              #footer {
                display: block;
                position: fixed;
                bottom: 2mm;
                font-size: 12px;
                margin-left: 180px;
              }

              #dietCodeChoice {
                display: none;
              }

              #dietCodeView {
                display: unset;
              }
              #dietCodeShow {
                display: none;
              }

              @media print and (resolution: 300dpi) {
                footer {
                  font-size: 100px;
                }
                #dietCodeChoice {
                  display: none;
                }

                #dietCodeView {
                  display: unset;
                }

                #footer {
                  display: block;
                  position: fixed;
                  bottom: 2mm;
                  font-size: 12px;
                  margin-left: 180px;
                  height: 10mm  !important;
                }

                html, body {
                  width: 210mm !important;
                  height: auto !important;
                  overflow: hidden;
                  margin-left: 14mm !important;
                  margin-right: 0mm !important;
                }
                @page {
                  size: auto !important;
                  margin-left: 0mm !important;
                  margin-right: 5mm !important;
                  margin-bottom: 10mm !important;
                  margin-top: 15mm !important;
                  font-family: 'Time New Roman' !important;
                }

                table {
                  margin-right: 30px !important;
                }

                th {
                  text-align: center;
                }

                #xxx {
                  position: fixed !important;
                  bottom: 3mm !important;
                }

                #phieutuvan {
                  page-break-before: always !important;
                }

                #printMe {
                  page-break-after: avoid !important;
                }
                #rowBS {
                  margin-top: 30px !important;
                  border-collapse: collapse;
                }

                #rowChanKi {
                  border-style: hidden !important;
                  border: 0 !important;
                  border-collapse: collapse !important;
                }

                .trChanKi {
                  visibility: visible !important;
                }

                .infoRow1 {
                  text-align: left !important;
                }

                #pageNumber {
                  visibility: visible !important;
                }

                tfoot.report-footer {
                  display:table-footer-group;
                }

                #chanKyYLenh {
                  visibility: hidden !important;
                  margin-top: 0px;
                }

                #chanKyPhieuTuVan {
                  visibility: hidden !important;
                }
              }
            </style>
          </head>
          <body>
            ${element.innerHTML}
            <script>
            function createTableToPrint () {
              if(/Firefox|MSIE |Trident/i.test(navigator.userAgent))
                var formatForPrint = function(table) {
                  var noBreak = document.createElement("div")
                    , noBreakTable = noBreak.appendChild(document.createElement("div")).appendChild(table.cloneNode())
                    , tableParent = table.parentNode
                    , tableParts = table.children
                    , partCount = tableParts.length
                    , partNum = 0
                    , cell = table.querySelector("tbody > tr > td");
                  noBreak.className = "noBreak";
                  for(; partNum < partCount; partNum++) {
                    if(!/tbody/i.test(tableParts[partNum].tagName))
                      noBreakTable.appendChild(tableParts[partNum].cloneNode(true));
                  }
                  if(cell) {
                    noBreakTable.appendChild(cell.parentNode.parentNode.cloneNode()).appendChild(cell.parentNode.cloneNode(true));
                    if(!table.tHead) {
                      var borderRow = document.createElement("tr");
                      borderRow.appendChild(document.createElement("th")).colSpan="1000";
                      // borderRow.className = "borderRow";
                      table.insertBefore(document.createElement("thead"), table.tBodies[0]).appendChild(borderRow);
                    }
                  }
                  tableParent.insertBefore(document.createElement("div"), table).style.paddingTop = ".009px";
                  tableParent.insertBefore(noBreak, table);
                };
              else
                var formatForPrint = function(table) {
                  var tableParent = table.parentNode
                    , cell = table.querySelector("tbody > tr > td");
                  if(cell) {
                    var topFauxRow = document.createElement("table")
                      , fauxRowTable = topFauxRow.insertRow(0).insertCell(0).appendChild(table.cloneNode())
                      , colgroup = fauxRowTable.appendChild(document.createElement("colgroup"))
                      , headerHider = document.createElement("div")
                      , metricsRow = document.createElement("tr")
                      , cells = cell.parentNode.cells
                      , cellNum = cells.length
                      , colCount = 0
                      , tbods = table.tBodies
                      , tbodCount = tbods.length
                      , tbodNum = 0
                      , tbod = tbods[0];
                    for(; cellNum--; colCount += cells[cellNum].colSpan);
                    for(cellNum = colCount; cellNum--; metricsRow.appendChild(document.createElement("td")).style.padding = 0);
                    cells = metricsRow.cells;
                    tbod.insertBefore(metricsRow, tbod.firstChild);
                    for(; ++cellNum < colCount; colgroup.appendChild(document.createElement("col")).style.width = cells[cellNum].offsetWidth + "px");
                    var borderWidth = metricsRow.offsetHeight;
                    metricsRow.className = "metricsRow";
                    borderWidth -= metricsRow.offsetHeight;
                    tbod.removeChild(metricsRow);
                    tableParent.insertBefore(topFauxRow, table).className = "fauxRow";
                    if(table.tHead)
                      fauxRowTable.appendChild(table.tHead);
                    var fauxRow = topFauxRow.cloneNode(true)
                      , fauxRowCell = fauxRow.rows[0].cells[0];
                    fauxRowCell.insertBefore(headerHider, fauxRowCell.firstChild).style.marginBottom = -fauxRowTable.offsetHeight - borderWidth + "px";
                    if(table.caption)
                      fauxRowTable.insertBefore(table.caption, fauxRowTable.firstChild);
                    if(tbod.rows[0])
                      fauxRowTable.appendChild(tbod.cloneNode()).appendChild(tbod.rows[0]);
                    for(; tbodNum < tbodCount; tbodNum++) {
                      tbod = tbods[tbodNum];
                      rows = tbod.rows;
                      for(; rows[0]; tableParent.insertBefore(fauxRow.cloneNode(true), table).rows[0].cells[0].children[1].appendChild(tbod.cloneNode()).appendChild(rows[0]));
                    }
                    tableParent.removeChild(table);
                  }
                  else
                    tableParent.insertBefore(document.createElement("div"), table).appendChild(table).parentNode.className="fauxRow";
                };
              var tables = document.body.querySelectorAll("table.print")
                , tableNum = tables.length;
              for(; tableNum--; formatForPrint(tables[tableNum]));
                      }

            (function() { // THIS FUNCTION IS REQUIRED.
              setTimeout(() => {
                createTableToPrint()
              }, 2500)
            })();
                      </script>
                      </body>
                    </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])

      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 2600)
      return true
    },
    $MedicalRecordPrinter (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
              margin: 10mm 10mm 0 10mm;
            }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print2.css'])
      this.addStyles(win, ['/static/stylePrice.css'])
      if (!footer) {
        this.addStyles(win, ['/static/MedicalRecordPrinter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $PointOfCareTestingPrinter (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
              margin: 10mm 10mm 0 10mm;
            }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div>
                      ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print2.css'])
      this.addStyles(win, ['/static/stylePrice.css'])
      if (!footer) {
        this.addStyles(win, ['/static/MedicalRecordPrinter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $CanLamSangPrinter (el, footer = true, code, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
              margin: 10mm 10mm 0 10mm;
            }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print2.css'])
      this.addStyles(win, ['/static/stylePrice.css'])
      if (!footer) {
        this.addStyles(win, ['/static/MedicalRecordPrinter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperKLM (el, footer = true, code, hotline, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      var oldHotline = '+84 24 3974 3556'.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      var re = new RegExp(oldHotline, 'g')
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">

            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext.replace(re, hotline) : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext.replace(re, hotline) : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperA01_143_120521_VE (el, footer = true, code, hotline, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
        // styles = ['/static/print.css?v=1']
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)
      var oldHotline = '+84 24 3974 3556'.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
      var re = new RegExp(oldHotline, 'g')
      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
              @page {
                size: A4 !important;
                margin-left: 10mm !important;
                margin-right: 10mm !important;
                margin-bottom: 10mm !important;
                margin-top: 10mm !important;
              }
            </style>
          </head>
          <body>
            <div class="page-footer" style="font-size: 11px;">
            ${footer ? footertext.replace(re, hotline) : ''}
            <p>${code}<br/><span style="color: transparent">vinmec</span></p>
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <!--*** CONTENT GOES HERE ***-->
                    <div class="page">
                    ${element.innerHTML}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <div class="page-footer-space" style="visibility: hidden;font-size: 11px;">
                      <br/>
                      ${footer ? footertext.replace(re, hotline) : ''}
                      <p>${code}<br/><span style="color: transparent">vinmec</span></p>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `)
      this.addStyles(win, ['/static/print.css?v=1'])
      if (!footer) {
        this.addStyles(win, ['/static/print-nofooter.css'])
      }
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperPHR (el, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)

      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
                size: A4
            }
            h2 {
                font-size: 20px;
            }
            h2,
            h3,
            h4,
            .note-text,
            .no-margin {
                margin: 0
            }

            .note-text {
                font-size: 12px
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                background: #e3e1e1
            }

            .tableboder > tbody > tr > th,
            .tableboder > tbody > tr > td {
                border: 1px solid #ccc
            }

            td,
            th {
                padding: 2px 5px
            }
            .w-30 {
              width: 32%;display: inline-table;white-space: nowrap
            }
            </style>
          </head>
          <body class="A4">
            ${element.innerHTML}
          </body>
        </html>
      `)

      this.addStyles(win, ['/static/normalize.min.css', '/static/paper.css'])

      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperPrint (el, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)

      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
                size: A4
            }
            h2 {
                font-size: 20px;
            }
            h2,
            h3,
            h4,
            .note-text,
            .no-margin {
                margin: 0
            }

            .note-text {
                font-size: 12px
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th {
                background: #e3e1e1
            }

            .tableboder > tbody > tr > th,
            .tableboder > tbody > tr > td {
                border: 1px solid #ccc
            }

            td,
            th {
                padding: 3px 5px
            }
            .w-30 {
              width: 32%;display: inline-table;white-space: nowrap
            }
            </style>
          </head>
          <body class="A4">
            ${element.innerHTML}
          </body>
        </html>
      `)

      this.addStyles(win, ['/static/normalize.min.css', '/static/paper.css'])

      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    },
    $htmlToPaperPrint2 (el, cb = () => true) {
      let {
        name = '_blank',
        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        replace = true
      } = options
      specs = specs.length ? specs.join(',') : ''

      const element = document.getElementById(el)

      if (!element) {
        alert(`Element to print #${el} not found!`)
        return
      }
      const url = ''
      const win = window.open(url, name, specs, replace)

      win.document.write(`
        <html>
          <head>
            <title></title>
            <style type="text/css">
            @page {
              size: A4 !important;
              margin-left: 10mm !important;
              margin-right: 10mm !important;
              margin-bottom: 10mm !important;
              margin-top: 10mm !important;
            }
            </style>
          </head>
          <body class="A4">
            ${element.innerHTML}
          </body>
        </html>
      `)

      this.addStyles(win, ['/static/print.css?v=1'])

      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
        this.loger(element.innerHTML)
        cb()
      }, 1000)
      return true
    }
  }
}
