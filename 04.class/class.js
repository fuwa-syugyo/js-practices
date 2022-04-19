#!/usr/bin/env node

const program = require('commander')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
// const { resolveObjectURL } = require('buffer')
// const { consumers } = require('stream')

program
  .option('-l, --option [value]')
  .option('-r, --option [value]')
  .option('-d, --option [value]')
  .parse(process.argv)

switch (process.argv[2]) {
  case '-l':
    console.log('lです')
    break
  case '-r':
    console.log('表示するメモを選んでください')
    break
  case '-d':
    console.log('削除するメモを選んでください')
    break
  default:
    console.log('メモの内容を入力してください')
    function inputData () {
      const data = []
      process.stdin.resume()
      process.stdin.setEncoding('utf8')

      const reader = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })
      reader.on('line', (line) => {
        data.push(line)
      })
      reader.on('close', () => {
        File.writeFile(data)
        reader.close()
        process.exit()
      })
    }
    inputData()
    break
}

class Memo {
  constructor (id, title, description) {
    this.id = id,
    this.title = title,
    this.description = description
    description.shift()
    description.join('\n')
  }
}

class File {
  static writeFile (data) {
    let memoArray = []
    if (File.readFile() != null) {
      memoArray = File.readFile()
    }
    const memo = new Memo(uuidv4(), data[0], data)

    memoArray.push(memo)
    fs.writeFile('memofile.json', JSON.stringify(memoArray), (err) => {
      if (err) throw err
      console.log('正常に書き込みが完了しました')
    })
    try {
      fs.writeFileSync('memofile.json', JSON.stringify(memoArray))
      memoArray.push(memo)
    }
    catch (e) {
      console.log(e.message)
    }
  }

  static readFile () {
    try {
      const buff = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
      return buff
    }
    catch (e) {
      console.log(e.message)
    }
  }

  deleteFile () {

  }
}
