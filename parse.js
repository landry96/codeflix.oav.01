function parseIni(data) {
    let result = {}
    let current_section = null
  
    data.split(/\r?\n/).forEach(line => {
      if (/^\s*;/.test(line)) {
        return
      }
  
      let match
  
      // a\ section
      match = line.match(/^\[(.+)\]$/)
      if (match) {
        current_section = match[1]
        result[current_section] = []
      }
  
      // b\ values
      match = line.match(/^([^\s]*)\s*=\s*([^\s]*);?.*$/)
      if (match) {
        if (current_section == null) {
          return -1
        }
  
        const [, key, value] = match
  
        let obj = {}
        obj[key] = value == '""' ? '' : value
        result[current_section].push(obj)
      }
    })
  
    return result
  }
  
  function parseEnv(data) {
    let result = {}
  
    data.split(/\r?\n/).forEach(line => {
      if (/^\s*#/.test(line)) {
        return
      }
  
      let match = line.match(/([^\s]*)\s*=\s*([^\s]*)/)
      if (match) {
        const [, key, value] = match
    
        result[key] = value
      }
    })
  
    return result
  }
  
  module.exports = {
    parseEnv,
    parseIni,
  }