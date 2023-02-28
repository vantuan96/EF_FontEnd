function addStyles (win, styles) {
  styles.forEach(style => {
    let link = win.document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', style)
    win.document.getElementsByTagName('head')[0].appendChild(link)
  })
}
var footertext = `1. Quý khách vui lòng liên hệ số +84 24 3974 3556 trong trường hợp có thắc mắc y tế liên quan tới đợt điều trị tại Vinmec / Please kindly call +84 24 3974 3556 should you have any problems related to your hospital admission at Vinmec.<br />
2. Đảm bảo luôn mang theo báo cáo y tế này nếu quý khách có thăm khám với bác sỹ gia đình/ bác sỹ hoặc cơ sở y tế khác sau khi xuất viện / Please always bring a copy of this summary to your clinical appointment with your family physician/ other physcians or healthcare institutions after being discharged.`
var footertext2 = `- (2) Trường hợp chưa có thẻ căn cước hoặc hộ chiếu thì ghi giấy tờ tùy thân hợp lệ khác (giấy khai sinh, giấy xác nhận của công an cấp xã nơi cư trú kèm theo ảnh có đóng dấu giáp lai trên ảnh) <br />
- Ghi chú: Giấy giới thiệu có giá trị trong vòng hai tháng kể từ ngày ký giới thiệu`
const VueHtmlToPaper = {
  install (Vue, options = {}) {
    Vue.mixin({
      methods: {
        $htmlToPaperWithFooter (el, footer = '', code, cb = () => true) {
          let {
            name = '_blank',
            specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
            replace = true
            // styles = ['/static/print.css']
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
                ${footer}
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
          addStyles(win, ['/static/print.css'])
          if (!footer) {
            addStyles(win, ['/static/print-nofooter.css'])
          }
          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
            cb()
          }, 1000)
          return true
        },
        $htmlToPaper2 (el, footer = true, code, cb = () => true) {
          let {
            name = '_blank',
            specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
            replace = true
            // styles = ['/static/print.css']
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
          addStyles(win, ['/static/print.css'])
          if (!footer) {
            addStyles(win, ['/static/print-nofooter.css'])
          }
          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
            cb()
          }, 1000)
          return true
        },
        $htmlToPaperLandscape (el, footer = true, code, cb = () => true) {
          let {
            name = '_blank',
            specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
            replace = true
            // styles = ['/static/print.css']
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
          addStyles(win, ['/static/print.css'])
          if (!footer) {
            addStyles(win, ['/static/print-nofooter.css'])
          }
          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
            cb()
          }, 1000)
          return true
        },
        $htmlToPaper (el, footer = true, code, cb = () => true) {
          let {
            name = '_blank',
            specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
            replace = true
            // styles = ['/static/print.css']
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
          addStyles(win, ['/static/print.css'])
          if (!footer) {
            addStyles(win, ['/static/print-nofooter.css'])
          }
          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
            cb()
          }, 1000)
          return true
        },
        $htmlToPaperKLM (el, footer = true, code, hotline, cb = () => true) {
          let {
            name = '_blank',
            specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
            replace = true
            // styles = ['/static/print.css']
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
          addStyles(win, ['/static/print.css'])
          if (!footer) {
            addStyles(win, ['/static/print-nofooter.css'])
          }
          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
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

          addStyles(win, ['/static/normalize.min.css', '/static/paper.css'])

          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
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

          addStyles(win, ['/static/normalize.min.css', '/static/paper.css'])

          setTimeout(() => {
            win.document.close()
            win.focus()
            win.print()
            win.close()
            cb()
          }, 1000)
          return true
        }
      }
    })
  }
}

export default VueHtmlToPaper
