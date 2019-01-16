var fs = require('fs'),
  xml2js = require('xml2js')

var parser = new xml2js.Parser({ explicitArray: false })
fs.readFile(__dirname + '/data.xml', function(err, data) {
  parser.parseString(data, function(err, result) {
    console.log(err)
    console.log(result)
    fs.writeFile('data.json', JSON.stringify(result), err => {
      if (err) throw err
      console.log('文件已保存')
    })
  })
})

// var fs = require('fs')
// var htmlparser = require('htmlparser2')
// var parser = new htmlparser.Parser(
//   {
//     onopentag: function(name, attribs) {
//       if (name === 'script' && attribs.type === 'text/javascript') {
//         console.log('JS! Hooray!')
//       }
//     },
//     ontext: function(text) {
//       console.log('-->', text)
//     },
//     onclosetag: function(tagname) {
//       if (tagname === 'script') {
//         console.log("That's it?!")
//       }
//     }
//   },
//   {
//     decodeEntities: true,
//     lowerCaseTags: false,
//     lowerCaseAttributeNames: false,
//     xmlMode: true
//   }
// )
// fs.readFile(__dirname + '/data.xml', function(err, data) {
//   parser.write(data)
// })
// parser.end()
