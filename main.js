//const fs = require('fs');

//const go = fs.readFileSync('./env', 'utf-8').split(/[\n]/);
//console.log(go);



//const ini = require('ini');
//const config = ini.parse(fs.readFileSync('./php.ini', 'utf-8'));
//console.log(config);


const { readFileSync } = require('fs')
/*
const file = readFileSync('env', 'utf8').split(/[\n\r]/)
const result = {}

let prev = {}
let preKey

file.forEach(line => {
    const key = line.split('=')[0]
    const value = line.split('=')[1]
    const _ = {}

    if (!value) {
        prev[preKey] += key
        result[preKey] = prev[preKey]
    } else {
        result[key] = value
    }

    _[key] = value
    prev = _
    preKey = key
})

console.log(JSON.stringify(result))

*/