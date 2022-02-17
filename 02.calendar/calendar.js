#!/usr/bin/env node
const dayjs = require('dayjs')
let now = dayjs()

let argv = require('minimist')(process.argv.slice(2))
console.log(argv)

let month = argv['m'] || now.month
let year = argv['y'] || now.year
console.log(month)
console.log(year)
