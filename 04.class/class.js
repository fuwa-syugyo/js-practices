#!/usr/bin/env node

const program = require('commander')
const { v4: uuidv4 } = require('uuid')

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
        memo = new Memo(uuidv4(), data[0], data)
        console.log(memo)
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
  }
}

class File {
  writeFile () {

  }

  readFile () {

  }

  deleteFile () {

  }
}
