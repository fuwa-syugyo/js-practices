#!/usr/bin/env node

const program = require('commander')

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
    console.log('rです')
    break
  case '-d':
    console.log('dです')
    break
  default:
    program.parse(process.argv)
    const filePath = program.args[0]
    console.log(filePath)
    break
}

class Memo {
  constructor (title, description) {
    this.title = title,
    this.description = description
  }
}

class File {
  writeFile () {

  }
  readFile () {

  }
  deleteFile() {

  }
  
}
