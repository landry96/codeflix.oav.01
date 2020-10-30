const fs = require('fs')
const path = require('path')

const { parseEnv, parseIni } = require('./parse')

if (process.argv.length !== 3) {
  console.log(`usage: node main.js <CONFIG_FILENAME>`)
  process.exit(1)
}

const filename = process.argv[2]
const result = filename.match(/\.(.*)$/)
if (result === null) {
  console.log('error :: check your configuration filetype')
  process.exit(2)
}

const extension = result[1]

const handle_configuration = {
  env: parseEnv,
  ini: parseIni,
}

if (!handle_configuration[extension]) {
  console.log(`error :: extension ${extension} not yet supported`)
  process.exit(3)
}

if (!fs.existsSync(filename)) {
  console.log(`error :: file ${filename} doesn't exist`)
  process.exit(4)
}

const str = fs.readFileSync(filename, 'utf-8')
const obj = handle_configuration[extension](str)

if (obj === -1) {
  console.log(`error :: something bad happends with file ${filename}`)
  process.exit(5)
}

let current_date = new Date()
  .toISOString()
  .replace(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).*/, '$1$2$3$4$5$6')

const basename = path.basename(filename, `.${extension}`)
const output_name = path.join('data', `${basename}.${current_date}.json`)

fs.writeFileSync(output_name, JSON.stringify(obj, null, 2))

console.log(`File ${output_name} has been successfully created! 🤘`)