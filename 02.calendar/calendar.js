#!/usr/bin/env node

const dayjs = require('dayjs')
const now = dayjs()

const argv = require('minimist')(process.argv.slice(2))

const month = argv.m || now.month() + 1
const year = argv.y || now.year()

const firstDay = new Date(year, month - 1, 2)
const date = dayjs(firstDay)
const endOfMonth = date.endOf('month').format('D')
const spaceCount = date.startOf('month').format('d')

console.log('      ' + month + '月 ' + year + '     ')
console.log('日 月 火 水 木 金 土')

for (let cnt = 0; cnt < spaceCount; cnt++) {
  process.stdout.write('   ')
}

for (let cnt = 0; cnt < parseInt(endOfMonth); cnt++) {
  if (cnt < 9) {
    process.stdout.write(' ')
  }
  process.stdout.write(cnt + 1 + ' ')
  const dayOfWeek = dayjs(firstDay).add(cnt, 'day').format('d')
  if (dayOfWeek === '0') {
    console.log('')
  }
}
console.log('\n')
