#!/usr/bin/env node

const dayjs = require('dayjs')
let now = dayjs()

let argv = require('minimist')(process.argv.slice(2))

let month = argv['m'] || now.month() + 1
let year = argv['y'] || now.year()

let first_day = new Date(year, month - 1, 2)
let date = dayjs(first_day)
let end_of_month = date.endOf('month').format('D')
let space_count = date.startOf('month').format('d')

console.log('      ' + month + '月' + year + '     \n')
console.log('日 月 火 水 木 金 土')

for (let cnt = 0; cnt < space_count; cnt++) {
  process.stdout.write('   ')
}

for (let cnt = 0; cnt < parseInt(end_of_month); cnt++) {
  if (cnt < 9) {
    process.stdout.write(' ')
  }
  process.stdout.write(cnt + 1 + ' ')
  let day_of_week = dayjs(first_day).add(cnt, 'day').format('d')
  if (day_of_week === '0') {
    console.log('')
  }
}
