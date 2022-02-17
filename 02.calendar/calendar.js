#!/usr/bin/env node

const dayjs = require('dayjs')
let now = dayjs()

let argv = require('minimist')(process.argv.slice(2))

let month = argv['m'] || now.month() + 1
let year = argv['y'] || now.year()
console.log(month)
console.log(year)

let yesterday = new Date(year, month -1)
let date = dayjs(yesterday)
let start_of_month = date.startOf('month').format('D')
let end_of_month = date.endOf('month').format('D')
let space_count = date.startOf('month').format('d')

console.log(yesterday)
console.log(start_of_month)
console.log(end_of_month)
console.log(space_count)

console.log('      ' + month + '月' + year + '     \n')
console.log('日 月 火 水 木 金 土')

for (let cnt = 0; cnt < space_count; cnt++) {
  process.stdout.write('   ')
}

// for (let day = 1; day <= end_of_month; day++ ){
//   process.stdout.write(day)
// }
