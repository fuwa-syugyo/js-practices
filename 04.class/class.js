#!/usr/bin/env node

const program = require('commander')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const { Select } = require('enquirer')

class Memo {
  constructor (id, title, description) {
    this.id = id
    this.title = title
    this.description = description
    description.shift()
  }

  static allMemoTitle () {
    const memo = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
    const memoTitleArray = memo.map((e) => e.title)
    return memoTitleArray
  }

  static selectMemo () {
    const prompt = new Select({
      choices: Memo.allMemoTitle()
    })
    return prompt
  }

  static async displayMemo () {
    try {
      const memo = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
      const answer = await Memo.selectMemo().run()
      console.log(memo.find((value) => value.title === answer).description.join('\n'))
    } catch (e) {
      console.error(e)
    }
  }

  static async deleteMemo () {
    try {
      const answer = await Memo.selectMemo().run()
      File.deleteMemoFromFile(answer)
    } catch (e) {
      console.error(e)
    }
  }
}

class File {
  static writeFile (data) {
    let memoArray = []
    if (memoArray != null && fs.existsSync('memofile.json')) {
      memoArray = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
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
    } catch (e) {
      console.log(e.message)
    }
  }

  static deleteMemoFromFile (answer) {
    let memoArray = []
    if (memoArray != null && fs.existsSync('memofile.json')) {
      memoArray = JSON.parse(fs.readFileSync('memofile.json', 'utf-8'))
    }

    fs.writeFileSync('memofile.json', JSON.stringify(memoArray), (err) => {
      if (err) throw err
    })
    try {
      const deleteMemoProperty = memoArray.find((value) => value.title === answer)
      memoArray = memoArray.filter((item) => item.id !== deleteMemoProperty.id)
      fs.writeFileSync('memofile.json', JSON.stringify(memoArray))
    } catch (e) {
      console.log(e.message)
    }
  }
}

program
  .option('-l, --option [value]')
  .option('-r, --option [value]')
  .option('-d, --option [value]')
  .parse(process.argv)

switch (process.argv[2]) {
  case '-l':
    console.log(Memo.allMemoTitle().join('\n'))
    break
  case '-r':
    console.log('参照するメモを選んでください')
    Memo.displayMemo()
    break
  case '-d':
    console.log('削除するメモを選んでください')
    Memo.deleteMemo()
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
