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

console.log(yesterday)
console.log(start_of_month)
console.log(end_of_month)
