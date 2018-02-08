const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
var rp = require('request-promise');
let arr = []


isfor = false
for (var i = 2; i < 50; i++) {
    rp('http://www.yuhuajian.com/page' + i)
      .then((htmlString) => {
        let $ = cheerio.load(htmlString)
        let len = $('.post-preview').length
        for (var i = 0; i < len; i++) {
          let obj = {}
          let h2 = $('.post-title').eq(i).text()
          let jianjie = $('.post-content-preview').eq(i).text()
          let url = $('.post-preview').eq(i).find('a').attr('href')
          obj.title = h2.trim().replace(/[\r\n]/g, "")
          obj.jianjie = jianjie.trim().replace(/[\r\n]/g, "")
          obj.url = 'www.yuhuajian.com' + url.trim()
          arr.push(obj)
        }
        aaa(arr)
      })
      .catch((err) => {
        
      })
}
iffull = true
function aaa(arr) {
  if(arr.length < 6) {
    return false
  }
  arr.forEach(item => {
    rp('http://' + item.url)
      .then((data) => {
        let $ = cheerio.load(data)
        item.content = $('.post-container').html()
      })
  })
  setTimeout(() => {
    fs.writeFile('./1.json', JSON.stringify(arr), () => {
      console.log('OK')
    })
  }, 5000);
}










// let $ = cheerio.load(htmlString)  
// let len = $('.post-preview').length
// for (var i =0; i< len; i++) {
//   let obj = {}
//   let h2 = $('.post-title').eq(i).text()
//   let content = $('.post-content-preview').eq(i).text()
//   let url = $('.post-preview').eq(i).find('a').attr('href')
//   obj.title = h2.trim().replace(/[\r\n]/g, "")
//   obj.content = content.trim().replace(/[\r\n]/g, "")
//   obj.url = 'www.yuhuajian.com' + url.trim()
//   arr.push(obj)
// }