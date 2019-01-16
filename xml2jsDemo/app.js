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
