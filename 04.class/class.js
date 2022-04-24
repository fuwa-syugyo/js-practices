#!/usr/bin/env node

const program = require('commander')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const { Select } = require('enquirer')
// const { resolveObjectURL } = require('buffer')
// const { consumers } = require('stream')

program
  .option('-l, --option [value]')
  .option('-r, --option [value]')
  .option('-d, --option [value]')
  .parse(process.argv)

switch (process.argv[2]) {
  case '-l':
    console.log(AllMemoTitle())
    break
  case '-r':
    console.log('参照するメモを選んでください')
    displayMemo()
    break
  case '-d':
    console.log('削除するメモを選んでください')
    deleteMemo()
    break
  default:
    console.log('メモの内容を入力してください')
    inputData()
    break
}

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

function AllMemoTitle () {
  const memo = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
  const memoTitleArray = memo.map((e) => e.title)
  return memoTitleArray
}

function selectMemo () {
  const prompt = new Select({
    choices: AllMemoTitle()
  })
  return prompt
}

function displayMemo () {
  const memo = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
  selectMemo().run()
    .then(answer =>
      console.log(memo.find((value) => value.title === answer).description.join('\n')))
    .catch(console.error)
}

function deleteMemo () {
  const memo = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
  selectMemo().run()
    .then(answer =>
      console.log(memo.find((value) => value.title === answer).description.join('\n')))
    .catch(console.error)
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
  static writeFile (data) {
    let memoArray = []
    if (File.readFile() != null) {
      memoArray = File.readFile()
    }
    const memo = new Memo(uuidv4(), data[0], data)

    memoArray.push(memo)
    fs.writeFile('memofile.json', JSON.stringify(memoArray), (err) => {
      if (err) throw err
    })
    try {
      fs.writeFileSync('memofile.json', JSON.stringify(memoArray))
      memoArray.push(memo)
      console.log('正常に書き込みが完了しました')
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
